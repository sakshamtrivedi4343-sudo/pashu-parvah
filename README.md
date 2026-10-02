# PashuParvah: Farm Health

Build a mobile-first web app prototype called "PashuParvah" — an AI-assisted livestock disease detection and management platform for Indian farmers, veterinarians, and government health officials (Smart India Hackathon prototype, demo only — use mock/dummy data everywhere, NO real backend, NO Supabase, NO auth system, just React state and localStorage to persist data during the session).

DESIGN: Clean, warm, rural-friendly UI. Primary color deep green (#2E7D32), accent orange (#F57C00), white background, rounded cards, large tap-friendly buttons (farmers may have low digital literacy), simple icons (use lucide-react). Include a language toggle (English / Hindi / Marathi) in the top bar — just needs to visually switch a few key labels using a static translation object, doesn't need to be fully functional.

ROLE SWITCHER: A dropdown/toggle at the top to switch between 3 views: "Farmer", "Veterinarian", "Government/Admin" — each shows a different dashboard.

1) FARMER DASHBOARD:

- "My Animals" list (cards with animal photo placeholder, name/tag ID, species, last checkup date, health status badge: Healthy/Monitor/At Risk in green/yellow/red)

- "+ Add Animal" form (name, species dropdown [Cow, Buffalo, Goat, Sheep, Poultry], age, tag ID)

- "Report Symptoms" flow: select animal → checklist of common symptoms (fever, loss of appetite, lameness, discharge, diarrhea, skin lesions, etc.) → upload image (just a file input, no real analysis needed) → on submit, show a mock "AI Risk Score" (random/rule-based: e.g., if 3+ symptoms selected show "High Risk" in red, else "Low Risk" in green) with a fake confidence percentage

- "Digital Health Record" per animal: timeline of vaccinations, past illnesses, treatments (mock seeded data)

- "Vaccination Reminders" card showing upcoming due dates with a "Mark Done" button

- Alert banner if any animal is flagged High Risk: "Vet has been notified"

2) VETERINARIAN DASHBOARD:

- "Incoming Alerts" list — cases sent from farmers, sorted by risk score (High Risk on top, red highlight)

- Click a case to see: animal details, symptoms reported, uploaded image, AI risk score, farmer contact info

- "Confirm Diagnosis" button → dropdown to select actual disease + "Prescribe Treatment" text field + "Mark Resolved" button

- Simple stats row: Total Cases Today, High Risk Pending, Resolved This Week (mock numbers)

3) GOVERNMENT/ADMIN DASHBOARD:

- "Disease Hotspot Map" — use a simple placeholder map graphic or a grid of village names with colored dots (red/yellow/green) indicating outbreak intensity (mock data, no real map API needed)

- "Disease Trend Chart" — a simple bar or line chart (use recharts) showing mock case counts over the last 7 days by disease type

- "Regional Summary Table": Village name, Total Reported Cases, Active Outbreaks, Vet Coverage %

- "Outbreak Alert" banner if any region crosses a mock threshold

GLOBAL:

- Bottom nav bar (mobile) with icons for Home, Report, Records, Alerts, Profile

- A small "Works Offline" badge in the header (just UI, no real offline logic needed)

- Seed the app with realistic mock data on load: 5-6 sample animals, 3-4 sample disease cases, 3 sample villages with hotspot data — so the demo looks populated immediately without manual data entry

Keep everything in a single Lovable generation — don't split into multiple back-and-forth builds. Prioritize a polished, demo-ready look over backend correctness since this is a hackathon internal-round prototype.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pashu-parvah-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8a4b6d8a-f156-4d9e-88a5-53d2b12ec4de).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
