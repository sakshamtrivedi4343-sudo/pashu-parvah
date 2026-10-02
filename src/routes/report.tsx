import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, Camera, CheckCircle2 } from "lucide-react";
import { usePashu } from "@/context/pashu-context";
import { SYMPTOMS } from "@/data/seed";
import { SectionCard } from "@/components/pashu/Shell";
import { VoiceReport } from "@/components/pashu/VoiceReport";
import { t, tName, tSpecies, tSymptom } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Case } from "@/lib/pashu-types";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report Symptoms — PashuParvah" },
      {
        name: "description",
        content: "Select an animal, tick observed symptoms, attach a photo and get an instant AI risk score.",
      },
      { property: "og:title", content: "Report Symptoms — PashuParvah" },
      {
        property: "og:description",
        content: "Instant AI risk scoring for livestock symptoms, sent straight to the nearest vet.",
      },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  const { animals, addCase, lang } = usePashu();
  const [animalId, setAnimalId] = useState(animals[0]?.id ?? "");
  const [selected, setSelected] = useState<string[]>([]);
  const [image, setImage] = useState<string | undefined>();
  const [result, setResult] = useState<{ risk: "high" | "low"; confidence: number } | null>(null);

  const toggle = (s: string) =>
    setSelected((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const submit = () => {
    const animal = animals.find((a) => a.id === animalId);
    if (!animal || selected.length === 0) return;
    const risk = selected.length >= 3 ? "high" : "low";
    const confidence = risk === "high" ? 82 + Math.floor(Math.random() * 15) : 60 + Math.floor(Math.random() * 20);
    const newCase: Case = {
      id: `c${Date.now()}`,
      animalId: animal.id,
      animalName: animal.name,
      species: animal.species,
      village: "Shirpur",
      farmerName: "Ramesh Patil",
      farmerPhone: "+91 98220 11234",
      symptoms: selected,
      image,
      risk,
      confidence,
      reportedAt: new Date().toISOString().slice(0, 10),
      status: "pending",
    };
    addCase(newCase);
    setResult({ risk, confidence });
  };

  return (
    <div>
      <VoiceReport />
      <SectionCard title={t("step1", lang)}>
        <select
          className="w-full rounded-xl border border-input bg-card px-3 py-3.5 text-base"
          value={animalId}
          onChange={(e) => setAnimalId(e.target.value)}
        >
          {animals.map((a) => (
            <option key={a.id} value={a.id}>
              {tName(a.name, lang)} · {tSpecies(a.species, lang)} · {a.tagId}
            </option>
          ))}
        </select>
      </SectionCard>

      <SectionCard title={t("step2", lang)} hint={t("pickAtLeastOne", lang)}>
        <div className="grid grid-cols-2 gap-2">
          {SYMPTOMS.map((s) => {
            const on = selected.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggle(s)}
                className={cn(
                  "rounded-xl border px-3 py-4 text-left text-sm font-medium transition-colors",
                  on
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted text-foreground",
                )}
              >
                {tSymptom(s, lang)}
              </button>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title={t("step3", lang)}>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-input bg-muted p-4">
          <Camera className="size-6 text-primary" />
          <span className="text-sm font-medium text-foreground">{t("takePhoto", lang)}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setImage(URL.createObjectURL(f));
            }}
          />
        </label>
        {image && <img src={image} alt={t("takePhoto", lang)} className="mt-3 h-40 w-full rounded-xl object-cover" />}
      </SectionCard>

      <button
        onClick={submit}
        disabled={selected.length === 0}
        className="mb-4 w-full rounded-2xl bg-accent py-5 text-lg font-bold text-accent-foreground disabled:opacity-50"
      >
        {t("analyse", lang)}
      </button>

      {result && (
        <div
          className={cn(
            "rounded-2xl border p-4",
            result.risk === "high" ? "border-danger/40 bg-danger/10" : "border-success/40 bg-success/10",
          )}
        >
          <div className="flex items-center gap-2">
            <Activity className={cn("size-5", result.risk === "high" ? "text-danger" : "text-success")} />
            <p className={cn("text-lg font-bold", result.risk === "high" ? "text-danger" : "text-success")}>
              {result.risk === "high" ? t("highRisk", lang) : t("lowRisk", lang)} · {result.confidence}%{" "}
              {t("confidence", lang)}
            </p>
          </div>
          <p className="mt-2 text-sm text-foreground/80">
            {result.risk === "high" ? t("highAdvice", lang) : t("lowAdvice", lang)}
          </p>
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <CheckCircle2 className="size-3.5" /> {t("sentToVet", lang)}
          </p>
        </div>
      )}
    </div>
  );
}
