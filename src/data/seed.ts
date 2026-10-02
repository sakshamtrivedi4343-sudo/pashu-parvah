import type { Animal, Case, Reminder, TrendPoint, Village } from "@/lib/pashu-types";

const today = new Date();
const d = (offset: number) => {
  const x = new Date(today);
  x.setDate(x.getDate() + offset);
  return x.toISOString().slice(0, 10);
};

export const SYMPTOMS = [
  "Fever",
  "Loss of appetite",
  "Lameness",
  "Nasal discharge",
  "Diarrhea",
  "Skin lesions",
  "Drop in milk yield",
  "Excess salivation",
  "Coughing",
  "Swollen udder",
];

export const DISEASES = [
  "Foot & Mouth Disease (FMD)",
  "Mastitis",
  "Peste des Petits Ruminants (PPR)",
  "Haemorrhagic Septicaemia",
  "Bloat",
  "Lumpy Skin Disease",
];

export const seedAnimals: Animal[] = [
  {
    id: "a1",
    name: "Gauri",
    tagId: "IN-MH-1042",
    species: "Cow",
    age: "4 yrs",
    lastCheckup: d(-12),
    status: "healthy",
    records: [
      { id: "r1", date: d(-200), kind: "vaccination", title: "FMD Vaccine — Dose 1" },
      { id: "r2", date: d(-90), kind: "illness", title: "Mild mastitis", note: "Resolved in 6 days" },
      { id: "r3", date: d(-85), kind: "treatment", title: "Intramammary antibiotic course" },
    ],
  },
  {
    id: "a2",
    name: "Kalu",
    tagId: "IN-MH-1043",
    species: "Buffalo",
    age: "6 yrs",
    lastCheckup: d(-3),
    status: "risk",
    records: [
      { id: "r4", date: d(-150), kind: "vaccination", title: "HS Vaccine" },
      { id: "r5", date: d(-3), kind: "illness", title: "High fever + lameness reported" },
    ],
  },
  {
    id: "a3",
    name: "Moti",
    tagId: "IN-MH-2210",
    species: "Goat",
    age: "2 yrs",
    lastCheckup: d(-25),
    status: "monitor",
    records: [
      { id: "r6", date: d(-120), kind: "vaccination", title: "PPR Vaccine" },
      { id: "r7", date: d(-25), kind: "illness", title: "Loose motions", note: "Under observation" },
    ],
  },
  {
    id: "a4",
    name: "Chandni",
    tagId: "IN-MH-2211",
    species: "Cow",
    age: "5 yrs",
    lastCheckup: d(-40),
    status: "healthy",
    records: [{ id: "r8", date: d(-40), kind: "vaccination", title: "Deworming + FMD booster" }],
  },
  {
    id: "a5",
    name: "Bali",
    tagId: "IN-MH-3305",
    species: "Sheep",
    age: "3 yrs",
    lastCheckup: d(-60),
    status: "healthy",
    records: [{ id: "r9", date: d(-60), kind: "treatment", title: "Hoof trimming" }],
  },
  {
    id: "a6",
    name: "Coop A",
    tagId: "IN-MH-P-018",
    species: "Poultry",
    age: "8 months",
    lastCheckup: d(-8),
    status: "monitor",
    records: [
      { id: "r10", date: d(-70), kind: "vaccination", title: "Ranikhet Disease vaccine" },
      { id: "r11", date: d(-8), kind: "illness", title: "Reduced feed intake in 4 birds" },
    ],
  },
];

export const seedReminders: Reminder[] = [
  { id: "v1", animalId: "a1", vaccine: "FMD Booster", dueDate: d(3), done: false },
  { id: "v2", animalId: "a3", vaccine: "PPR Booster", dueDate: d(8), done: false },
  { id: "v3", animalId: "a6", vaccine: "Ranikhet Dose 2", dueDate: d(14), done: false },
  { id: "v4", animalId: "a4", vaccine: "Deworming", dueDate: d(-2), done: false },
];

export const seedCases: Case[] = [
  {
    id: "c1",
    animalId: "a2",
    animalName: "Kalu",
    species: "Buffalo",
    village: "Shirpur",
    farmerName: "Ramesh Patil",
    farmerPhone: "+91 98220 11234",
    symptoms: ["Fever", "Lameness", "Excess salivation", "Loss of appetite"],
    risk: "high",
    confidence: 91,
    reportedAt: d(-1),
    status: "pending",
  },
  {
    id: "c2",
    animalId: "a3",
    animalName: "Moti",
    species: "Goat",
    village: "Warud",
    farmerName: "Sunita Deshmukh",
    farmerPhone: "+91 90280 44119",
    symptoms: ["Diarrhea", "Loss of appetite"],
    risk: "low",
    confidence: 68,
    reportedAt: d(-2),
    status: "pending",
  },
  {
    id: "c3",
    animalId: "a6",
    animalName: "Coop A",
    species: "Poultry",
    village: "Shirpur",
    farmerName: "Ramesh Patil",
    farmerPhone: "+91 98220 11234",
    symptoms: ["Coughing", "Loss of appetite", "Nasal discharge"],
    risk: "high",
    confidence: 84,
    reportedAt: d(-3),
    status: "pending",
  },
  {
    id: "c4",
    animalId: "a1",
    animalName: "Gauri",
    species: "Cow",
    village: "Kolhewadi",
    farmerName: "Anil Jadhav",
    farmerPhone: "+91 97650 77821",
    symptoms: ["Swollen udder", "Drop in milk yield"],
    risk: "low",
    confidence: 72,
    reportedAt: d(-5),
    status: "resolved",
    diagnosis: "Mastitis",
    treatment: "Intramammary antibiotics for 5 days, warm compress twice daily.",
  },
];

export const villages: Village[] = [
  { name: "Shirpur", cases: 24, outbreaks: 2, vetCoverage: 45, intensity: "high" },
  { name: "Warud", cases: 11, outbreaks: 1, vetCoverage: 68, intensity: "medium" },
  { name: "Kolhewadi", cases: 4, outbreaks: 0, vetCoverage: 82, intensity: "low" },
];

export const trend: TrendPoint[] = [
  { day: "Mon", FMD: 3, Mastitis: 2, PPR: 1 },
  { day: "Tue", FMD: 5, Mastitis: 1, PPR: 2 },
  { day: "Wed", FMD: 4, Mastitis: 3, PPR: 0 },
  { day: "Thu", FMD: 7, Mastitis: 2, PPR: 3 },
  { day: "Fri", FMD: 9, Mastitis: 4, PPR: 2 },
  { day: "Sat", FMD: 6, Mastitis: 3, PPR: 4 },
  { day: "Sun", FMD: 8, Mastitis: 5, PPR: 3 },
];
