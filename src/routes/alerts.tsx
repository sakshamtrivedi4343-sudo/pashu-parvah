import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, BellRing, Siren } from "lucide-react";
import { usePashu } from "@/context/pashu-context";
import { villages } from "@/data/seed";
import { SectionCard } from "@/components/pashu/Shell";
import { VetHome } from "@/components/pashu/VetHome";
import { t, tName, tSpecies, tSymptom, tVillage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts & Outbreaks — PashuParvah" },
      {
        name: "description",
        content: "High-risk animal alerts, vet notifications and village-level outbreak warnings in real time.",
      },
      { property: "og:title", content: "Alerts & Outbreaks — PashuParvah" },
      {
        property: "og:description",
        content: "Track high-risk cases and outbreak thresholds across villages.",
      },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  const { role, cases, animals, lang } = usePashu();

  if (role === "vet") return <VetHome />;

  if (role === "gov") {
    return (
      <SectionCard title={t("regionalAlerts", lang)}>
        <ul className="space-y-3">
          {villages.map((v) => (
            <li
              key={v.name}
              className={cn(
                "flex items-start gap-3 rounded-2xl border p-3",
                v.intensity === "high"
                  ? "border-danger/40 bg-danger/10"
                  : v.intensity === "medium"
                    ? "border-warning/50 bg-warning/15"
                    : "border-border bg-muted",
              )}
            >
              <Siren className="mt-0.5 size-5 shrink-0 text-foreground/70" />
              <div>
                <p className="font-bold text-foreground">{tVillage(v.name, lang)}</p>
                <p className="text-sm text-muted-foreground">
                  {v.cases} {t("cases", lang)} · {v.outbreaks} {t("activeOutbreaks", lang)} · {v.vetCoverage}%{" "}
                  {t("coverage", lang)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    );
  }

  const mine = cases.filter((c) => c.status === "pending");

  return (
    <div>
      <SectionCard title={t("myAlerts", lang)}>
        {mine.length === 0 && <p className="text-sm text-muted-foreground">{t("noAlerts", lang)}</p>}
        <ul className="space-y-3">
          {mine.map((c) => (
            <li
              key={c.id}
              className={cn(
                "rounded-2xl border p-3",
                c.risk === "high" ? "border-danger/40 bg-danger/10" : "border-border bg-muted",
              )}
            >
              <p className="flex items-center gap-2 font-bold text-foreground">
                {c.risk === "high" ? (
                  <AlertTriangle className="size-4 text-danger" />
                ) : (
                  <BellRing className="size-4 text-primary" />
                )}
                {tName(c.animalName, lang)} — {c.risk === "high" ? t("highRisk", lang) : t("lowRisk", lang)} (
                {c.confidence}%)
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {c.symptoms.map((s) => tSymptom(s, lang)).join(", ")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("reported", lang)} {c.reportedAt} · {t("vetNotified", lang)}
              </p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={t("needAttention", lang)}>
        <ul className="space-y-2">
          {animals
            .filter((a) => a.status !== "healthy")
            .map((a) => (
              <li key={a.id} className="rounded-xl bg-muted p-3 text-sm">
                <span className="font-semibold text-foreground">{tName(a.name, lang)}</span> ·{" "}
                {tSpecies(a.species, lang)} · {a.status === "risk" ? t("risk", lang) : t("monitor", lang)}
              </li>
            ))}
        </ul>
      </SectionCard>
    </div>
  );
}
