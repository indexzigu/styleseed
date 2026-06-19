# UX Writing — the words are part of the design

DESIGN-LANGUAGE.md and VISUAL-CRAFT.md teach the AI *visual* judgment. This file
teaches it *verbal* judgment: how to write the text inside a UI — buttons, errors,
empty states, confirmations, labels — so the copy reads like a thoughtful product,
not a system talking to itself.

The same principle as the rest of StyleSeed applies: most "AI-written" microcopy is
fine word-by-word but wrong as a system — vague buttons ("Submit"), blaming errors
("Invalid input"), robotic system-speak ("An error occurred"). Good UX writing is a
small set of decisions, applied consistently.

Grounded in Nielsen Norman Group, Material Design & Apple HIG writing guidelines,
Mailchimp's Content Style Guide, Shopify Polaris content guidelines, and Google's
developer-docs style. Brand-agnostic; the *sensibility* (clear, calm, human — the
qualities Toss is known for) is the target, not any one brand's copy.

> **Read this:** before writing any user-facing text, and whenever copy "sounds
> like a robot." Pairs with the `/ss-copy` and `/ss-feedback` skills.

---

## §W0 — Voice (the one decision that governs the rest)

**WV-1 · Write like a calm, competent human talking to one person.** Clear first,
friendly second, clever last. The reader is trying to do something — help them, don't
perform. *Why: UI copy is functional; personality that gets in the way of the task is
noise.* (NN/g)

**WV-2 · Match the tone to the moment.** Money, errors, and deletions → calm and
plain (no exclamation marks, no jokes). Success and onboarding → warm. A "Oops! 😅" on
a failed payment erodes trust; a celebration on a real win earns it.

**WV-3 · Write from the user's side.** "Your balance," "내 계좌" — not "the customer's
account." Second person, active voice. The product is the user's tool, not an
institution addressing them.

---

## §W1 — Buttons & actions

**WB-1 · Label the action, not the mechanism.** A button says what *happens*: "Send
$2,400," "Delete project," "Save changes" — never "Submit," "OK," "Confirm," or
"Yes." The user should be able to read only the button and know the outcome. (NN/g)

**WB-2 · Verb + object, front-loaded.** Start with the verb. "Add card," not "Card
adding." Keep it 1–3 words. One primary action per screen (matches the visual rule).

**WB-3 · Make the two choices distinct.** In a dialog, never pair "OK / Cancel" for a
destructive action. Use "Delete / Keep," "Discard / Keep editing" — each button names
its own outcome, so a glance is enough.

---

## §W2 — Errors

**WE-1 · Say what happened + how to fix it, in that order. No blame, no jargon.**
"That email's already registered — try signing in instead," not "Invalid input" or
"Error 422." The user caused nothing; the message exists to unblock them. (NN/g, Material)

**WE-2 · Put the error where the problem is.** Field-level errors next to the field,
not a generic banner. Name the specific field and the specific fix.

**WE-3 · Never make the user feel stupid.** Drop "invalid," "illegal," "wrong,"
"failed to." Drop "Oops!"/"Uh oh!" on anything serious (money, data loss). Plain and
respectful beats cute.

**WE-4 · For system failures the user can't fix, say so + what to do.** "We couldn't
load your transactions. Check your connection and try again." Offer a retry. Never a
bare "Something went wrong" with no next step.

---

## §W3 — Empty, loading & success states

**WS-1 · Empty states explain + invite, never shame.** "No transactions yet — they'll
show up here once you send or receive money," with the next action. Not a blank box,
not "You have no data." Turn a dead end into a starting point. (NN/g)

**WS-2 · Loading copy sets an expectation.** "Loading…" is fine for fast; for slow,
say what's happening ("Crunching your numbers — this takes a few seconds"). Never
leave the user wondering if it's stuck.

**WS-3 · Success copy confirms the specific thing.** "Sent $2,400 to Jordan" beats
"Success!" Name what happened so the user can trust it and move on.

---

## §W4 — Confirmations & consequences

**WC-1 · State the consequence, don't ask "Are you sure?"** "Delete this project? This
can't be undone." + "Delete / Keep." The dialog's job is to surface what's at stake,
not to nag. (NN/g)

**WC-2 · Reserve confirmation for the irreversible.** If it's undoable, skip the
dialog and offer Undo instead — fewer interruptions, more trust.

---

## §W5 — Clarity & concision (the everyday discipline)

**WX-1 · Cut filler.** Remove "please," "in order to," "simply," "just," "currently,"
"successfully." "To continue, please enter your email" → "Enter your email." Shorter
reads as more confident.

**WX-2 · One term per concept, everywhere.** Pick "delete" *or* "remove," "sign in"
*or* "log in" — and never mix them in the same product. Synonym-shuffling makes users
wonder if two things are different.

**WX-3 · Front-load the meaningful word.** Users scan; put what matters first.
"Payment failed — card declined" not "There was a problem and your payment failed."

**WX-4 · Plain language, not system-speak.** "An error occurred while processing your
request" → "We couldn't save that." Translate the machine's view into the user's.

**WX-5 · Clever only where there's no task.** A pun in a button or an error costs
clarity when the user needs to act. Save personality for marketing and idle moments
(empty states, success), never for money or errors.

---

## §W6 — Numbers, money & time

**WN-1 · Format for humans, no fake precision.** "$8,400" not "$8,400.0000"; "2 min
ago" not "127 seconds ago." Money gets exactly two decimals only when cents matter.

**WN-2 · Be calm and concrete around money.** State the amount, the recipient, and the
result plainly. No exclamation marks on a balance or a transfer — confidence reassures;
excitement reads as a sales pitch.

---

## §W7 — Labels, links & mechanics

**WL-1 · Link text describes the destination.** "View report," "See pricing" — never
"click here" or "read more." The link should make sense read out of context (also a11y).

**WL-2 · Sentence case for UI; skip end punctuation on labels & buttons.** "Add
payment method" (no period). Use periods only in full sentences (helper text, errors).

**WL-3 · Be consistent with title vs sentence case** across the whole product — pick
one for headings and keep it.

---

## §W8 — Korean / CJK notes (grounded in Toss's published UX-writing principles)

Toss documents its own UX-writing approach publicly (sources below). These are the
concrete habits from that material — they map onto the rules above, just sharpened for
Korean:

- **잡초 뽑기 — 뜻이 안 바뀌는 말은 뺀다.** "이미 보유하고 계신" → **"보유 중인"**,
  "성공적으로 전송되었습니다" → **"보냈어요"**. 핵심은 살리고 짧게. (= WX-1)
- **전문용어 0.** 금융·시스템 용어를 처음 보는 사람도 아는 말로. 전문용어는 정보 장벽이다. (= WX-4)
- **하나의 보이스 톤.** 팀·화면이 많아도 톤은 하나로 일관되게 — 불일치는 사용자를 혼란스럽게 한다.
  존댓말도 해요체/합쇼체 섞지 않기. (= WV-1, WX-2)
- **버튼은 동작 그대로 (Toss Design System).** 단일 CTA는 **"~하기"**("가입하기", "2,400원 보내기"),
  "확인"·"제출"이 아니라. 내비게이션만 "확인"/"다음". 두 버튼일 땐 취소 쪽을
  **"취소" 대신 "닫기"·"다음에"** 로 (부정어 줄이기). (= WB-1, WB-3)
- **공감 + 사용자 관점.** 사용자의 노력을 알아주고("갚느라 고생 많으셨어요"), 에러에선 부정 감정을
  최소화. "고객님의 계좌"보다 **"내 계좌"**. (= WV-2, WV-3, WE-3)
- **과장·낚시 카피 금지.** 클릭률이 더 높아도 오해를 부르는 문구는 쓰지 않는다(브랜드 신뢰 > 단기 지표).

---

## Sources

**General UX writing:** Nielsen Norman Group (error messages, empty states, microcopy) ·
Material Design & Apple HIG (writing) · Mailchimp Content Style Guide · Shopify Polaris
(content) · Google developer-documentation style guide.

**§W8 (Toss):** Toss's own published material on its UX-writing principles —
[Toss Feed — "토스가 금융을 더 쉽게 만드는 또 하나의 방법, UX Writing"](https://toss.im/tossfeed/article/uxwriter-interview) ·
[Toss Tech — "첫 UX writer는 무슨 일을 해야 할까"](https://toss.tech/article/1st_uxwriter) ·
[Toss Tech — "토스 피플 #2: UX 라이팅의 새로운 기준"](https://toss.tech/article/toss-people-2).
These document Toss's stated principles (잡초 뽑기, 전문용어 0, 하나의 보이스 톤, TDS 버튼 규칙,
공감/사용자 관점); StyleSeed restates the principles, not Toss's proprietary copy.
