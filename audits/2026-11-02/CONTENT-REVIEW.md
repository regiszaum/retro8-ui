# Tokens and components content review

Reviewed the English and Portuguese token guides, component catalog, component descriptions, API contracts, and related examples against the CSS and JavaScript source.

## Corrections

- Rewrote all 55 component summaries in both languages for consistent, direct descriptions. Corrected Portuguese accents, category names, and substantial mixed-language copy in the anatomy, accessibility, API, and playground text.
- Replaced the hardcoded claim of 50 core components with catalog-derived statistics: **51 core components, 55 component pages, and 8 groups**. The labels are localized as well as the introductory text.
- Expanded the token guides with theme attributes, local overrides, alias behavior, contrast considerations, component-level defaults, and reduced-motion behavior.
- Listed all **73 foundation tokens** from the actual stylesheet and showed the **39 differing dark-theme values** alongside their light defaults. Color swatches follow the selected theme. The extraction excludes the later reduced-motion overrides.
- Expanded 17 grouped CSS-variable rows into individual entries with actual CSS defaults. The component reference now contains 146 variable entries across component families. Inherited theme values are identified rather than presented as concrete defaults; CSS keywords such as `cover` are no longer incorrectly quoted.
- Corrected native button and image-loading defaults, container height fallbacks, the `init`/`refresh` return types, and the limits of refreshing initialized components.
- Corrected the documented dialog/drawer toggle values, checkbox-only mixed state, rating selection semantics, readonly numeric behavior, and modal drawer focus behavior. Select labels and machine values are documented separately.
- Fixed contract merging so a component-specific description replaces a generic fallback row. Previously, more useful descriptions could silently disappear.
- Removed nonexistent loading modifier classes from the catalog, example markup, and playground generator. The documentation now points to the implemented inner elements that determine each animation.
- Clarified that Theme Switch emits state changes but the application applies and persists the theme. Added an event-handler example. Upload examples no longer claim unsupported paste/reordering behavior, and the documentation distinguishes local file selection from network transfer and validation. Watermark copy explicitly avoids implying copy protection.
- Added the missing `--r8-letter-spacing-wide` token used by the progress component and rebuilt the CSS distribution.
- Removed token-row minimum widths that could overflow narrow cards. Made scrollable token panels keyboard-focusable, with localized accessible names and visible focus styling.

The component identifiers and code syntax remain consistent across languages. Shared demonstration data in previews can still use English; this pass does not convert every example's sample data into a separate localized preview.

## Verification

| Check | Result |
| --- | --- |
| Documentation consistency tests | **8 passed** |
| Runtime tests | **53 passed** |
| Component pages and English/Portuguese token/catalog guides | **59 pages checked** |
| Layout checks at 1440, 768, 390, and 320 px | **236 passed** |
| axe checks in both themes | **118 passed**, no reported violations |
| Browser exceptions, console errors, or hydration errors in the scan | **0** |
| Keyboard scrolling of token cards in both languages | Passed |
| Foundation token count and visible catalog counts in both languages | Verified in the browser |
| Library build and isolated production documentation build | Passed |

The production build used separate build/output directories so the existing local development server could remain running. Browser verification used Chromium against that development server. The generated production output was built successfully but was not separately subjected to the full browser scan in this pass.

The new `npm run test:content` checks documentation against CSS declarations/fallbacks and the runtime API. `npm run test:docs` now includes the token and catalog guide pages in both languages, including a guard against unlabeled statistics.

## Evidence

- [Browser scan](content-review/scan.json)
- [Consistency tests](content-review/consistency-tests.txt)
- [Runtime results](content-review/runtime.json)
- [Keyboard scrolling and catalog statistics](content-review/interactions.json)
- [Portuguese token card](content-review/pt-br-token-card.png)
- [English token card](content-review/en-token-card.png)
- [Portuguese catalog](content-review/pt-br-catalog.png)

Automated checks cover the documented source contracts and the tested browser states; they are not a substitute for native-speaker editing of every sample sentence, assistive-technology testing, or testing every component-property combination.
