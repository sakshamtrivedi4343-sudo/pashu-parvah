import { CalendarCheck, PawPrint } from "lucide-react";
import type { Animal } from "@/lib/pashu-types";
import { usePashu } from "@/context/pashu-context";
import { t, tAge, tName, tSpecies } from "@/lib/i18n";
import { StatusBadge } from "./Shell";

export function AnimalCard({ animal, onClick }: { animal: Animal; onClick?: () => void }) {
  const { lang } = usePashu();
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left shadow-sm transition-colors hover:bg-muted"
    >
      <span className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
        <PawPrint className="size-7" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="truncate text-base font-bold text-foreground">{tName(animal.name, lang)}</span>
          <StatusBadge status={animal.status} />
        </span>
        <span className="mt-0.5 block text-sm text-muted-foreground">
          {tSpecies(animal.species, lang)} · {tAge(animal.age, lang)} · {animal.tagId}
        </span>
        <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarCheck className="size-3.5" /> {t("lastCheckup", lang)} {animal.lastCheckup}
        </span>
      </span>
    </button>
  );
}
