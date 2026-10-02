import { useRef, type ReactNode } from "react";
import { Volume2, Square } from "lucide-react";
import { usePashu } from "@/context/pashu-context";
import { useSpeak } from "@/hooks/use-speak";
import { t } from "@/lib/i18n";

function textOf(el: Element | null) {
  if (!el) return "";
  const clone = el.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("[data-no-speak], svg, input, select, textarea").forEach((n) => n.remove());
  return (clone.innerText || clone.textContent || "").replace(/\s+/g, " ").trim();
}

/** Big floating button that reads the whole page aloud in the chosen language. */
export function ListenPageButton() {
  const { lang } = usePashu();
  const { speak, stop, speaking, supported } = useSpeak(lang);
  if (!supported) return null;
  return (
    <button
      data-no-speak
      onClick={() => (speaking ? stop() : speak(textOf(document.querySelector("main"))))}
      aria-label={t(speaking ? "stopListen" : "listenPage", lang)}
      className="fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full bg-accent px-5 py-4 text-base font-bold text-accent-foreground shadow-lg"
    >
      {speaking ? <Square className="size-6" /> : <Volume2 className="size-6" />}
      {t(speaking ? "stopListen" : "listenPage", lang)}
    </button>
  );
}

/** Small speaker icon that reads just the wrapped block. */
export function SpeakBlock({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = usePashu();
  const { speak, stop, speaking, supported } = useSpeak(lang);
  return (
    <div ref={ref} className={className}>
      {supported && (
        <button
          data-no-speak
          onClick={() => (speaking ? stop() : speak(textOf(ref.current)))}
          aria-label={t("listenHint", lang)}
          className="float-right ml-2 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          {speaking ? <Square className="size-5" /> : <Volume2 className="size-5" />}
        </button>
      )}
      {children}
    </div>
  );
}
