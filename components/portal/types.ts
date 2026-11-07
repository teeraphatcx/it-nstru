export type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: string;
  suggestions?: string[];
};

export type CurriculumTab = "credits" | "tracks" | "admissions" | "fees";

export type CareerItem = {
  title: string;
  titleEn: string;
  description: string;
  skills: string[];
  icon: string;
  highlight?: string;
};

export type FacultyMember = {
  name: string;
  rank: string;
  position: string;
  degree?: string;
  specialty: string[];
  email: string;
  image: string;
  portfolio?: string;
  scholar?: string;
};
