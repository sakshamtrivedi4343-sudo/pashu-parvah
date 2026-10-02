import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pill, Stethoscope, Syringe } from "lucide-react";
import { usePashu } from "@/context/pashu-context";
import { SectionCard } from "@/components/pashu/Shell";
import { AnimalCard } from "@/components/pashu/AnimalCard";
import { t, tName, tText } from "@/lib/i18n";

export const Route = createFileRoute("/records")({
  head: () => ({
    meta: [
      { title: "Digital Health Records — PashuParvah" },
      {
        name: "description",
        content: "Vaccination, illness and treatment history for every registered animal in one timeline.",
      },
      { property: "og:title", content: "Digital Health Records — PashuParvah" },
      {
        property: "og:description",
        content: "A complete digital health timeline for each animal on the farm.",
      },
    ],
  }),
  component: RecordsPage,
});

const icons = {
  vaccination: Syringe,
  illness: Stethoscope,
  treatment: Pill,
} as const;

function RecordsPage() {
  const { animals, lang } = usePashu();
  const [openId, setOpenId] = useState<string | null>(animals[0]?.id ?? null);
  const animal = animals.find((a) => a.id === openId);

  return (
    <div>
      <SectionCard title={t("selectAnimal", lang)} hint={t("tapToOpen", lang)}>
        <div className="space-y-3">
          {animals.map((a) => (
            <AnimalCard key={a.id} animal={a} onClick={() => setOpenId(a.id)} />
          ))}
        </div>
      </SectionCard>

      {animal && (
        <SectionCard title={`${t("healthRecord", lang)} — ${tName(animal.name, lang)}`}>
          {animal.records.length === 0 && (
            <p className="text-sm text-muted-foreground">{t("noHistory", lang)}</p>
          )}
          <ol className="relative space-y-4 border-l border-border pl-5">
            {animal.records.map((r) => {
              const Icon = icons[r.kind];
              return (
                <li key={r.id} className="relative">
                  <span className="absolute -left-[30px] flex size-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Icon className="size-3.5" />
                  </span>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                  <p className="font-semibold text-foreground">{tText(r.title, lang)}</p>
                  {r.note && <p className="text-sm text-muted-foreground">{tText(r.note, lang)}</p>}
                </li>
              );
            })}
          </ol>
        </SectionCard>
      )}
    </div>
  );
}
