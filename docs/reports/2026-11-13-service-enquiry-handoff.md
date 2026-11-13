# Service choice carried into an enquiry

The four service-overview cards linked to a generic contact page, so a visitor's explicit choice disappeared before they wrote a brief. Their links now carry one of four closed service identifiers in a fragment. The contact form displays the selected service, preselects the employer enquiry category, scrolls to the form and lets the visitor clear the selection without losing their text. Network/provider failures preserve both the choice and the brief. Direct contact and the existing anonymous-profile enquiry handoff remain supported.

The service identifier is independently validated at the API boundary, included as a readable name in the existing HTML/text notification and recorded only on the existing provider-accepted log entry. Deduplication includes it. No full URL, fragment or arbitrary string is accepted as service metadata. Existing clients can omit the field. It is an explicit visitor choice, not evidence of a first landing page, organic source, qualification, inbox delivery or mandate.

There are no new cookies, persistent storage, visitor identifiers, trackers, server routes or sitemap URLs. A fragment holds only a public service choice; the canonical contact page stays the same. Existing mail recipients, security verification, fees and contracts are unchanged.

214 unit cases include invalid/prototype/URL/object service rejection and the actual API/provider email/log proof. Three native browser journeys cover visible service selection and failed-send recovery, clearing without data loss, and ignored invalid fragments (74 total). They intercept only the local endpoint; no real email is sent. Final source-specific CI, strict graph, actual public HTML and production evidence are recorded in the shared roadmap.
