export interface LeadFormValues {
  fullName: string;
  role: string;
  grade: string;
  schoolName: string;
  phone: string;
  message: string;
  traits: string[];
  competitionRating: number | "";
  freeTimeActivities: string[];
  aboutYourself: string;
}

export interface LeadFormErrors {
  fullName?: string;
  role?: string;
  grade?: string;
  schoolName?: string;
  phone?: string;
  message?: string;
  traits?: string;
  competitionRating?: string;
  freeTimeActivities?: string;
  aboutYourself?: string;
}
