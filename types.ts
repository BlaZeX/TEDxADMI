
export interface Speaker {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

export enum FormType {
  NONE,
  REGISTER,
  CONTACT,
  FEEDBACK,
}
