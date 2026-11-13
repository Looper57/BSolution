# Preserve the search-service choice in an employer enquiry

The primary employer action on the four localized Legal Executive Search pages opened a generic contact form. It now uses the existing explicit service fragment, keeping the page language and displaying the selected Legal Executive Search service in the form. The visitor can clear the choice; the existing form selects hiring only when the visitor has not already selected another type.

The validated registry still resolves the same contact route; only the render destination adds the existing service selection. Candidate actions and navigation remain general destinations. No new tracking field, storage, canonical URL, sitemap entry, email recipient or commercial rule is introduced.

Validation: 19 authority registry tests and lint pass locally. Extend the existing four native authority-page cases to follow the actual action, verify language and visible service selection, and clear it without submitting a message. Existing source/main Quality gates, server payload tests and explicit service-language tests remain required.
