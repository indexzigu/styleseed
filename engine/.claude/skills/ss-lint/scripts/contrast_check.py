#!/usr/bin/env python3
"""WCAG token-contrast checker for StyleSeed theme.css (ss-lint check 9).

stdlib only. Parses CSS custom properties in `:root` and `.dark` blocks,
resolves var() chains, converts hex / rgb() / hsl() / oklch() to WCAG relative
luminance, and checks the standard StyleSeed token pairs in BOTH scopes.

Exit codes: 0 = all checked pairs pass, 1 = at least one FAIL, 2 = usage/parse error.
Unparseable values are reported as skipped (never silently passed).

Usage:
  python3 contrast_check.py path/to/theme.css
  python3 contrast_check.py --self-test
"""
import math
import re
import sys

# ---------- color parsing → linear-sRGB (0..1 per channel) ----------

def _hex_to_linear(s):
    s = s.lstrip("#")
    if len(s) == 3:
        s = "".join(c * 2 for c in s)
    if len(s) == 8:          # RRGGBBAA
        if int(s[6:8], 16) != 255:
            raise ValueError("alpha < 1 needs backdrop compositing; skipped")
        s = s[:6]
    if len(s) != 6:
        raise ValueError("bad hex length")
    srgb = [int(s[i:i + 2], 16) / 255.0 for i in (0, 2, 4)]
    return [_srgb_decode(c) for c in srgb]


def _srgb_decode(c):
    # WCAG 2.x published constant (0.03928)
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def _num(tok, scale=1.0, pct_base=None):
    tok = tok.strip()
    if tok.endswith("%"):
        base = pct_base if pct_base is not None else 100.0
        return float(tok[:-1]) / 100.0 * base
    return float(tok) * scale


def _rgb_func_to_linear(args):
    # rgb(255 0 0) | rgb(255, 0, 0) | rgba(255,0,0,1) | rgb(100% 0% 0%)
    if len(args) == 4 and float(_num(args[3])) < 1.0:
        raise ValueError("alpha < 1; skipped")
    srgb = []
    for a in args[:3]:
        v = _num(a, pct_base=255.0) if a.strip().endswith("%") else float(a)
        srgb.append(max(0.0, min(1.0, v / 255.0)))
    return [_srgb_decode(c) for c in srgb]


def _hsl_to_linear(args):
    if len(args) == 4 and float(_num(args[3])) < 1.0:
        raise ValueError("alpha < 1; skipped")
    h = float(re.sub(r"deg$", "", args[0].strip())) % 360.0
    s = _num(args[1], pct_base=1.0) if args[1].strip().endswith("%") else float(args[1])
    l = _num(args[2], pct_base=1.0) if args[2].strip().endswith("%") else float(args[2])
    c = (1 - abs(2 * l - 1)) * s
    x = c * (1 - abs((h / 60.0) % 2 - 1))
    m = l - c / 2
    rgb1 = [(c, x, 0), (x, c, 0), (0, c, x), (0, x, c), (x, 0, c), (c, 0, x)][int(h // 60) % 6]
    return [_srgb_decode(max(0.0, min(1.0, v + m))) for v in rgb1]


def _oklch_to_linear(args):
    # oklch(L C H [/ alpha]) — L may be 0..1 or a percentage
    if len(args) == 4 and float(_num(args[3])) < 1.0:
        raise ValueError("alpha < 1; skipped")
    L = _num(args[0], pct_base=1.0) if args[0].strip().endswith("%") else float(args[0])
    C = float(args[1])
    H = math.radians(float(re.sub(r"deg$", "", args[2].strip())))
    a, b = C * math.cos(H), C * math.sin(H)
    l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s_ = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
    r = 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_
    g = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_
    bb = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_
    return [max(0.0, min(1.0, v)) for v in (r, g, bb)]


_FUNC = {"rgb": _rgb_func_to_linear, "rgba": _rgb_func_to_linear,
         "hsl": _hsl_to_linear, "hsla": _hsl_to_linear, "oklch": _oklch_to_linear}


def luminance(value):
    """CSS color string → WCAG relative luminance. Raises ValueError if unsupported."""
    v = value.strip()
    if v.startswith("#"):
        lin = _hex_to_linear(v)
    else:
        m = re.match(r"^([a-zA-Z]+)\((.*)\)$", v)
        if not m or m.group(1).lower() not in _FUNC:
            raise ValueError("unsupported color syntax: %s" % v)
        raw = m.group(2).replace("/", " ").replace(",", " ")
        args = [t for t in raw.split() if t]
        lin = _FUNC[m.group(1).lower()](args)
    return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]


def contrast(l1, l2):
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)

# ---------- theme.css parsing ----------

def _extract_block_vars(css, selector):
    """Collect --var: value pairs from every `selector { ... }` block (flat braces).

    ponytail: naive brace scan — no nested @media handling; token blocks are flat
    in StyleSeed themes. Upgrade path: a real CSS tokenizer if themes grow nesting.
    """
    out = {}
    for m in re.finditer(re.escape(selector) + r"\s*\{", css):
        depth, i, start = 1, m.end(), m.end()
        while i < len(css) and depth:
            depth += {"{": 1, "}": -1}.get(css[i], 0)
            i += 1
        body = css[start:i - 1]
        for vm in re.finditer(r"--([\w-]+)\s*:\s*([^;]+);", body):
            out[vm.group(1)] = vm.group(2).strip()
    return out


def _resolve(name, scope, depth=0):
    if depth > 8 or name not in scope:
        return None
    val = scope[name]
    vm = re.match(r"^var\(\s*--([\w-]+)\s*(?:,[^)]*)?\)$", val)
    return _resolve(vm.group(1), scope, depth + 1) if vm else val

# ---------- pair table ----------

# (role_fg candidates — token names or '#literal', role_bg candidates, min ratio, label)
# The fg candidates mirror what StyleSeed components actually render: buttons/chips put
# brand-foreground (older skins: hardcoded white) on brand/destructive, and badge/tooltip/
# checkbox put primary-foreground on primary. Don't pair primary-foreground with brand —
# no component renders that combination.
PAIRS = [
    (["foreground", "text-primary"], ["background"], 4.5, "body text on page"),
    (["foreground", "text-primary"], ["card"], 4.5, "body text on card"),
    (["muted-foreground", "text-secondary"], ["background"], 4.5, "muted text on page"),
    (["muted-foreground", "text-secondary"], ["card"], 4.5, "muted text on card"),
    (["brand", "primary"], ["background"], 3.0, "brand UI on page (3:1 non-text)"),
    (["brand-foreground", "#ffffff"], ["brand"], 4.5, "label on brand button"),
    (["primary-foreground"], ["primary"], 4.5, "label on primary (badge/tooltip)"),
    (["destructive-foreground", "#ffffff"], ["destructive"], 4.5, "label on destructive"),
]


def check_file(path):
    try:
        css = open(path, encoding="utf-8").read()
    except OSError as e:
        print("🔴 ERROR cannot read %s: %s" % (path, e))
        return 2
    root = _extract_block_vars(css, ":root")
    dark_only = _extract_block_vars(css, ".dark")
    if not root and not dark_only:
        print("🔴 ERROR no :root/.dark custom properties found in %s" % path)
        return 2
    scopes = [("light", root)]
    if dark_only:
        merged = dict(root)
        merged.update(dark_only)
        scopes.append(("dark", merged))

    fails, skipped, checked = 0, 0, 0
    for scope_name, scope in scopes:
        for fg_names, bg_names, minimum, label in PAIRS:
            fg_name = next((n for n in fg_names if n.startswith("#") or n in scope), None)
            bg_name = next((n for n in bg_names if n in scope), None)
            if not fg_name or not bg_name:
                continue  # pair not present in this theme — not an error
            fg_val = fg_name if fg_name.startswith("#") else _resolve(fg_name, scope)
            bg_val = _resolve(bg_name, scope)
            fg_disp = fg_name if fg_name.startswith("#") else "--" + fg_name
            try:
                ratio = contrast(luminance(fg_val), luminance(bg_val))
            except (ValueError, TypeError) as e:
                skipped += 1
                print("🟡 SKIP [%s] %s (%s on --%s): %s" % (scope_name, label, fg_disp, bg_name, e))
                continue
            checked += 1
            mark = "🟢 PASS" if ratio >= minimum else "🔴 FAIL"
            fails += 0 if ratio >= minimum else 1
            print("%s [%s] %s: %s on --%s = %.2f:1 (min %.1f)"
                  % (mark, scope_name, label, fg_disp, bg_name, ratio, minimum))
    print("Contrast: %d checked, %d failed, %d skipped" % (checked, fails, skipped))
    return 1 if fails else 0

# ---------- self-test ----------

def self_test():
    assert abs(contrast(luminance("#ffffff"), luminance("#000000")) - 21.0) < 1e-6
    assert abs(contrast(luminance("#767676"), luminance("#ffffff")) - 4.54) < 0.02
    assert abs(luminance("hsl(0 100% 50%)") - luminance("#ff0000")) < 1e-6
    assert abs(luminance("oklch(0.627955 0.257683 29.2338)") - luminance("#ff0000")) < 0.005
    assert abs(luminance("rgb(255 0 0)") - luminance("#ff0000")) < 1e-9
    assert abs(luminance("oklch(100% 0 0)") - 1.0) < 0.001
    scope = {"a": "var(--b)", "b": "#fff"}
    assert _resolve("a", scope) == "#fff"
    for bad in ("#ffffff80", "rgba(0,0,0,0.5)", "color-mix(in srgb, red, blue)"):
        try:
            luminance(bad)
            raise AssertionError("should have raised: %s" % bad)
        except ValueError:
            pass
    print("OK — self-test passed (7 groups)")
    return 0


if __name__ == "__main__":
    if len(sys.argv) == 2 and sys.argv[1] == "--self-test":
        sys.exit(self_test())
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)
    sys.exit(check_file(sys.argv[1]))
