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

## §W8 — Korean / CJK notes (the "Toss feel")

For Korean (and CJK) UI, the qualities Toss is known for come from a few habits:

- **존댓말 한 가지로 일관되게** — 한 제품 안에서 해요체/합쇼체를 섞지 않기. 보통 부드러운 해요체.
- **사용자 관점**: "고객님의 계좌" → **"내 계좌"**. 시스템이 부르는 말투를 사용자의 말투로.
- **군더더기 조사·부사 빼기**: "성공적으로 전송되었습니다" → **"보냈어요"**. 짧을수록 신뢰.
- **에러는 탓하지 않기**: "잘못된 입력입니다" → **"이메일 형식을 확인해 주세요"** (무엇을·어떻게).
- **돈 다룰 땐 차분하게**: 느낌표·과한 친근함 빼고 명확하게. "8,400원 보냈어요"면 충분.
- **버튼은 동작을 그대로**: "확인" 대신 **"2,400원 보내기"**, "제출" 대신 **"가입하기"**.
- **친근하되 과하지 않게**: 이모지·유행어 남발 X. 사람 같되 정돈된 톤이 "이쁜 말"이에요.

---

## Sources

Nielsen Norman Group (error messages, empty states, microcopy) · Material Design &
Apple HIG (writing) · Mailchimp Content Style Guide · Shopify Polaris (content) ·
Google developer-documentation style guide. The Korean sensibility targets the
clarity/calm/human qualities common to well-written Korean fintech UI; it documents
the *principles*, not any brand's proprietary copy.
