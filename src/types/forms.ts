export interface FormData {
  name: string;
  phone: string;
  message?: string;
  consent: boolean;
  formType: 'callback' | 'audit' | 'consultation';
  timestamp: number;
  csrfToken: string;
}

export interface FormSubmission extends FormData {
  ip: string;
  userAgent: string;
  referer: string;
  submittedAt: string;
}

export interface FormResponse {
  success: boolean;
  message: string;
}
