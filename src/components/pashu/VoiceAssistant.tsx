import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Mic, MicOff } from "lucide-react";
import { usePashu } from "@/context/pashu-context";
import { useSpeak } from "@/hooks/use-speak";
import type { Lang } from "@/lib/pashu-types";

const LOCALE: Record<Lang, string> = { mr: "mr-IN", hi: "hi-IN", en: "en-IN" };

type Tri = Record<Lang, string>;
const S = {
  ask: { mr: "बोला", hi: "बोलिए", en: "Speak" },
  listening: { mr: "ऐकत आहे…", hi: "सुन रहा हूँ…", en: "Listening…" },
  greet: {
    mr: "नमस्कार! मी तुमचा मदतनीस. 'लक्षणे', 'नोंदी', 'सूचना', 'प्रोफाइल', 'मुख्य पान' किंवा 'वाचून दाखवा' असे बोला.",
    hi: "नमस्ते! मैं आपका सहायक हूँ. 'लक्षण', 'रिकॉर्ड', 'अलर्ट', 'प्रोफाइल', 'होम' या 'पढ़कर सुनाओ' बोलिए.",
    en: "Hello! I am your assistant. Say 'report', 'records', 'alerts', 'profile', 'home' or 'read page'.",
  },
  home: { mr: "मुख्य पान उघडले", hi: "होम पेज खोला", en: "Opened home" },
  report: { mr: "लक्षणे नोंदवण्याचे पान उघडले", hi: "लक्षण बताने का पेज खोला", en: "Opened report symptoms" },
  records: { mr: "आरोग्य नोंदी उघडल्या", hi: "स्वास्थ्य रिकॉर्ड खोले", en: "Opened health records" },
  alerts: { mr: "सूचना उघडल्या", hi: "अलर्ट खोले", en: "Opened alerts" },
  profile: { mr: "प्रोफाइल उघडले", hi: "प्रोफाइल खोला", en: "Opened profile" },
  lang: { mr: "आता मराठी", hi: "अब हिंदी", en: "Now English" },
  bye: { mr: "बाहेर पडत आहे", hi: "साइन आउट कर रहे हैं", en: "Signing out" },
  unknown: {
    mr: "माफ करा, समजले नाही. पुन्हा बोला.",
    hi: "माफ़ कीजिए, समझ नहीं आया. फिर से बोलिए.",
    en: "Sorry, I did not understand. Please try again.",
  },
  noMic: {
    mr: "या फोनवर आवाज ओळख उपलब्ध नाही.",
    hi: "इस फोन पर आवाज़ पहचान उपलब्ध नहीं है.",
    en: "Voice input is not available on this device.",
  },
} satisfies Record<string, Tri>;

const has = (s: string, words: string[]) => words.some((w) => s.includes(w));

export function VoiceAssistant() {
  const { lang, setLang, clearRole } = usePashu();
  const { speak, stop } = useSpeak(lang);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const recRef = useRef<any>(null);

  useEffect(() => () => recRef.current?.abort?.(), []);

  const say = (key: keyof typeof S, l: Lang = lang) => speak(S[key][l]);

  const handle = (raw: string) => {
    const s = raw.toLowerCase();
    setHeard(raw);
    if (has(s, ["मराठी", "marathi"])) { setLang("mr"); return setTimeout(() => speak(S.lang.mr), 50); }
    if (has(s, ["हिंदी", "हिन्दी", "hindi"])) { setLang("hi"); return setTimeout(() => speak(S.lang.hi), 50); }
    if (has(s, ["english", "इंग्रजी", "अंग्रेजी", "अंग्रेज़ी"])) { setLang("en"); return setTimeout(() => speak(S.lang.en), 50); }
    const go = (to: "/" | "/report" | "/records" | "/alerts" | "/profile", key: keyof typeof S) => {
      navigate({ to });
      say(key);
    };
    if (has(s, ["लक्षण", "आजार", "बीमार", "report", "symptom", "sick", "रिपोर्ट"])) return go("/report", "report");
    if (has(s, ["नोंद", "रिकॉर्ड", "record", "history", "इतिहास"])) return go("/records", "records");
    if (has(s, ["सूचना", "अलर्ट", "alert", "चेतावनी", "इशारा"])) return go("/alerts", "alerts");
    if (has(s, ["प्रोफाइल", "profile", "मदत", "help", "मदद"])) return go("/profile", "profile");
    if (has(s, ["मुख्य", "होम", "home", "घर", "dashboard"])) return go("/", "home");
    if (has(s, ["वाच", "पढ़", "सुना", "read", "ऐकव"])) {
      const main = document.querySelector("main") as HTMLElement | null;
      return speak((main?.innerText || "").replace(/\s+/g, " "));
    }
    if (has(s, ["बाहेर", "लॉग आउट", "साइन आउट", "sign out", "logout"])) { say("bye"); return setTimeout(clearRole, 800); }
    if (has(s, ["नमस्कार", "नमस्ते", "hello", "hi"])) return say("greet");
    say("unknown");
  };

  const start = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return say("noMic");
    stop();
    const rec = new SR();
    rec.lang = LOCALE[lang];
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    rec.onresult = (e: any) => {
      const alts = Array.from(e.results[0]).map((a: any) => a.transcript as string);
      handle(alts.join(" "));
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    setHeard("");
    setListening(true);
    rec.start();
  };

  const toggle = () => (listening ? recRef.current?.stop() : start());

  return (
    <div className="fixed bottom-24 left-4 z-40 flex flex-col items-start gap-2" data-no-speak>
      {(listening || heard) && (
        <span className="max-w-[60vw] rounded-xl bg-card px-3 py-2 text-sm font-semibold text-foreground shadow">
          {listening ? S.listening[lang] : `“${heard}”`}
        </span>
      )}
      <button
        onClick={toggle}
        onDoubleClick={() => say("greet")}
        aria-label={S.ask[lang]}
        className={`flex items-center gap-2 rounded-full px-5 py-4 text-base font-bold shadow-lg ${
          listening ? "animate-pulse bg-danger text-primary-foreground" : "bg-primary text-primary-foreground"
        }`}
      >
        {listening ? <MicOff className="size-6" /> : <Mic className="size-6" />}
        {S.ask[lang]}
      </button>
    </div>
  );
}
