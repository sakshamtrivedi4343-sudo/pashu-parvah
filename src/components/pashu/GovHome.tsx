import { Siren } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { trend, villages } from "@/data/seed";
import { usePashu } from "@/context/pashu-context";
import { t, tDay, tDisease, tVillage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { SectionCard } from "./Shell";

const dot = {
  high: "bg-danger",
  medium: "bg-warning",
  low: "bg-success",
} as const;

export function GovHome() {
  const { lang } = usePashu();
  const outbreak = villages.filter((v) => v.cases >= 20);
  const chartData = trend.map((p) => ({ ...p, day: tDay(p.day, lang) }));

  return (
    <div>
      {outbreak[0] && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-danger/30 bg-danger/10 p-4">
          <Siren className="mt-0.5 size-5 shrink-0 text-danger" />
          <div>
            <p className="font-bold text-danger">
              {t("outbreakAlert", lang)} — {tVillage(outbreak[0].name, lang)}
            </p>
            <p className="text-sm text-foreground/80">
              {outbreak[0].cases} {t("outbreakText", lang)}
            </p>
          </div>
        </div>
      )}

      <SectionCard title={t("hotspotMap", lang)}>
        <div className="rounded-2xl bg-secondary/60 p-4">
          <div className="grid grid-cols-3 gap-3">
            {villages.map((v) => (
              <div key={v.name} className="rounded-xl bg-card p-3 text-center shadow-sm">
                <span className={cn("mx-auto mb-2 block size-5 rounded-full", dot[v.intensity])} />
                <p className="text-sm font-bold text-foreground">{tVillage(v.name, lang)}</p>
                <p className="text-xs text-muted-foreground">
                  {v.cases} {t("cases", lang)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="size-2.5 rounded-full bg-danger" /> {t("high", lang)}
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2.5 rounded-full bg-warning" /> {t("medium", lang)}
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2.5 rounded-full bg-success" /> {t("low", lang)}
            </span>
          </div>
        </div>
      </SectionCard>

      <SectionCard title={t("trendTitle", lang)}>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="FMD"
                name={tDisease("Foot & Mouth Disease (FMD)", lang)}
                fill="var(--chart-1)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="Mastitis"
                name={tDisease("Mastitis", lang)}
                fill="var(--chart-2)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="PPR"
                name={tDisease("Peste des Petits Ruminants (PPR)", lang)}
                fill="var(--chart-5)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title={t("regionalSummary", lang)}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th className="py-2">{t("village", lang)}</th>
                <th className="py-2">{t("cases", lang)}</th>
                <th className="py-2">{t("outbreaks", lang)}</th>
                <th className="py-2">{t("vetCoverage", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {villages.map((v) => (
                <tr key={v.name} className="border-t border-border">
                  <td className="py-3 font-semibold text-foreground">{tVillage(v.name, lang)}</td>
                  <td className="py-3">{v.cases}</td>
                  <td className="py-3">{v.outbreaks}</td>
                  <td className="py-3">{v.vetCoverage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
