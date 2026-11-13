# Published-position feed consistency

The post-merge graph crawl found three advertised own-mandate URLs returning 404 while the sitemap contained them. Current public checks subsequently returned 200 for all three. The code had an hourly cached sitemap feed and independently uncached listing/detail reads; any unavailable detail feed was indistinguishable from a successful empty publication list. The failed run is retained rather than rerun until green without investigating.

Use one URL and one 60-second data-cache policy for sitemap, listing and detail. Keep pages rendered per request through revalidate=0 so expiry is evaluated at read time; force-dynamic would override the explicit data cache. This does not shorten the upstream CDN’s own cache or promise instant withdrawal visibility.

Detail and full sitemap reads are required: network, HTTP and malformed-payload failures throw a generic availability error instead of producing a false missing-job 404 or silently removing every mandate from a newly generated sitemap. A successful empty/withdrawn list or expired validity still produces absence. The listing retains its existing optional-feed fallback. No stale local advert store, fake200 route, gate exclusion or production test API is introduced.

Regression checks distinguish successful empty data from network/503/malformed data and re-evaluate expiry while reading the same returned payload. The independent employer sitemap remains available without external feeds. Source and main quality gates remain required; the prior main failure is not recorded as a pass.

Framework behavior: https://nextjs.org/docs/15/app/api-reference/file-conventions/route-segment-config (the previous cache model used here, cacheComponents disabled); https://nextjs.org/docs/app/api-reference/functions/fetch .

Local production-mode runtime verification with a separate synthetic HTTP feed: published 200/JobPosting, warm-cache upstream failure 200/JobPosting, cold upstream failure 500/no JobPosting, successful empty feed 404/no JobPosting, expired feed 404/no JobPosting. Synthetic feed data and control files remain outside the repository and production. Targeted 15 tests, production build, TypeScript, lint and diff checks pass. Full remote source/main gates still required.
