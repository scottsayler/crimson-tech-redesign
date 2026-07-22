/**
 * Typed conversion events for GA4.
 * Never include names, emails, phones, free-form messages, or assessment answers.
 */

export type AnalyticsEventName =
  | "contact_form_submit"
  | "contact_form_error"
  | "contact_cta_click"
  | "contact_page_from_cta"
  | "decision_resource_start"
  | "assessment_complete"
  | "calculator_complete"
  | "resource_download"
  | "research_cta_click"
  | "scheduling_link_click"
  | "email_link_click"
  | "phone_link_click";

type BaseParams = {
  page_path?: string;
};

export type AnalyticsEventMap = {
  contact_form_submit: BaseParams & {
    status: "success";
  };
  contact_form_error: BaseParams & {
    error_type: "validation" | "server";
  };
  contact_cta_click: BaseParams & {
    cta_location: string;
  };
  contact_page_from_cta: BaseParams & {
    from_path?: string;
  };
  decision_resource_start: BaseParams & {
    resource_name: string;
    resource_type: "assessment" | "calculator";
  };
  assessment_complete: BaseParams & {
    assessment_name: string;
    duration_seconds?: number;
  };
  calculator_complete: BaseParams & {
    resource_name: string;
  };
  resource_download: BaseParams & {
    resource_name: string;
    resource_type?: string;
  };
  research_cta_click: BaseParams & {
    cta_location: string;
    article_slug?: string;
  };
  scheduling_link_click: BaseParams & {
    cta_location?: string;
  };
  email_link_click: BaseParams;
  phone_link_click: BaseParams;
};

export type AnalyticsParams<T extends AnalyticsEventName> = AnalyticsEventMap[T];
