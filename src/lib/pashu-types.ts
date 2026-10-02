export type Role = "farmer" | "vet" | "gov";
export type Lang = "en" | "hi" | "mr";
export type HealthStatus = "healthy" | "monitor" | "risk";
export type Species = "Cow" | "Buffalo" | "Goat" | "Sheep" | "Poultry";

export type RecordEntry = {
  id: string;
  date: string;
  kind: "vaccination" | "illness" | "treatment";
  title: string;
  note?: string;
};

export type Animal = {
  id: string;
  name: string;
  tagId: string;
  species: Species;
  age: string;
  lastCheckup: string;
  status: HealthStatus;
  photo?: string;
  records: RecordEntry[];
};

export type Reminder = {
  id: string;
  animalId: string;
  vaccine: string;
  dueDate: string;
  done: boolean;
};

export type Case = {
  id: string;
  animalId: string;
  animalName: string;
  species: Species;
  village: string;
  farmerName: string;
  farmerPhone: string;
  symptoms: string[];
  image?: string | undefined;
  risk: "high" | "low";
  confidence: number;
  reportedAt: string;
  status: "pending" | "resolved";
  diagnosis?: string;
  treatment?: string;
};

export type Village = {
  name: string;
  cases: number;
  outbreaks: number;
  vetCoverage: number;
  intensity: "high" | "medium" | "low";
};

export type TrendPoint = {
  day: string;
  FMD: number;
  Mastitis: number;
  PPR: number;
};
