import { useState } from "react";
import { AlertTriangle, ImageIcon, Phone, ShieldCheck } from "lucide-react";
import { usePashu } from "@/context/pashu-context";
import { DISEASES } from "@/data/seed";
import { t, tDisease, tName, tSpecies, tSymptom, tText, tVillage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { SectionCard } from "./Shell";

export function VetHome() {
  const { cases, resolveCase, lang } = usePashu();
  const [openId, setOpenId] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState(DISEASES[0]!);
  const [treatment, setTreatment] = useState("");

  const pending = [...cases]
    .filter((c) => c.status === "pending")
    .sort((a, b) => (a.risk === b.risk ? 0 : a.risk === "high" ? -1 : 1));
  const resolved = cases.filter((c) => c.status === "resolved");

  return (
    <div>
      <div className="mb-4 grid grid-cols-3 gap-2">
        {[
          { label: t("casesToday", lang), value: cases.length },
          { label: t("highRiskPending", lang), value: pending.filter((c) => c.risk === "high").length },
          { label: t("resolvedWeek", lang), value: resolved.length },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-primary">{s.value}</p>
            <p className="text-[11px] leading-tight text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <SectionCard title={t("incomingAlerts", lang)} hint={t("tapToOpen", lang)}>
        {pending.length === 0 && <p className="text-sm text-muted-foreground">{t("noPending", lang)}</p>}
        <ul className="space-y-3">
          {pending.map((c) => (
            <li
              key={c.id}
              className={cn(
                "rounded-2xl border p-3",
                c.risk === "high" ? "border-danger/40 bg-danger/10" : "border-border bg-muted",
              )}
            >
              <button
                className="flex w-full items-center justify-between gap-2 text-left"
                onClick={() => setOpenId(openId === c.id ? null : c.id)}
              >
                <div>
                  <p className="font-bold text-foreground">
                    {tName(c.animalName, lang)} · {tSpecies(c.species, lang)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tVillage(c.village, lang)} · {tName(c.farmerName, lang)} · {c.reportedAt}
                  </p>
                </div>
                <span
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold",
                    c.risk === "high" ? "bg-danger text-danger-foreground" : "bg-success text-success-foreground",
                  )}
                >
                  {c.risk === "high" && <AlertTriangle className="size-3" />}
                  {c.risk === "high" ? t("highRisk", lang) : t("lowRisk", lang)} · {c.confidence}%
                </span>
              </button>

              {openId === c.id && (
                <div className="mt-3 space-y-3 border-t border-border pt-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                      {t("symptomsLabel", lang)}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {c.symptoms.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          {tSymptom(s, lang)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {c.image ? (
                      <img src={c.image} alt={tName(c.animalName, lang)} className="size-20 rounded-xl object-cover" />
                    ) : (
                      <span className="flex size-20 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                        <ImageIcon className="size-6" />
                      </span>
                    )}
                    <a
                      href={`tel:${c.farmerPhone}`}
                      className="flex items-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
                    >
                      <Phone className="size-4" /> {c.farmerPhone}
                    </a>
                  </div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">
                    {t("diagnosisLabel", lang)}
                  </p>
                  <select
                    className="w-full rounded-xl border border-input bg-card px-3 py-3 text-base"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                  >
                    {DISEASES.map((d) => (
                      <option key={d} value={d}>
                        {tDisease(d, lang)}
                      </option>
                    ))}
                  </select>
                  <textarea
                    className="w-full rounded-xl border border-input bg-card px-3 py-3 text-base"
                    rows={3}
                    placeholder={t("treatmentPlaceholder", lang)}
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      resolveCase(c.id, diagnosis, treatment || "Standard treatment protocol advised.");
                      setTreatment("");
                      setOpenId(null);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-base font-bold text-primary-foreground"
                  >
                    <ShieldCheck className="size-5" /> {t("confirmResolve", lang)}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={t("recentlyResolved", lang)}>
        {resolved.length === 0 && (
          <p className="text-sm text-muted-foreground">{t("nothingResolved", lang)}</p>
        )}
        <ul className="space-y-2">
          {resolved.map((c) => (
            <li key={c.id} className="rounded-xl bg-muted p-3">
              <p className="font-semibold text-foreground">
                {tName(c.animalName, lang)} — {tDisease(c.diagnosis ?? "", lang)}
              </p>
              <p className="text-xs text-muted-foreground">{tText(c.treatment ?? "", lang)}</p>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
