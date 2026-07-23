# SEO authority-page foundation

This foundation models future SEO landing pages without registering routes or
adding sitemap entries. Production routing continues to use the existing route
registry and authority content system.

## Supported page types

- `service`
- `practice-area`
- `location`
- `client-intent`
- `candidate-intent`

Other page types must not be represented by casting arbitrary values. Extend the
closed type and its validation rules through review when a genuine new use case
exists.

## Lifecycle

| State | Public route | Indexable | Sitemap |
| --- | --- | --- | --- |
| `draft` | No | No | No |
| `evidence-required` | No | No | No |
| `owner-review` | No; a separately secured preview system would be required | No | No |
| `approved` | Only after every validation gate passes | Derived | Derived |
| `archived` | Controlled by explicit archive action | No new indexation | No |

This module contains no preview bypass and does not create an internal preview
route. The production renderer always requires an exact, publishable registry
record. Any future preview mechanism must be a separate secured abstraction,
requires a security review, and must not reuse the public renderer to bypass
publication checks.

## Publication and indexation gates

`isPagePublishable` requires:

- approved publication state;
- explicit owner approval whose identity matches the page's stable owner key;
- a consistent discriminated evidence state and approved evidence when required;
- no duplicate or cannibalizing topic flag;
- valid locale, slug, parent, canonical, metadata, H1, proposition, audience,
  search intent, visible sections, primary CTA, links, and schema eligibility.

`isPageIndexable` additionally requires an explicit indexation request.
`isSeoPageSitemapEligible` additionally enforces the sitemap contract. Route
existence never implies publication, indexation, or sitemap inclusion.
All output helpers require the exact page object held by a fully validated
registry; reusing an ID on a substituted object is insufficient.

## Evidence

Definitions record proof requirements without embedding unsupported claims.
Pages with an `evidence.status` of `required` cannot publish. Approved evidence
must name at least one proof requirement and must refer to owner-supplied or
otherwise verified material available to the visible page.

## Localization

Every definition is locale-specific. Missing content never falls back to
English. Hreflang is generated only between approved, indexable definitions
sharing a translation key. English becomes `x-default` only when an approved
English equivalent exists.

Renderer accessibility and section labels, including breadcrumb navigation,
must be supplied natively for every locale; no default-language fallback exists.

Canonical URLs are derived from a normalized English base path plus the
established locale prefix. Double slashes, encoded paths, traversal, query
strings, fragments, duplicated locale prefixes, unsafe characters, and paths
that diverge from the declared parent and slug fail validation.

## Internal links

Links declare a relationship, locale, anchor, and contextual purpose. Page
targets must exist in the same validated registry, use the same locale, and be
publishable. Existing routes are referenced only by ID from a mandatory typed
canonical-route registry. Arbitrary caller-supplied paths are not accepted.
Draft, archived, missing-locale, duplicate, self-referencing, circular, and
non-canonical targets are rejected. Primary and secondary CTAs use the same
validated target resolution.

The foundation does not add footer or navigation links.

## Structured data

Allowed page-level schema is a closed set:

- `WebPage`
- `BreadcrumbList`
- `Service`

`Service` is restricted to a visible genuine service on a service page, or an
explicitly service-oriented client-intent page. Practice and location pages do
not automatically become services. Location pages cannot inject
`LocalBusiness`. Candidate-intent pages cannot inject `JobPosting`. FAQ schema
is outside this foundation and remains prohibited without matching visible FAQ
content.

All generated entities require the exact validated registry record, use the
validated canonical URL and existing Organization references, and reject
duplicate schema requests. Schema breadcrumb labels match the visible
breadcrumbs.

## Adding a future Tier 1 page

1. Confirm page intent and canonical ownership against the route registry.
2. Record required evidence and obtain owner approval.
3. Author complete locale-specific content; do not use fallback copy.
4. Add the definition in a reviewed production registry only when publication
   is authorized.
5. Add every existing CTA and hub destination to the reviewed canonical-route
   registry, then validate the definition and the full registry.
6. Confirm all internal-link targets are canonical, localized, and publishable.
7. Request only schema supported by visible content.
8. Deliberately add route ownership, metadata, sitemap inclusion, and navigation in the same
   approved implementation.
9. Add unit, route, metadata, hreflang, schema, sitemap, accessibility, and
   browser regression tests.
10. Verify no redirect chain, orphan page, duplicate canonical, or topic
    cannibalization is introduced.

The artificial fixtures under `tests/fixtures` are test data only. They must
never be imported by production routing, sitemap, metadata, or rendering entry
points.

Adding data to a future production registry does not itself create a route.
Routing, metadata, sitemap, and navigation integrations remain deliberate,
reviewed production changes. Owner-approved positioning, evidence, native
localized content, and final publication approval are still required before
Phase 5B pages can be exposed.
