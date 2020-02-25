export interface MailChimpMember {
  email_address: string;
  email_type: string;
  status: string;
  merge_fields: object;
  interests: object;
  language: string;
  vip: boolean;
  location: object;
  ip_signup: string;
  timestamp_signup?: string;
  ip_opt: string;
  timestamp_opt?: string;
}
