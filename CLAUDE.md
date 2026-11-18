# Claude en clair

A short French guide that teaches a non-technical expert (statistics, macroeconomics, risk management) how to get the most out of Claude. It is a static web app published on GitHub Pages:
https://hichamabd.github.io/ClaudeEnClair/

The owner is not a developer and works from an iPhone. Keep messages to him short and plain, and don't paste code into the chat unless he asks.

## Brief and decisions (interview, Nov 2026)

- **Reader:** an expert in statistics and economics who isn't comfortable with tech. Uses Office (Excel, Word, PowerPoint), R and SAS. Has a **Claude Pro or Max** plan, which is a personal consumer plan.
- **Language:** everything is in French, prompts included, in plain words.
- **Structure (dig-down):** 7 chapters. Each chapter is 1 big idea → 3 points, and each point is 1 short idea → 3 details + 1 prompt to try. Each chapter also has one "Pour en savoir plus" prompt.
  Chapters: L'essentiel · Croiser des données · Les gros fichiers · Les projets au long cours · Les compétences · Pages web et outils · Vos logiciels (Office, R, SAS).
- **Navigation:** tapping opens a new screen. There is a back pill (it names the parent screen) and a "Suivant" card for reading in order (home → ch1 → its 3 points → ch2 … → lexique).
- **Prompts:** one button copies the prompt **and** opens a new chat at https://claude.ai/new. A second button only copies. Placeholders in `[brackets]` are highlighted, and the reader replaces them.
- **Words:** tech words in the text are underlined. A tap opens a bottom sheet with a one-line definition. There's also a full **Petit lexique** page.
- **Not wanted:** reading-progress ticks and an all-prompts page. Both were offered and declined.
- **Look: "Calme".** Soft sage page, white rounded cards, one accent (sage). DM Sans is the only typeface. The memorable element is the "stem": a vertical line with nodes that links each idea (a tinted "galet" with a tight bottom-left corner) to its three children. It animates only when the reader digs deeper. Light and dark follow the device.
- **Firm rule in the content:** confidential or unpublished data never goes into a personal account. The pattern to teach is that Claude writes the R/SAS code and the reader runs it on the real data at work. Public data (FMI, BRI, Eurostat…) can be uploaded.
- Footer: "Guide indépendant, sans lien avec Anthropic". No Anthropic logo or branding.

## Files

- `index.html`: the page shell (top bar, empty `<main>`, bottom sheet, toast). It holds a strict CSP: only the app's own files.
- `js/content.js`: **all the text**. Edit content here only.
  - `[[cle]]` or `[[cle|texte]]` marks a tappable word. `cle` must exist in `window.LEXIQUE`.
  - `[ ... ]` inside a prompt marks a placeholder.
  - Write plain spaces before `: ; ? !` and inside `« »`. `fr()` in app.js adds the French non-breaking spaces and curly apostrophes.
- `js/app.js`: hash router (`#/`, `#/c/<id>`, `#/c/<id>/<n>`, `#/lexique[/<cle>]`), rendering, copy, sheet, toast. It stores nothing.
- `css/style.css`: tokens at the top (light + dark).
- `fonts/dmsans-latin.woff`: DM Sans variable font (opsz, wght), subset to Latin + French. `fonts/OFL.txt` is its license.
- `icons/`: `icon.svg` is the source. The PNGs are rendered from it (192, 512, maskable 512, apple-touch 180).
- `sw.js`: offline cache. **Bump `CACHE` (`claudeenclair-vN`) whenever any file changes.** It only deletes caches starting with `claudeenclair-`.

## House rules (apply silently)

- Light and dark follow the phone. No manual switch.
- No tracking, analytics, accounts, cookies or outside requests. Fonts and icons live in the repo. The CSP must keep allowing only `'self'`. Links to claude.ai and support.claude.com are plain navigation the reader chooses.
- Nothing is stored: no localStorage or IndexedDB. If storage is ever added, prefix every key with `claudeenclair-`, since all of the owner's apps share the hichamabd.github.io origin.
- The repo is public. No personal details, real data or secrets anywhere.
- iPhone fit: safe areas, 44px+ touch targets, text 16px+, reduced motion respected.

## Facts in the guide: checked on 18 Nov 2026

Re-check these before changing feature claims. Claude's menus change often.
- Skills: available on Free/Pro/Max/Team/Enterprise and need "Exécution de code et création de fichiers" (Paramètres > Capacités). Upload a .zip in Personnaliser > Compétences. They also work in the Office add-ins. https://support.claude.com/fr/articles/12512180 · https://support.claude.com/en/articles/12512198-how-to-create-custom-skills
- File uploads: 500 MB per file and 20 files per chat. Project files: 30 MB. https://support.claude.com/en/articles/8241126-upload-files-to-claude
- Projects: documents, instructions, RAG on paid plans. https://support.claude.com/en/articles/9517075-what-are-projects
- Memory, incognito (ghost icon, not in history or memory, not used for training, kept 30 days): https://support.claude.com/en/articles/11817273 · https://support.claude.com/en/articles/12260368
- Training toggle: Settings > Privacy > Help improve Claude. https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings
- Scheduled tasks (all paid plans; they run even when the computer sleeps): https://support.claude.com/en/articles/13854387
- Desktop app reads and writes local folders (paid plans): https://support.claude.com/en/articles/13345190-getting-started-with-cowork
- Claude for Excel, Word and PowerPoint: GA on all paid plans; Outlook in beta. https://claude.com/claude-for-excel
- Plugins: all paid plans, under Personnaliser > Plugins. https://support.claude.com/fr/articles/13837440-utiliser-les-plugins-dans-claude
- Sharing artifacts: private until shared. On Pro/Max, sharing means a public link. https://support.claude.com/en/articles/9547008-share-artifacts
- Usage limits: a 5-hour session plus weekly limits; long chats use more. https://support.claude.com/en/articles/11647753-understanding-usage-and-length-limits

## Publishing

- The single branch is `gh-pages`, and GitHub Pages serves it as is (no build step). `.nojekyll` is present.
- Push straight to `gh-pages`. Then check `gh api repos/hichamAbd/ClaudeEnClair --jq .has_pages` and confirm the latest "pages build and deployment" run succeeded.
- The guide is listed on the owner's Shelf (repo hichamAbd/Shelf, `js/apps.js`). If the name, purpose or address changes, update that entry too.
