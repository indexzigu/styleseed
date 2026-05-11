import { readFileSync, writeFileSync, readdirSync, mkdirSync, statSync, existsSync } from 'node:fs'
import { resolve, dirname, basename } from 'node:path'
import { createHash } from 'node:crypto'

const here = dirname(new URL(import.meta.url).pathname)
const root = resolve(here, '..')
const engineDir = resolve(root, '../engine')
const skillsDir = resolve(engineDir, '.claude/skills')
const componentsDir = resolve(engineDir, 'components')
const skinsDir = resolve(root, '../skins')
const publicDir = resolve(root, 'public')
const wellKnownAgent = resolve(publicDir, '.well-known/agent-skills')
const wellKnownSeed = resolve(publicDir, '.well-known/styleseed')

// Vercel CLI deploys upload only demo-pricing/ — engine/ at ../engine is
// outside the sandbox. In that case, skip regeneration and rely on committed
// files. (Git-based Vercel deploys with "Include files outside" enabled get
// the full repo, so regeneration runs normally.)
if (!existsSync(resolve(engineDir, 'CLAUDE.md'))) {
  console.log('⊘ engine/ not accessible — skipping llm/registry generation (using committed files)')
  process.exit(0)
}

const REPO_RAW = 'https://raw.githubusercontent.com/bitjaru/styleseed/main'

mkdirSync(wellKnownAgent, { recursive: true })
mkdirSync(wellKnownSeed, { recursive: true })

// ============================================================
// 1. llms-full.txt — CLAUDE.md + DESIGN-LANGUAGE.md mirror
// ============================================================
const claude = readFileSync(resolve(engineDir, 'CLAUDE.md'), 'utf-8')
const designLang = readFileSync(resolve(engineDir, 'DESIGN-LANGUAGE.md'), 'utf-8')

const fullHeader =
  `# StyleSeed — Full Context\n\n` +
  `Source: github.com/bitjaru/styleseed (engine/CLAUDE.md + engine/DESIGN-LANGUAGE.md)\n` +
  `Generated: ${new Date().toISOString()}\n\n---\n\n`

writeFileSync(
  resolve(publicDir, 'llms-full.txt'),
  fullHeader + claude + '\n\n---\n\n' + designLang,
)

// ============================================================
// 2. .well-known/agent-skills/index.json — skill discovery
// ============================================================
function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const out = {}
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (m) out[m[1]] = m[2].trim()
  }
  return out
}

const skillDirs = readdirSync(skillsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name.startsWith('ss-'))
  .map((d) => d.name)
  .sort()

const skills = skillDirs.map((slug) => {
  const filePath = resolve(skillsDir, slug, 'SKILL.md')
  const body = readFileSync(filePath, 'utf-8')
  const fm = parseFrontmatter(body)
  const digest = 'sha256:' + createHash('sha256').update(body).digest('hex')
  return {
    name: fm.name || slug,
    type: 'skill-md',
    description: fm.description || '',
    url: `${REPO_RAW}/engine/.claude/skills/${slug}/SKILL.md`,
    digest,
  }
})

writeFileSync(
  resolve(wellKnownAgent, 'index.json'),
  JSON.stringify(
    {
      $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
      skills,
    },
    null,
    2,
  ) + '\n',
)

// ============================================================
// 3. .well-known/styleseed/registry.json — component + skin gallery data
// ============================================================
function toPascalCase(slug) {
  return slug.replace(/(^|-)([a-z])/g, (_, _dash, ch) => ch.toUpperCase())
}

function extractJsdocDescription(source) {
  // Match leading JSDoc block: /** ... */
  const m = source.match(/^\/\*\*([\s\S]*?)\*\//)
  if (!m) return ''
  const body = m[1]
  const descLine = body.match(/@description\s+(.+)/)
  if (descLine) return descLine[1].trim()
  // Fallback: first non-empty, non-@ line
  for (const line of body.split('\n')) {
    const clean = line.replace(/^\s*\*\s?/, '').trim()
    if (clean && !clean.startsWith('@')) return clean
  }
  return ''
}

function extractExportedNames(source) {
  const names = new Set()
  const exportFn = source.matchAll(/^export\s+function\s+([A-Z][A-Za-z0-9_]*)/gm)
  for (const m of exportFn) names.add(m[1])
  const exportConst = source.matchAll(/^export\s+const\s+([A-Z][A-Za-z0-9_]*)/gm)
  for (const m of exportConst) names.add(m[1])
  const exportBlock = source.match(/^export\s*\{\s*([^}]+)\s*\}/m)
  if (exportBlock) {
    for (const item of exportBlock[1].split(',')) {
      const n = item.trim().split(/\s+as\s+/)[0].trim()
      if (/^[A-Z]/.test(n)) names.add(n)
    }
  }
  return [...names]
}

function extractImports(source) {
  const out = []
  for (const m of source.matchAll(/^import\s+[^'"]+from\s+['"]([^'"]+)['"]/gm)) {
    out.push(m[1])
  }
  return out
}

function scanComponents(type, dirName) {
  const dir = resolve(componentsDir, dirName)
  return readdirSync(dir)
    .filter((f) => f.endsWith('.tsx'))
    .sort()
    .map((file) => {
      const slug = basename(file, '.tsx')
      const filePath = resolve(dir, file)
      const code = readFileSync(filePath, 'utf-8')
      const exports = extractExportedNames(code)
      return {
        id: slug,
        type,
        name: exports[0] || toPascalCase(slug),
        exports,
        description: extractJsdocDescription(code),
        source: `engine/components/${dirName}/${file}`,
        sourceUrl: `${REPO_RAW}/engine/components/${dirName}/${file}`,
        imports: extractImports(code),
        bytes: statSync(filePath).size,
        digest: 'sha256:' + createHash('sha256').update(code).digest('hex'),
      }
    })
}

const components = [...scanComponents('ui', 'ui'), ...scanComponents('pattern', 'patterns')]

const skinFolders = readdirSync(skinsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
  .map((d) => d.name)
  .sort()

const skinsManifest = skinFolders.map((id) => {
  const meta = JSON.parse(readFileSync(resolve(skinsDir, id, 'skin.json'), 'utf-8'))
  return {
    id,
    name: meta.name || id,
    description: meta.description || '',
    brand: meta.brand,
    brandDark: meta.brandDark,
    font: meta.font,
    source: meta.source,
    themeUrl: `${REPO_RAW}/skins/${id}/theme.css`,
  }
})

writeFileSync(
  resolve(wellKnownSeed, 'registry.json'),
  JSON.stringify(
    {
      $schema: 'https://styleseed-demo.vercel.app/.well-known/styleseed/registry.schema.json',
      version: '2',
      generated: new Date().toISOString(),
      repository: 'https://github.com/bitjaru/styleseed',
      counts: {
        components: components.length,
        byType: {
          ui: components.filter((c) => c.type === 'ui').length,
          pattern: components.filter((c) => c.type === 'pattern').length,
        },
        skins: skinsManifest.length,
      },
      components,
      skins: skinsManifest,
    },
    null,
    2,
  ) + '\n',
)

console.log(`✓ wrote public/llms-full.txt (${(claude.length + designLang.length) / 1024 | 0} KB)`)
console.log(`✓ wrote public/.well-known/agent-skills/index.json (${skills.length} skills)`)
console.log(
  `✓ wrote public/.well-known/styleseed/registry.json (${components.length} components, ${skinsManifest.length} skins)`,
)
