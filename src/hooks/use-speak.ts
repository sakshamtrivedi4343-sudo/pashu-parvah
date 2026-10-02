import { useCallback, useEffect, useState } from "react";
import type { Lang } from "@/lib/pashu-types";

const LOCALE: Record<Lang, string> = { en: "en-IN", hi: "hi-IN", mr: "mr-IN" };

export function useSpeak(lang: Lang) {
  const [speaking, setSpeaking] = useState(false);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => () => { if (supported) window.speechSynthesis.cancel(); }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    (text: string) => {
      if (!supported || !text.trim()) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const locale = LOCALE[lang];
      u.lang = locale;
      const voices = window.speechSynthesis.getVoices();
      const v =
        voices.find((x) => x.lang === locale) ??
        voices.find((x) => x.lang.startsWith(locale.slice(0, 2))) ??
        (lang === "mr" ? voices.find((x) => x.lang.startsWith("hi")) : undefined);
      if (v) u.voice = v;
      u.rate = 0.9;
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(u);
    },
    [lang, supported],
  );

  /** Speak several lines one after another, each in its own language. */
  const speakMany = useCallback(
    (items: { text: string; lang: Lang }[]) => {
      if (!supported) return;
      const queue = items.filter((i) => i.text.trim());
      if (!queue.length) return;
      window.speechSynthesis.cancel();
      setSpeaking(true);
      const voices = window.speechSynthesis.getVoices();
      queue.forEach((item, idx) => {
        const u = new SpeechSynthesisUtterance(item.text);
        const locale = LOCALE[item.lang];
        u.lang = locale;
        const v =
          voices.find((x) => x.lang === locale) ??
          voices.find((x) => x.lang.startsWith(locale.slice(0, 2))) ??
          (item.lang === "mr" ? voices.find((x) => x.lang.startsWith("hi")) : undefined);
        if (v) u.voice = v;
        u.rate = 0.9;
        if (idx === queue.length - 1) {
          u.onend = () => setSpeaking(false);
          u.onerror = () => setSpeaking(false);
        }
        window.speechSynthesis.speak(u);
      });
    },
    [supported],
  );

  return { speak, speakMany, stop, speaking, supported };
}
