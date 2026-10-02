import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Stethoscope,
  FileText,
  Bell,
  User,
  WifiOff,
  Leaf,
  Languages,
  LogOut,
  Tractor,
  Building2,
  Download,
  Volume2,
  Square,
} from "lucide-react";
import { usePashu } from "@/context/pashu-context";
import { useInstallPrompt } from "@/hooks/use-install-prompt";
import { LANGS, t } from "@/lib/i18n";
import type { Lang, Role } from "@/lib/pashu-types";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ListenPageButton, SpeakBlock } from "./Voice";
import { useSpeak } from "@/hooks/use-speak";
import { VoiceAssistant } from "./VoiceAssistant";

const roles: { id: Role; key: "farmer" | "vet" | "gov"; icon: typeof Home }[] = [
  { id: "farmer", key: "farmer", icon: Tractor },
  { id: "vet", key: "vet", icon: Stethoscope },
  { id: "gov", key: "gov", icon: Building2 },
];

const nav = [
  { to: "/", icon: Home, key: "home" as const },
  { to: "/report", icon: Stethoscope, key: "report" as const },
  { to: "/records", icon: FileText, key: "records" as const },
  { to: "/alerts", icon: Bell, key: "alerts" as const },
  { to: "/profile", icon: User, key: "profile" as const },
];

/** Order in which the voice assistant asks the language question: Marathi, then Hindi, then English. */
const LANG_ASK_ORDER: Lang[] = ["mr", "hi", "en"];

function LanguagePicker({ compact }: { compact?: boolean }) {
  const { lang, setLang } = usePashu();
  const { speakMany, stop, speaking, supported } = useSpeak(lang);
  const askedRef = useRef(false);

  const askAloud = () =>
    speakMany(LANG_ASK_ORDER.map((l) => ({ lang: l, text: t("chooseLanguage", l) })));

  // On first visit (no saved language), the voice assistant asks the question
  // aloud in Marathi first, then Hindi, then English.
  useEffect(() => {
    if (compact || askedRef.current || !supported) return;
    askedRef.current = true;
    try {
      if (localStorage.getItem("pashuparvah-state-v1-lang")) return;
    } catch {
      /* ignore */
    }
    const id = window.setTimeout(askAloud, 600);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compact, supported]);

  return (
    <div>
      <p className="mb-1 flex items-center gap-1 text-[11px] font-semibold opacity-80">
        <Languages className="size-3.5" /> {t("chooseLanguage", lang)}
        {supported && (
          <button
            data-no-speak
            onClick={() => (speaking ? stop() : askAloud())}
            aria-label={t("listenHint", lang)}
            className="ml-auto flex size-8 items-center justify-center rounded-full bg-accent/15 text-accent"
          >
            {speaking ? <Square className="size-4" /> : <Volume2 className="size-4" />}
          </button>
        )}
      </p>
      <div className="flex gap-2">
        {LANGS.map((l) => (
          <button
            key={l.id}
            onClick={() => setLang(l.id as Lang)}
            className={cn(
              "flex-1 rounded-xl px-2 py-2.5 text-sm font-bold transition-colors",
              compact
                ? lang === l.id
                  ? "bg-accent text-accent-foreground shadow"
                  : "bg-primary-foreground/15 text-primary-foreground"
                : lang === l.id
                  ? "bg-accent text-accent-foreground shadow"
                  : "border border-border bg-card text-foreground",
            )}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function AuthGate({ pickedRole, onBack }: { pickedRole: Role; onBack: () => void }) {
  const { lang, login, signup, hasAccount } = usePashu();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  const digits = (v: string, max: number) => v.replace(/\D/g, "").slice(0, max);

  const submit = () => {
    setError(null);
    if (!phone || !pin || (mode === "signup" && !name)) return setError(t("errFields", lang));
    if (phone.length !== 10) return setError(t("errPhone", lang));
    if (pin.length !== 4) return setError(t("errPin", lang));
    if (mode === "login") {
      if (!hasAccount(phone)) {
        setMode("signup");
        return setError(t("errNoUser", lang));
      }
      const res = login(phone, pin);
      if (!res.ok && res.error) setError(t(res.error, lang));
    } else {
      const res = signup(name, phone, pin, pickedRole);
      if (!res.ok && res.error) {
        setMode("login");
        setError(t(res.error, lang));
      }
    }
  };

  const field = "w-full rounded-xl border border-border bg-card px-4 py-3.5 text-base text-foreground";

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-primary px-4 pb-5 pt-6 text-primary-foreground">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/15">
              <Leaf className="size-6" />
            </span>
            <div className="leading-tight">
              <p className="text-xl font-bold">PashuParvah</p>
              <p className="text-[11px] opacity-80">{t(pickedRole, lang)}</p>
            </div>
          </div>
          <LanguagePicker compact />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground">
          {t(mode === "login" ? "loginTitle" : "signupTitle", lang)}
        </h1>
        <p className="mb-4 text-sm text-muted-foreground">
          {t(mode === "login" ? "loginHint" : "signupHint", lang)}
        </p>

        <div className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
          {mode === "signup" && (
            <input
              className={field}
              placeholder={t("fullName", lang)}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            className={field}
            inputMode="numeric"
            placeholder={t("phone", lang)}
            value={phone}
            onChange={(e) => setPhone(digits(e.target.value, 10))}
          />
          <input
            className={field}
            inputMode="numeric"
            type="password"
            placeholder={t("pin", lang)}
            value={pin}
            onChange={(e) => setPin(digits(e.target.value, 4))}
          />
          {error && <p className="text-sm font-semibold text-danger">{error}</p>}
          <button
            onClick={submit}
            className="w-full rounded-xl bg-primary px-4 py-4 text-base font-bold text-primary-foreground shadow"
          >
            {t(mode === "login" ? "loginBtn" : "signupBtn", lang)}
          </button>
          <button
            onClick={() => {
              setError(null);
              setMode(mode === "login" ? "signup" : "login");
            }}
            className="w-full rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground"
          >
            {t(mode === "login" ? "toSignup" : "toLogin", lang)}
          </button>
        </div>

        <button onClick={onBack} className="mt-4 w-full py-3 text-sm font-semibold text-muted-foreground">
          {t("backToRoles", lang)}
        </button>
      </main>
      <ListenPageButton />
    </div>
  );
}

function RoleSelect({ onPick }: { onPick: (r: Role) => void }) {
  const { lang } = usePashu();
  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-primary px-4 pb-5 pt-6 text-primary-foreground">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/15">
              <Leaf className="size-6" />
            </span>
            <div className="leading-tight">
              <p className="text-xl font-bold">PashuParvah</p>
              <p className="text-[11px] opacity-80">{t("tagline", lang)}</p>
            </div>
          </div>
          <LanguagePicker compact />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground">{t("welcome", lang)}</h1>
        <h2 className="mt-4 text-lg font-bold text-foreground">{t("chooseRoleTitle", lang)}</h2>
        <p className="mb-4 text-sm text-muted-foreground">{t("chooseRoleHint", lang)}</p>
        <div className="space-y-3">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => onPick(r.id)}
              className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-colors hover:border-primary"
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <r.icon className="size-7" />
              </span>
              <span className="text-lg font-bold text-foreground">{t(r.key, lang)}</span>
            </button>
          ))}
        </div>
      </main>
      <ListenPageButton />
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { role, activeRole, user, hydrated, clearRole, lang } = usePashu();
  const { canInstall, install } = useInstallPrompt();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [picked, setPicked] = useState<Role | null>(null);

  if (!hydrated) return <div className="min-h-screen bg-surface" />;
  if (!user) {
    if (!picked && !activeRole) return <RoleSelect onPick={setPicked} />;
    return <AuthGate pickedRole={picked ?? activeRole ?? "farmer"} onBack={() => { setPicked(null); clearRole(); }} />;
  }


  return (
    <div className="min-h-screen bg-surface pb-24">
      <header className="sticky top-0 z-30 bg-primary text-primary-foreground shadow-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-2 px-4 pt-3">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary-foreground/15">
              <Leaf className="size-5" />
            </span>
            <div className="leading-tight">
              <p className="text-lg font-bold">PashuParvah</p>
              <p className="text-[11px] opacity-80">{t("tagline", lang)}</p>
            </div>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-primary-foreground/15 px-2 py-1 text-[11px] font-medium">
            <WifiOff className="size-3" /> {t("worksOffline", lang)}
          </span>
        </div>

        <div className="mx-auto max-w-2xl px-4 pt-3">
          <LanguagePicker compact />
        </div>

        <div className="mx-auto flex max-w-2xl items-center justify-between gap-2 px-4 pb-3 pt-3">
          <div className="leading-tight">
            <p className="text-[11px] font-semibold opacity-80">{t("loggedInAs", lang)}</p>
            <p className="text-base font-bold">
              {user.name} · {t(role, lang)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {canInstall && (
              <button
                onClick={install}
                className="flex items-center gap-1.5 rounded-xl bg-accent px-3 py-2.5 text-sm font-semibold text-accent-foreground"
              >
                <Download className="size-4" /> {t("installApp", lang)}
              </button>
            )}
            <button
              onClick={clearRole}
              className="flex items-center gap-1.5 rounded-xl bg-primary-foreground/15 px-3 py-2.5 text-sm font-semibold"
            >
              <LogOut className="size-4" /> {t("signOut", lang)}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-4">{children}</main>
      <ListenPageButton />
      <VoiceAssistant />

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card">
        <div className="mx-auto flex max-w-2xl">
          {nav.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <n.icon className={cn("size-5", active && "stroke-[2.5]")} />
                {t(n.key, lang)}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}


export function SectionCard({
  title,
  hint,
  action,
  children,
  className,
}: {
  title?: string;
  hint?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mb-4 rounded-2xl border border-border bg-card p-4 shadow-sm", className)}>
      <SpeakBlock>
        {(title || action) && (
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              {title && <h2 className="text-base font-bold text-foreground">{title}</h2>}
              {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
            </div>
            {action}
          </div>
        )}
        {children}
      </SpeakBlock>
    </section>
  );
}

export function StatusBadge({ status }: { status: "healthy" | "monitor" | "risk" }) {
  const { lang } = usePashu();
  const map = {
    healthy: "bg-success/15 text-success",
    monitor: "bg-warning/25 text-warning-foreground",
    risk: "bg-danger/15 text-danger",
  } as const;
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold", map[status])}>
      {t(status, lang)}
    </span>
  );
}
