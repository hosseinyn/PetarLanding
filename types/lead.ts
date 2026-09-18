export interface LeadFormValues {
  fullName: string;
  role: string;
  grade: string;
  schoolName: string;
  phone: string;
  message: string;
}

export interface LeadFormErrors {
  fullName?: string;
  role?: string;
  grade?: string;
  schoolName?: string;
  phone?: string;
  message?: string;
}
