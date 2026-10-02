import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Mic, MicOff, Sparkles, Check, X } from "lucide-react";
import { usePashu } from "@/context/pashu-context";
import { SYMPTOMS } from "@/data/seed";
import { SectionCard } from "./Shell";
import { tName, tSpecies, tSymptom } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { analyseVoiceCase, type VoiceCase } from "@/lib/voice-case.functions";
import type { Case, Lang } from "@/lib/pashu-types";

const L = (o: Record<Lang, string>, l: Lang) => o[l];
const T = {
  title: { mr: "आवाजाने सांगा", hi: "बोलकर बताइए", en: "Tell by voice" },
  hint: {
    mr: "माइक दाबा आणि जनावराला काय होत आहे ते सांगा",
    hi: "माइक दबाइए और बताइए जानवर को क्या हो रहा है",
    en: "Tap the mic and describe what is wrong with your animal",
  },
  speak: { mr: "बोलायला सुरू करा", hi: "बोलना शुरू करें", en: "Start speaking" },
  stop: { mr: "थांबा", hi: "रुकें", en: "Stop" },
  transcript: { mr: "तुम्ही काय म्हणालात (बदलू शकता)", hi: "आपने क्या कहा (बदल सकते हैं)", en: "What you said (you can edit)" },
  analyse: { mr: "समजून घ्या", hi: "समझिए", en: "Understand" },
  working: { mr: "समजून घेत आहे…", hi: "समझ रहा हूँ…", en: "Understanding…" },
  review: { mr: "तपासा आणि खात्री करा", hi: "जाँचें और पक्का करें", en: "Check and confirm" },
  animal: { mr: "जनावर", hi: "जानवर", en: "Animal" },
  pick: { mr: "जनावर निवडा", hi: "जानवर चुनें", en: "Choose animal" },
  symptoms: { mr: "लक्षणे (बदलण्यासाठी दाबा)", hi: "लक्षण (बदलने के लिए दबाएँ)", en: "Symptoms (tap to change)" },
  urgency: { mr: "किती तातडीचे", hi: "कितना ज़रूरी", en: "How urgent" },
  low: { mr: "कमी", hi: "कम", en: "Low" },
  medium: { mr: "मध्यम", hi: "मध्यम", en: "Medium" },
  high: { mr: "जास्त", hi: "ज़्यादा", en: "High" },
  confirm: { mr: "बरोबर आहे, पाठवा", hi: "सही है, भेजें", en: "Correct, send" },
  cancel: { mr: "रद्द करा", hi: "रद्द करें", en: "Cancel" },
  saved: {
    mr: "नोंद जतन झाली आणि डॉक्टरांना पाठवली.",
    hi: "रिपोर्ट सेव हुई और डॉक्टर को भेजी गई.",
    en: "Report saved and sent to the doctor.",
  },
  noMic: { mr: "या फोनवर आवाज ओळख नाही — खाली लिहा.", hi: "इस फोन पर आवाज़ पहचान नहीं — नीचे लिखें.", en: "Voice not supported here — type below." },
};
const LOCALE: Record<Lang, string> = { mr: "mr-IN", hi: "hi-IN", en: "en-IN" };

export function VoiceReport() {
  const { animals, addCase, lang } = usePashu();
  const analyse = useServerFn(analyseVoiceCase);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<VoiceCase | null>(null);
  const [saved, setSaved] = useState(false);
  const recRef = useRef<any>(null);

  const startMic = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return setError(L(T.noMic, lang));
    const rec = new SR();
    rec.lang = LOCALE[lang];
    rec.continuous = true;
    rec.interimResults = false;
    rec.onresult = (e: any) => {
      let s = "";
      for (let i = e.resultIndex; i < e.results.length; i++) s += e.results[i][0].transcript + " ";
      setText((cur) => (cur + " " + s).trim());
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    setError(null);
    setSaved(false);
    setListening(true);
    rec.start();
  };

  const run = async () => {
    recRef.current?.stop();
    setLoading(true);
    setError(null);
    try {
      const res = await analyse({
        data: {
          transcript: text,
          lang,
          animals: animals.map((a) => ({ id: a.id, name: a.name, species: a.species })),
          symptoms: [...SYMPTOMS],
        },
      });
      if (res.ok) setDraft(res.case);
      else setError(res.error);
    } catch {
      setError("AI could not process this right now.");
    } finally {
      setLoading(false);
    }
  };

  const confirm = () => {
    if (!draft) return;
    const animal = animals.find((a) => a.id === draft.animalId);
    if (!animal || draft.symptoms.length === 0) return;
    const c: Case = {
      id: `c${Date.now()}`,
      animalId: animal.id,
      animalName: animal.name,
      species: animal.species,
      village: "Shirpur",
      farmerName: "Ramesh Patil",
      farmerPhone: "+91 98220 11234",
      symptoms: draft.symptoms,
      risk: draft.urgency === "high" ? "high" : "low",
      confidence: draft.urgency === "high" ? 90 : draft.urgency === "medium" ? 75 : 65,
      reportedAt: new Date().toISOString().slice(0, 10),
      status: "pending",
    };
    addCase(c);
    setDraft(null);
    setText("");
    setSaved(true);
  };

  const canConfirm = !!draft && !!animals.find((a) => a.id === draft.animalId) && draft.symptoms.length > 0;

  return (
    <SectionCard title={L(T.title, lang)} hint={L(T.hint, lang)}>
      <button
        onClick={() => (listening ? recRef.current?.stop() : startMic())}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-2xl py-5 text-lg font-bold shadow",
          listening ? "animate-pulse bg-danger text-primary-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        {listening ? <MicOff className="size-6" /> : <Mic className="size-6" />}
        {L(listening ? T.stop : T.speak, lang)}
      </button>

      <label className="mt-3 block text-xs font-semibold text-muted-foreground">{L(T.transcript, lang)}</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="mt-1 w-full rounded-xl border border-input bg-card px-3 py-2 text-base text-foreground"
      />
      <button
        onClick={run}
        disabled={!text.trim() || loading}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-base font-bold text-accent-foreground disabled:opacity-50"
      >
        <Sparkles className="size-5" /> {L(loading ? T.working : T.analyse, lang)}
      </button>
      {error && <p className="mt-2 text-sm font-semibold text-danger">{error}</p>}
      {saved && <p className="mt-2 text-sm font-semibold text-success">{L(T.saved, lang)}</p>}

      {draft && (
        <div className="mt-4 space-y-3 rounded-2xl border-2 border-accent/50 bg-accent/5 p-3">
          <p className="text-base font-bold text-foreground">{L(T.review, lang)}</p>
          {draft.summary && <p className="text-sm text-foreground">{draft.summary}</p>}

          <div>
            <p className="mb-1 text-xs font-semibold text-muted-foreground">{L(T.animal, lang)}</p>
            <select
              value={draft.animalId ?? ""}
              onChange={(e) => setDraft({ ...draft, animalId: e.target.value || null })}
              className="w-full rounded-xl border border-input bg-card px-3 py-3 text-base"
            >
              <option value="">{L(T.pick, lang)}</option>
              {animals.map((a) => (
                <option key={a.id} value={a.id}>
                  {tName(a.name, lang)} · {tSpecies(a.species, lang)} · {a.tagId}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold text-muted-foreground">{L(T.symptoms, lang)}</p>
            <div className="grid grid-cols-2 gap-2">
              {SYMPTOMS.map((s) => {
                const on = draft.symptoms.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() =>
                      setDraft({
                        ...draft,
                        symptoms: on ? draft.symptoms.filter((x) => x !== s) : [...draft.symptoms, s],
                      })
                    }
                    className={cn(
                      "rounded-xl border px-2 py-2.5 text-left text-sm",
                      on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted text-foreground",
                    )}
                  >
                    {tSymptom(s, lang)}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold text-muted-foreground">{L(T.urgency, lang)}</p>
            <div className="flex gap-2">
              {(["low", "medium", "high"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setDraft({ ...draft, urgency: u })}
                  className={cn(
                    "flex-1 rounded-xl border py-3 text-sm font-bold",
                    draft.urgency === u
                      ? u === "high"
                        ? "border-danger bg-danger text-primary-foreground"
                        : u === "medium"
                          ? "border-warning bg-warning text-warning-foreground"
                          : "border-success bg-success text-primary-foreground"
                      : "border-border bg-card text-foreground",
                  )}
                >
                  {L(T[u], lang)}
                </button>
              ))}
            </div>
            {draft.reason && <p className="mt-1 text-xs text-muted-foreground">{draft.reason}</p>}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setDraft(null)}
              className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-border py-3.5 text-sm font-semibold text-foreground"
            >
              <X className="size-4" /> {L(T.cancel, lang)}
            </button>
            <button
              onClick={confirm}
              disabled={!canConfirm}
              className="flex flex-[2] items-center justify-center gap-1 rounded-xl bg-primary py-3.5 text-base font-bold text-primary-foreground disabled:opacity-50"
            >
              <Check className="size-5" /> {L(T.confirm, lang)}
            </button>
          </div>
        </div>
      )}
    </SectionCard>
  );
}
