# German client heading on narrow displays

Actual production mobile verification of PR52 found that the new long German heading overflowed at390px: the document reached454px and the heading content422px in a311px box. Preserve the failed screenshot and measurement outside the public repository. Existing desktop-only checks passed; they did not prove this mobile case.

Allow automatic hyphenation with an overflow-wrap fallback on the German client heading only, retaining its exact text and all other languages/layouts. Extend the existing employer browser journey with a390px document/heading width check before restoring desktop size for the role and enquiry navigation. Preserve ordinary source/main gates and verify actual mobile rendering after deployment. No content date, threshold relaxation, overflow hiding or new mirrored unit test.
