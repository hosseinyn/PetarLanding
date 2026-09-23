export interface Friend {
  fullName: string;
  schoolName: string;
}

export interface FriendErrors {
  fullName?: string;
  schoolName?: string;
}

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
  friends: Friend[];
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
  friends?: string;
  friendItems?: FriendErrors[];
}
