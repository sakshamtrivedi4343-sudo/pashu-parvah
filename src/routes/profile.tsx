import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, MapPin, Phone, ShieldCheck, User } from "lucide-react";
import { usePashu } from "@/context/pashu-context";
import { SectionCard } from "@/components/pashu/Shell";
import { t, tName } from "@/lib/i18n";
import type { Lang } from "@/lib/pashu-types";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — PashuParvah" },
      {
        name: "description",
        content: "Manage your PashuParvah profile, village details and language preferences.",
      },
      { property: "og:title", content: "Profile — PashuParvah" },
      {
        property: "og:description",
        content: "Your PashuParvah account details, village and contact information.",
      },
    ],
  }),
  component: ProfilePage,
});

const profiles = {
  farmer: {
    name: "Ramesh Patil",
    phone: "+91 98220 11234",
    place: { en: "Shirpur, Maharashtra", hi: "शिरपुर, महाराष्ट्र", mr: "शिरपूर, महाराष्ट्र" },
    sub: { en: "Farmer", hi: "किसान", mr: "शेतकरी" },
  },
  vet: {
    name: "Dr. Meera Kulkarni",
    phone: "+91 99870 55210",
    place: { en: "Warud Block Vet Centre", hi: "वरुड ब्लॉक पशु केंद्र", mr: "वरुड तालुका पशु केंद्र" },
    sub: { en: "Veterinarian · Block Officer", hi: "पशु डॉक्टर · ब्लॉक अधिकारी", mr: "पशुवैद्य · तालुका अधिकारी" },
  },
  gov: {
    name: "District Animal Husbandry",
    phone: "+91 1800 220 900",
    place: { en: "Nashik District Office", hi: "नासिक ज़िला कार्यालय", mr: "नाशिक जिल्हा कार्यालय" },
    sub: { en: "Government · District Admin", hi: "सरकार · ज़िला प्रशासन", mr: "शासन · जिल्हा प्रशासन" },
  },
} as const;

function ProfilePage() {
  const { role, animals, cases, lang } = usePashu();
  const p = profiles[role];

  return (
    <div>
      <SectionCard>
        <div className="flex items-center gap-4">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <User className="size-8" />
          </span>
          <div>
            <p className="text-lg font-bold text-foreground">{tName(p.name, lang)}</p>
            <p className="text-sm text-muted-foreground">{p.sub[lang as Lang]}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Phone className="size-4" /> {p.phone}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="size-4" /> {p.place[lang as Lang]}
          </p>
          <p className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" /> {t("demoNote", lang)}
          </p>
        </div>
      </SectionCard>

      <SectionCard title={t("help", lang)}>
        <p className="flex items-start gap-2 text-sm text-foreground/80">
          <LifeBuoy className="mt-0.5 size-4 shrink-0 text-accent" /> {t("helpText", lang)}
        </p>
        <a
          href="tel:1962"
          className="mt-3 block rounded-2xl bg-accent py-4 text-center text-lg font-bold text-accent-foreground"
        >
          1962
        </a>
      </SectionCard>

      <SectionCard title={t("activity", lang)}>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-muted p-3 text-center">
            <p className="text-2xl font-bold text-primary">{animals.length}</p>
            <p className="text-xs text-muted-foreground">{t("animalsCount", lang)}</p>
          </div>
          <div className="rounded-xl bg-muted p-3 text-center">
            <p className="text-2xl font-bold text-primary">{cases.length}</p>
            <p className="text-xs text-muted-foreground">{t("cases", lang)}</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
