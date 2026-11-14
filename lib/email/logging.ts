import type { DiscoverySource } from '@/lib/enquiry-discovery';
import type { EnquiryService } from '@/lib/service-enquiry';
import type { ContactFormPage } from '@/lib/contact-form-context';
import type { RecruitmentPage } from '@/lib/enquiry-recruitment';

export type EmailLogStatus =
  | "accepted"
  | "rejected"
  | "configuration-error"
  | "input-error"
  | "security-error"
  | "provider-error"
  | "unexpected-error";

export type EmailLogEvent = {
  requestId: string;
  timestamp: string;
  environment: string;
  status: EmailLogStatus;
  durationMs: number;
  resendMessageId?: string;
  errorCategory?: string;
  formPage?: ContactFormPage;
  serviceInterest?: EnquiryService;
  recruitmentPage?: RecruitmentPage;
  discoverySource?: DiscoverySource;
  enquiryType?: "hiring" | "candidate" | "other" | "unspecified";
};

export function logEmailEvent(event: EmailLogEvent): void {
  const serialized = JSON.stringify(event);
  if (
    event.status === "provider-error" ||
    event.status === "configuration-error" ||
    event.status === "unexpected-error"
  ) {
    console.error("[contact-email]", serialized);
    return;
  }
  console.info("[contact-email]", serialized);
}
