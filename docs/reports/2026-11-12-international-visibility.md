# B Solution: international employer visibility — 12 November 2026

The owner prioritises foreign law firms and companies hiring in-house lawyers. Czech acquisition is secondary. This first wave strengthens existing English commercial pages; it does not create competing country/service URLs. Work starts from main 5fc315a in an isolated checkout. Brand, operating-company identity, approved evidence, multilingual canonical rules and contact/security controls are preserved.

## Competitive benchmark

Public search sampled commercial queries for European legal recruitment, law-firm partner recruitment and Dubai in-house hiring. Results vary by country, engine, time and personalisation: this sample does not establish exact Google positions or prove which page feature causes a ranking.

| Specialist | Observed on its own website | Application for B Solution |
| --- | --- | --- |
| [Taylor Root UAE](https://www.taylorroot.com/uae/) | Distinct in-house/private-practice paths and named specialist contacts | Two clear employer journeys; keep factual B Solution expertise and existing contact path |
| [Beacon Legal UAE](https://www.beacon-legal.ae/service/in-house-section/) | Specific in-house roles and employer hiring CTA | Explain the business brief behind GC, Head of Legal and counsel appointments |
| [Page Executive Legal](https://www.pageexecutive.com/recruitment-expertise/legal) | Separate corporate and law-firm role families and track record | Connect the appropriate role pages; use only existing approved proof |
| [H&P Executive Search](https://www.hpexec.com/) | Immediate legal-specialist positioning, partners/teams/GC and confidential conversation | Make the two target audiences explicit and easy to navigate from the homepage |
| [EMEA Legal Dubai](https://emea.legal/legal-recruitment-dubai/) | Buyer questions covering recruitment scope and candidate mapping | Add useful, original employer questions about hiring scope; do not copy wording or unsupported claims |

B Solution already has service, role, market and approved evidence pages. The immediate gap is connecting them to the relevant employer journey, rather than generating a parallel mass of articles. The live services title was only “Services | B Solution”. Existing brand/Organization fixes are already in latest main and are not reimplemented here. No competitor's placements, offices, figures, guarantee or endorsements become B Solution claims.

## Implemented first wave

- English homepage: an accessible, server-rendered employer section for international law firms and corporate legal departments; contextual links to existing partner/lateral, in-house, General Counsel, compliance and Europe/Germany/UAE pages.
- Existing employer landing pages: distinct hiring brief sections covering role scope, reporting lines, qualifications, jurisdiction, language, confidential approaches and team moves; contextual links to existing search/role destinations.
- English services metadata: descriptive legal recruitment/executive search title from the common metadata source, consistent with Open Graph.
- Optional public llms.txt: concise brand/operator and service references, clearly distinguishing B Solution mandates from external job discovery. No SEO/AI inclusion guarantee; no special AI schema or bot-access change.

English-only landing pages remain English-only. Existing CS/DE/PL equivalents and hreflang behaviour are unchanged. No new sitemap URLs, pretend local offices, fake reviews, fee terms, CRM contact or paid acquisition.

## Canonical intent ownership

| Employer intent | Existing primary page |
| --- | --- |
| B Solution brand | / |
| International legal executive search | /services/legal-executive-search |
| Law-firm partners, counsel, associates and team moves | /law-firm-recruitment |
| Hiring in-house counsel / building a corporate legal department | /hire-in-house-counsel |
| General Counsel / Head of Legal search | /practice-areas/general-counsel |
| Compliance leadership | /practice-areas/compliance-officer |
| Cross-border European search | /legal-recruitment-europe |
| German market | /legal-recruitment-germany and its existing German country page for native German intent |
| Dubai/UAE market | /legal-recruitment-dubai |

## Next work, driven by evidence

1. Verify native German service/role demand and indexing: German-market employer traffic is a priority; do not infer a Germany-specific rank from an unfiltered query average.
2. Improve existing GC/Head of Legal and in-house pages for the closest commercial opportunities, keeping one primary destination per intent.
3. Add differentiated employer situations to existing role/industry pages: first in-house hire, regional legal leadership, confidential replacement, partnership/practice growth. Expand only where a distinct useful page is justified.
4. Develop publishable evidence for relevant foreign mandates and specialist experience. Existing approved examples can be linked; new client names, testimonials, durations and outcomes require genuine evidence and publication rights.
5. Strengthen consistent brand profiles and relevant professional references. No unapproved directory registrations, paid links, unsolicited messages or LinkedIn publications in this block.
6. Measure non-Czech, non-brand employer queries and qualified employer enquiries separately from candidate/job traffic. Compare 28-day cohorts and country/device dimensions; initial visibility is not proof of recruitment revenue.

## Measurement and verification

Authenticated Search Console was inspected for the B Solution domain, including 28-day and three-month query views and a country breakdown. Exact business analytics remain in the private shared roadmap folder, not this public repository. Baseline records include actual date ranges and the UI's rounded impression totals. Web search is not presented as an exact rank tracker. Live HTTP checks and a Polish-page DNS retry are retained separately; DNS failure is not treated as proof of a production outage.

Local source tests/types/lint and browser/build/graph results will be recorded before handoff. This report does not declare the patch deployed or first-page improvement achieved.

[Google SEO guidance](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) supports descriptive content and crawlable links. [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features) applies the same core SEO principles; a custom AI file is not a prerequisite. [Site-name guidance](https://developers.google.com/search/docs/appearance/site-names) concerns brand consistency, not a guarantee of position. These guides do not establish a ranking timetable.

## Index discovery action

Search Console retained an unsuccessful sitemap read dated25October. The current public sitemap returned200/application-XML, parsed correctly, used unique canonical-host URLs and did not carry an X-Robots-Tag header, including with a Googlebot user-agent. That user-agent check does not establish actual Googlebot-IP access. The existing canonical sitemap URL was resubmitted once through the authenticated UI; Google displayed “Sitemap submitted successfully”. Processing/indexation remains pending, and no new content or draft URL was submitted. The private proof is retained in the shared folder.

## Local validation

169unit cases across14files, full ESLint and TypeScript PASS. Production webpack build PASS. Default local Turbopack could not follow the checkout-external node_modules symlink; no production config was changed. Graph gate wrapper attempted dependency verification in the shared local modules and aborted without removing them; invoking the same actual crawl directly against the built server passed all invariants:275inventory URLs,275HTTP200,1266hreflang checks,0bad canonicals/internal links/orphans/noindex-in-sitemap or schema errors. Dynamic live feeds mean the local inventory count need not equal the live sitemap at a different time.

Actual CUA verification checked the homepage employer section, the in-house destination, its General Counsel link, and the law-firm hiring brief. Original screenshots retained in the shared folder; no contact form was submitted. Native automated smoke scenarios and final push/CI are recorded below when complete.

The complete local49-case native browser suite was attempted with downloaded official Chromium in the writable workspace. All cases failed at browser launch before assertions because macOS denied Chromium MachPortRendezvous bootstrap registration. This is a local process restriction, not49verified application regressions and not a successful smoke run. No bypass/retry was attempted. The two actual new scenarios remain pending native execution in the repository's existing isolated CI. Actual CUA navigation/rendering evidence above is separate and does not replace that suite. No workflow/gate change is proposed.
