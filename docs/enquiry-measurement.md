# Incoming employer enquiry measurement

The optional form question records how the visitor says they heard of B Solution: Google, another search engine, an AI assistant, LinkedIn, recommendation or other. It defaults to no answer, is translated into all four form languages, survives failed delivery and clears after success. This is self-report, not an inferred referrer or organic first-touch attribution. No URL, search query, browsing history, storage identifier or new tracking cookie is collected by this feature.

The server accepts only the fixed enum. Only provider-accepted contact messages receive that bounded field in the existing event log. The email includes the same description and a server-generated enquiry reference matching the log request ID, so an operator can independently record qualification and a later mandate. Existing email recipients, security checks, personal-detail logging restrictions and form-page semantics remain intact. Provider acceptance does not prove mailbox delivery, a qualified lead or a signed mandate.

## Private aggregate report

Export the existing contact events into a private local JSON array or JSONL file. Structured records with a prefixed `[contact-email] ` message are supported. Run:

`pnpm enquiries:report --input /absolute/private-events.json --output /absolute/new-private-report.json`

Optional `--as-of YYYY-MM-DD` makes a snapshot reproducible. Optional `--outcomes /absolute/private-outcomes.json` supplies actual independently recorded outcomes, for example a private array with `requestId`, `status` (`qualified`, `mandated`, `not-qualified`) and `recordedOn`. Never add real events, references, outcomes, employer details or report inputs to the public repository. This command does not fetch provider logs, create qualifications, contact employers or alter CRM records.

The command counts provider acceptances once by message ID, links request aliases and keeps declared hiring enquiries separate from candidate/other/unspecified messages. Employers are grouped by self-reported discovery, submission day, public submission page and explicitly selected service. It does not assume the submission page was the visitor's original landing page or that a German form means a German employer. Unanswered discovery remains unspecified.

Qualification/mandate counts stay null when no outcome register is supplied. With a register, counts describe recorded outcomes and coverage, not inferred business results. A mandate is also included in recorded qualified employers. Candidate outcomes never count as client mandates. Unknown outcome references are counted as unlinked; future, contradictory, pre-enquiry or conflicting acceptance records are refused. Malformed accepted events and unrecognized rows are counted explicitly. An entirely unrecognized input is refused rather than reported as zero business.

The aggregate contains no names, emails, messages, request references, provider IDs, tokens or source URLs. Output is a new mode0600 file; existing files are not overwritten, and errors omit private parser excerpts and paths. It is an operator report, not a new background tracking service or a sales dashboard. Actual qualification and mandate data still have to be entered by the responsible operator.
