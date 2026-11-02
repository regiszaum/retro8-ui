# Audit fixes — November 2, 2026

The layout, runtime, hydration, and accessibility findings have been fixed and checked against the generated static site. Security updates removed every critical, high, and moderate dependency alert. One upstream dependency still has an unpatched low-severity advisory, reported through seven dependency-tree entries.

## Validation

| Check | Result |
| --- | --- |
| Source runtime regression tests | **53/53 passed** |
| Minified distribution regression tests | **53/53 passed** |
| Component pages | **55/55 loaded successfully** |
| Corresponding Portuguese URLs | **55/55 returned HTTP 200** |
| Component page layouts at 1440, 768, 390, and 320 px | **220 checks passed**, no detected overflow or clipped preview surfaces |
| axe WCAG A/AA checks on component previews in light and dark themes | **110 checks**, no detected violations |
| JavaScript exceptions and console errors on those pages | **0** |
| Hydration errors on the generated site | **0** |
| Library CSS, minified CSS, JavaScript, and minified JavaScript build | Passed |
| Static documentation build using Node 22.23.2 | **254 routes generated** |
| Importing both JavaScript distributions without a browser DOM | Passed |
| Root dependency audit, including development tools | **0 alerts** |
| Documentation dependency audit | **7 low**, 0 moderate/high/critical |

Machine-readable results are in [fixes/summary.json](fixes/summary.json). The original audit results remain available separately as historical evidence.

## Changes

- Fixed documentation grid sizing so content shrinks to the available width instead of being cut off by the page's horizontal overflow rules. Corrected the container's right-hand sidebar column ordering and added narrow-screen stacking for containers and transfer panels. OTP slots now shrink within a narrow surface. Table playgrounds retain an internal scroll wrapper with or without a fixed header.
- Fixed strict numeric stepping so rounding cannot move values outside the configured limits. Readonly fields reject runtime stepping.
- Included matching root elements in component initialization, fixing both `init(element)` and components inserted directly into the DOM.
- Made closed components with `hidden` actually leave the rendered layout. Added modal drawer focus entry, Tab containment, inert background handling, focus restoration, and cleanup when an open drawer is removed. Existing inert states are preserved, and nonmodal drawers keep surrounding content usable.
- Added arrow, Home, and End navigation for tabs, with disabled-tab skipping. Ratings now expose exactly one checked radio while retaining cumulative star styling. Disabled ratings and sliders reject interaction. Transfer items support keyboard selection.
- Synchronized dialog trigger state after opening and native closing. Separated select labels from machine values. Fixed outside-click detection to use the original event path when a calendar rerenders its clicked button, keeping date/time selection open until completion. Fixed duplicate values in the input-tag add event.
- Corrected ARIA ownership for autocomplete and slider controls; supplied accessible associations for progress bars and upload inputs; labeled the numeric example. Adjusted contrast tokens and affected window, progress, link, and upload styles. Preview backgrounds now follow their theme.
- Deferred importing the runtime until Nuxt's `app:mounted` hook, preventing component hooks from mutating the DOM during hydration. Theme preference initialization now happens on mount. Moved the analytics noscript markup outside Vue's hydrated application tree using head-managed body placement.
- Updated dependencies and lockfiles, replaced the old `npm-run-all` package with its maintained alternative, and selected patched `minimatch`, `glob`, and `zod` releases through documented overrides. Nuxt Content's Zod 4 collection path was exercised by the successful content build and rendered Markdown guide.
- Rebuilt all distributed assets and aligned `Retro8UI.version` with package version `0.4.0`. The preexisting CSS change was formatting-only and was retained through regeneration. The JavaScript build script no longer depends on `import.meta.dirname`.

## Remaining upstream security finding

`deepmerge@4.3.1`, used by Nitro's Rollup resolver, remains affected by [GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4). The advisory lists **no patched version**. Its seven low-severity audit entries are one dependency chain, not seven independently demonstrated exploits. This dependency belongs to the documentation toolchain; it is not a dependency of the distributed browser library.

The finding was not suppressed, and Nuxt was not downgraded to make the audit count disappear. A future upstream fix or compatible replacement is still required. Full results are preserved in [fixes/audit-docs.json](fixes/audit-docs.json).

The generated build also reports cursor URL resolution warnings and a large client chunk warning. The cursor files exist in the generated public directory and resolve at runtime. These warnings did not fail the build or browser checks.

## Repeat the checks

Use Node 22.23.2 for the documentation, install dependencies in the repository root and `docs-site`, and install the Chromium browser used by Playwright:

```bash
npm ci
npm --prefix docs-site ci
npx playwright install chromium
npm run build
npm test
npm run test:dist
```

Run `npm run test:docs` against the development server on port 3100, or set `R8_AUDIT_URL` to a server hosting `docs-site/.output/public` after generation. The final recorded scan used the generated static site on localhost port 3101. `R8_AUDIT_OUTPUT` selects the result directory; the default is outside the repository.

The original autocomplete test searched for `Eng`, which matches none of the pilot options. It had previously passed because hidden options were incorrectly visible. The regression test now searches for a real pilot, checks the exact selected value, and separately verifies that an unmatched query exposes no options.

## Evidence and limits

- [Source runtime results](fixes/runtime.json), [minified runtime results](fixes/distribution.json), and [complete page scan](fixes/scan.json).
- [Light mobile screenshot](fixes/button-light-mobile.png), [dark mobile screenshot](fixes/button-dark-mobile.png), [OTP](fixes/input-otp-mobile.png), [table](fixes/table-mobile.png), and [inventory page](fixes/inventory-page-mobile.png).
- [Root dependency audit](fixes/audit-root.json) and [documentation dependency audit](fixes/audit-docs.json).

Testing used Chromium on Linux. Automated accessibility results do not replace screen-reader testing; Safari, Firefox, physical devices, every component property combination, and deployment penetration testing were outside this verification. No deployment or publication was performed.
