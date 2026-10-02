import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Plus, Syringe } from "lucide-react";
import { usePashu } from "@/context/pashu-context";
import { t, tName, tSpecies, tText } from "@/lib/i18n";
import type { Species } from "@/lib/pashu-types";
import { AnimalCard } from "./AnimalCard";
import { SectionCard } from "./Shell";

const SPECIES: Species[] = ["Cow", "Buffalo", "Goat", "Sheep", "Poultry"];

export function FarmerHome() {
  const { animals, reminders, markReminderDone, addAnimal, lang } = usePashu();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", species: "Cow" as Species, age: "", tagId: "" });

  const atRisk = animals.filter((a) => a.status === "risk");
  const due = reminders.filter((r) => !r.done);

  return (
    <div>
      {atRisk.length > 0 && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-danger/30 bg-danger/10 p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-danger" />
          <div>
            <p className="font-bold text-danger">
              {atRisk.length} {t("riskBanner", lang)}
            </p>
            <p className="text-sm text-foreground/80">{t("vetNotified", lang)}</p>
          </div>
        </div>
      )}

      <div className="mb-4 grid grid-cols-3 gap-2">
        {[
          { label: t("animalsCount", lang), value: animals.length },
          { label: t("atRiskCount", lang), value: atRisk.length },
          { label: t("dueVaccines", lang), value: due.length },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-primary">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <SectionCard title={t("vaccination", lang)} action={<Syringe className="size-4 text-accent" />}>
        {due.length === 0 && (
          <p className="text-sm text-muted-foreground">{t("allVaccinesDone", lang)}</p>
        )}
        <ul className="space-y-2">
          {due.map((r) => {
            const animal = animals.find((a) => a.id === r.animalId);
            return (
              <li
                key={r.id}
                className="flex items-center justify-between gap-2 rounded-xl bg-muted p-3"
              >
                <div>
                  <p className="font-semibold text-foreground">{tText(r.vaccine, lang)}</p>
                  <p className="text-xs text-muted-foreground">
                    {animal ? tName(animal.name, lang) : ""} · {t("due", lang)} {r.dueDate}
                  </p>
                </div>
                <button
                  onClick={() => markReminderDone(r.id)}
                  className="flex items-center gap-1 rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  <CheckCircle2 className="size-4" /> {t("markDone", lang)}
                </button>
              </li>
            );
          })}
        </ul>
      </SectionCard>

      <SectionCard
        title={t("myAnimals", lang)}
        hint={t("tapToOpen", lang)}
        action={
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1 rounded-xl bg-accent px-3 py-2.5 text-sm font-bold text-accent-foreground"
          >
            <Plus className="size-4" /> {t("addAnimal", lang)}
          </button>
        }
      >
        {open && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.name.trim()) return;
              addAnimal(form);
              setForm({ name: "", species: "Cow", age: "", tagId: "" });
              setOpen(false);
            }}
            className="mb-4 space-y-3 rounded-xl bg-muted p-3"
          >
            <input
              className="w-full rounded-xl border border-input bg-card px-3 py-3 text-base"
              placeholder={t("animalName", lang)}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <select
              className="w-full rounded-xl border border-input bg-card px-3 py-3 text-base"
              value={form.species}
              onChange={(e) => setForm({ ...form, species: e.target.value as Species })}
            >
              {SPECIES.map((s) => (
                <option key={s} value={s}>
                  {tSpecies(s, lang)}
                </option>
              ))}
            </select>
            <input
              className="w-full rounded-xl border border-input bg-card px-3 py-3 text-base"
              placeholder={t("age", lang)}
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
            <input
              className="w-full rounded-xl border border-input bg-card px-3 py-3 text-base"
              placeholder={t("tagId", lang)}
              value={form.tagId}
              onChange={(e) => setForm({ ...form, tagId: e.target.value })}
            />
            <button className="w-full rounded-xl bg-primary py-3.5 text-base font-bold text-primary-foreground">
              {t("saveAnimal", lang)}
            </button>
          </form>
        )}
        <div className="space-y-3">
          {animals.map((a) => (
            <AnimalCard key={a.id} animal={a} />
          ))}
        </div>
      </SectionCard>

      <Link
        to="/report"
        className="block rounded-2xl bg-accent py-4 text-center text-lg font-bold text-accent-foreground shadow-sm"
      >
        {t("reportSymptoms", lang)}
      </Link>
    </div>
  );
}
