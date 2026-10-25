# Portfolio copy direction — 25 October 2026

This revision starts from portfolio `557594a`. It changes the active homepage, shared project summaries, archive introduction, four project studies and metadata. A proposed CV introduction is part of the separate handoff, outside this branch.

## Positioning

David is a UX/UI designer who builds interfaces in code. The evidence is client website work at Brightbox, functional Digital Call and Lens prototypes, the Typeface identity and website, and the Kera Natur presentation website. The copy should identify this work and David's contribution before describing general design qualities.

Keep the public role “UX/UI designér · Front-end”. Do not imply staff-level design engineering, product leadership, extensive user research, or ownership of commercial outcomes. The reference designers have different career histories; their seniority is not a credential for this portfolio.

## Research references

Professional evidence and presentation are separate checks. An employer, shipped product or named contribution establishes professional activity; it does not establish a portfolio's hiring conversion rate. Emil's own account specifically connects publicly shared work with employment opportunities. Other causal claims remain unverified.

| Reference | Professional evidence | Relevant presentation pattern |
| --- | --- | --- |
| [Tanner Christensen](https://www.tannerchristensen.com/) | [Lyft case](https://www.tannerchristensen.com/work/lyft/) documents his role and team work; results are author-reported. | Describe a task, an interface decision and the reason for it. |
| [Maggie Appleton](https://maggieappleton.com/about) | [GitHub Next team](https://githubnext.com/people/) lists her research-engineering role. | Explain a specific area of interest and show how the author thinks. |
| [Emil Kowalski](https://emilkowal.ski/) | [His career account](https://emilkowal.ski/ui/animating-in-public) describes opportunities arising from shared work. | Functional examples make technical and visual interests tangible. |
| [Rauno Freiberg](https://rauno.me/) | Named coauthor of [Vercel's design-engineering article](https://vercel.com/blog/design-engineering-at-vercel). | A precise role can sit alongside expressive work. |
| [Rasmus Andersson](https://rsms.me/work/figma/) | His Figma account is complemented by [Figma's article about Inter](https://www.figma.com/blog/the-birth-of-inter/). | Distinguish individual contribution from collaboration and explain mechanics. |
| [Brian Lovin](https://brianlovin.com/about) | [Notion's announcement](https://www.notion.com/blog/welcoming-campsites-founders-to-the-notion-team) confirms his arrival as a Campsite founder. | Introduce the role and context plainly, then show the work. |
| [Brittany Chiang](https://brittanychiang.com/) | [Upstatement's article](https://upstatement.com/blog/campfires-community-and-code-upstatement-hackbeanpot-2021) names her involvement; current employment is self-described on her site. | Attach technologies to concrete work and responsibilities. |
| [Karri Saarinen](https://karrisaarinen.com/) | [Linear's team page](https://linear.app/about) identifies him as cofounder and CEO. | Publish a point of view; do not borrow founder-level authority or sparse context. |

The reference set is purposive, weighted toward product/interface design and front-end overlap. It is not a worldwide ranking or a representative sample of successful job applications. Simon Pan's primary portfolio could not be retrieved during this review and was not used as a fully inspected benchmark.

[NN/G's portfolio research](https://www.nngroup.com/articles/ux-design-portfolios/) supports identifying the problem, personal role, decisions and constraints while allowing scanning. Its survey involved 204 hiring UX professionals; that evidence should not be generalized into a guaranteed hiring outcome for David.

## Editorial rules

1. Use first-person verbs for David's work: “navrhl jsem”, “zvolil jsem”, “stavím”, “zkouším”.
2. Replace quality adjectives with interface details. Explain the note, date, graph, unit, state or action being designed.
3. Keep genuine scope visible once in the appropriate place: working prototype, synthetic contacts, stored statements, optional APIs, untested user understanding.
4. Preserve essential financial definitions next to the associated example. Gross spend and net revenue overlap; a computed ratio is not market share or a contractual fee. AMD and TTD are different business examples, not direct competitors.
5. Keep the existing personal sentence “Nejradši navrhuju to, co si můžu vyzkoušet.” and the straightforward Projects/CV/contact navigation.
6. Do not invent a design history, research participants, conversion gains, time savings, client endorsements or revenue impact.
7. Authorship of Typeface's logo and identity is confirmed. The fonts are Prata and Manrope, verified against the source website. Do not imply authorship of the font designs.
8. Kera Natur's custom work leads to direct contact; products and courses have their own pages. Do not invent a separate custom-order page, checkout or booking system.

## Specific semantic changes

- The homepage names the design/code combination directly and identifies actual project domains.
- The Digital Call question now asks whom to attend to, avoiding the implication that every urgent contact should be called immediately. Anna's dates, the unchanged attempt count when rescheduling, and the one accepted call outcome remain intact.
- Digital Call's closing action opens the actual demo, matching the invitation to try the workflow.
- Lens places the author's graph and accounting decisions ahead of repeated explanations of product boundaries. Actual periods, units, financial sources, data limitations, optional AI and Codex use remain stated.
- Typeface describes the logo, typography, symbols and motion using concrete terms. Provenance remains in CAPTURE_NOTES; the body no longer repeats defensive authorship explanations.
- Kera Natur identifies structure, UI and front-end contributions without claiming authorship of photography or the client logo.
- The existing public CV is outside this branch. Its opening profile should be reviewed for consistency with the revised homepage before a separate update.

## Validation at preparation time

- `npm run lint`: passed with the seven existing cleanup-reference warnings in older archive pages.
- `npm run build`: passed for the final source revision.
- `git diff --check`: passed.
- This is an editorial revision; no new implementation-mirroring unit tests were added. Visual preview findings belong in the PR handoff. Technical checks do not validate user comprehension or hiring effectiveness.

The earlier Lens UI fixes and Typeface hero-composition prompt are separate work. This branch does not change financial data, app behavior, portfolio layout or theme implementation.
