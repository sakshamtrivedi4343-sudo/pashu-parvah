import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Animal, Case, Lang, Reminder, Role } from "@/lib/pashu-types";
import { seedAnimals, seedCases, seedReminders } from "@/data/seed";

const KEY = "pashuparvah-state-v1";
const USERS_KEY = "pashuparvah-users";
const SESSION_KEY = "pashuparvah-session";

export type PashuUser = { name: string; phone: string; role: Role };
type StoredUser = PashuUser & { pin: string };

function readUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]") as StoredUser[];
  } catch {
    return [];
  }
}

type State = { animals: Animal[]; cases: Case[]; reminders: Reminder[] };

type Ctx = State & {
  role: Role;
  activeRole: Role | null;
  hydrated: boolean;
  setRole: (r: Role) => void;
  clearRole: () => void;
  user: PashuUser | null;
  hasAccount: (phone: string) => boolean;
  login: (phone: string, pin: string) => { ok: boolean; error?: "errNoUser" | "errWrongPin" };
  signup: (name: string, phone: string, pin: string, role: Role) => { ok: boolean; error?: "errExists" };
  logout: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  addAnimal: (a: Omit<Animal, "id" | "records" | "status" | "lastCheckup">) => void;
  addCase: (c: Case) => void;
  resolveCase: (id: string, diagnosis: string, treatment: string) => void;
  markReminderDone: (id: string) => void;
};

const PashuContext = createContext<Ctx | null>(null);

export function PashuProvider({ children }: { children: ReactNode }) {
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [user, setUser] = useState<PashuUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [lang, setLang] = useState<Lang>("mr");
  const [state, setState] = useState<State>({
    animals: seedAnimals,
    cases: seedCases,
    reminders: seedReminders,
  });


  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState(JSON.parse(raw) as State);
      const savedLang = localStorage.getItem(`${KEY}-lang`) as Lang | null;
      if (savedLang) setLang(savedLang);
      const savedRole = localStorage.getItem("userRole") as Role | null;
      if (savedRole === "farmer" || savedRole === "vet" || savedRole === "gov")
        setActiveRole(savedRole);
      const session = localStorage.getItem(SESSION_KEY);
      if (session) setUser(JSON.parse(session) as PashuUser);

    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(`${KEY}-lang`, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);


  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      role: activeRole ?? "farmer",
      activeRole,
      hydrated,
      setRole: (r: Role) => {
        setActiveRole(r);
        try {
          localStorage.setItem("userRole", r);
        } catch {
          /* ignore */
        }
      },
      clearRole: () => {
        setActiveRole(null);
        setUser(null);
        try {
          localStorage.removeItem("userRole");
          localStorage.removeItem(SESSION_KEY);
        } catch {
          /* ignore */
        }
      },
      user,
      hasAccount: (phone: string) => readUsers().some((u) => u.phone === phone),
      login: (phone, pin) => {
        const found = readUsers().find((u) => u.phone === phone);
        if (!found) return { ok: false, error: "errNoUser" as const };
        if (found.pin !== pin) return { ok: false, error: "errWrongPin" as const };
        const session: PashuUser = { name: found.name, phone: found.phone, role: found.role };
        setUser(session);
        setActiveRole(found.role);
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
          localStorage.setItem("userRole", found.role);
        } catch {
          /* ignore */
        }
        return { ok: true };
      },
      signup: (name, phone, pin, role) => {
        const users = readUsers();
        if (users.some((u) => u.phone === phone)) return { ok: false, error: "errExists" as const };
        const session: PashuUser = { name, phone, role };
        setUser(session);
        setActiveRole(role);
        try {
          localStorage.setItem(USERS_KEY, JSON.stringify([...users, { ...session, pin }]));
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
          localStorage.setItem("userRole", role);
        } catch {
          /* ignore */
        }
        return { ok: true };
      },
      logout: () => {
        setUser(null);
        try {
          localStorage.removeItem(SESSION_KEY);
        } catch {
          /* ignore */
        }
      },
      lang,
      setLang,


      addAnimal: (a) =>
        setState((s) => ({
          ...s,
          animals: [
            ...s.animals,
            {
              ...a,
              id: `a${Date.now()}`,
              status: "healthy",
              lastCheckup: new Date().toISOString().slice(0, 10),
              records: [],
            },
          ],
        })),
      addCase: (c) =>
        setState((s) => ({
          ...s,
          cases: [c, ...s.cases],
          animals: s.animals.map((a) =>
            a.id === c.animalId
              ? {
                  ...a,
                  status: c.risk === "high" ? "risk" : "monitor",
                  lastCheckup: c.reportedAt,
                  records: [
                    {
                      id: `r${Date.now()}`,
                      date: c.reportedAt,
                      kind: "illness" as const,
                      title: `Symptoms reported: ${c.symptoms.join(", ")}`,
                      note: `AI risk: ${c.risk === "high" ? "High" : "Low"} (${c.confidence}%)`,
                    },
                    ...a.records,
                  ],
                }
              : a,
          ),
        })),
      resolveCase: (id, diagnosis, treatment) =>
        setState((s) => {
          const target = s.cases.find((c) => c.id === id);
          return {
            ...s,
            cases: s.cases.map((c) =>
              c.id === id ? { ...c, status: "resolved" as const, diagnosis, treatment } : c,
            ),
            animals: s.animals.map((a) =>
              target && a.id === target.animalId
                ? {
                    ...a,
                    status: "healthy" as const,
                    records: [
                      {
                        id: `r${Date.now()}`,
                        date: new Date().toISOString().slice(0, 10),
                        kind: "treatment" as const,
                        title: `Diagnosed: ${diagnosis}`,
                        note: treatment,
                      },
                      ...a.records,
                    ],
                  }
                : a,
            ),
          };
        }),
      markReminderDone: (id) =>
        setState((s) => ({
          ...s,
          reminders: s.reminders.map((r) => (r.id === id ? { ...r, done: true } : r)),
        })),
    }),
    [state, activeRole, hydrated, lang, user],
  );

  return <PashuContext.Provider value={value}>{children}</PashuContext.Provider>;
}

export function usePashu() {
  const ctx = useContext(PashuContext);
  if (!ctx) throw new Error("usePashu must be used inside PashuProvider");
  return ctx;
}
