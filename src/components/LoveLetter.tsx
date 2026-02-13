import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface LoveLetterProps {
  onReset: () => void;
}

const LETTER_LINES = [
  "Kochanie,",
  "Każdy dzień z Tobą to dar,",
  "którego nie sposób opisać słowami.",
  "Od pierwszego spojrzenia wiedziałem,",
  "że moje serce należy do Ciebie.",
  "Twój śmiech jest moją ulubioną melodią,",
  "a Twoje oczy - moim niebem.",
  "Dziękuję, że jesteś.",
  "Dziękuję, że kochasz.",
  "Dziękuję, że pozwalasz mi kochać Ciebie.",
  "Na zawsze Twój Patryk,",
  "Kocham Cię najbardziej na świecie ❤️",
];

const LoveLetter = ({ onReset }: LoveLetterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<"typing" | "reveal">("typing");
  const fullTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
    );

    let cancelled = false;

    const typeLineByLine = async () => {
      // (Twoja logika pisania bez zmian...)
      for (let lineIdx = 0; lineIdx < LETTER_LINES.length; lineIdx++) {
        if (cancelled) return;
        const line = LETTER_LINES[lineIdx];
        const el = textRef.current;
        if (!el) return;

        el.textContent = "";
        gsap.set(el, { opacity: 1 });

        for (let charIdx = 0; charIdx < line.length; charIdx++) {
          if (cancelled) return;
          await new Promise((r) => setTimeout(r, 50));
          el.textContent = line.substring(0, charIdx + 1);
        }

        await new Promise((r) => setTimeout(r, 800));

        if (lineIdx < LETTER_LINES.length - 1) {
          await new Promise<void>((resolve) => {
            gsap.to(el, {
              opacity: 0,
              duration: 0.4,
              ease: "power2.in",
              onComplete: resolve,
            });
          });
        }
      }

      if (cancelled) return;
      setPhase("reveal");
    };

    typeLineByLine();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (phase !== "reveal") return;

    // Poczekaj chwilę, żeby DOM się przerysował przed animacją
    const timer = setTimeout(() => {
      const lines = fullTextRef.current?.querySelectorAll(".letter-line");
      if (lines && lines.length > 0) {
        gsap.fromTo(
            lines,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.15,
              ease: "power2.out",
              onComplete: () => {
                gsap.fromTo(
                    resetRef.current,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
                );
              },
            }
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [phase]);

  return (
      <div
          ref={containerRef}
          // ZMIANA 1: Dodano overflow-y-auto i usunięto flex center z głównego diva.
          // Teraz główny div to "okno", które można przewijać.
          className="fixed inset-0 z-10 overflow-y-auto overflow-x-hidden no-scrollbar"
          style={{
            background:
                "radial-gradient(ellipse at center, hsl(340 50% 10%) 0%, hsl(340 80% 4%) 100%)",
          }}
      >
        {/* ZMIANA 2: Wrapper wewnętrzny.
          min-h-full sprawia, że jeśli treść jest mała, to jest na środku (dzięki flex).
          Jeśli treść jest duża, wrapper rośnie i można go przewijać.
          Dodano py-20, żeby tekst nie dotykał krawędzi ekranu w poziomie (na górze i dole).
      */}
        <div className="min-h-full w-full flex flex-col items-center justify-center py-20 px-4">

          {phase === "typing" && (
              <p
                  ref={textRef}
                  className="text-2xl md:text-4xl font-love text-glow-strong text-secondary text-center max-w-2xl"
              />
          )}

          {phase === "reveal" && (
              <div ref={fullTextRef} className="max-w-lg text-center flex flex-col items-center">
                {LETTER_LINES.map((line, i) => (
                    <React.Fragment key={i}>
                      <p
                          className={`letter-line opacity-0 ${
                              i === 0
                                  ? "text-4xl md:text-5xl font-love text-glow-strong text-secondary mb-4 tracking-wide"
                                  : i >= LETTER_LINES.length - 2
                                      ? "text-2xl font-love text-accent text-glow mt-6 tracking-wide"
                                      : "text-lg md:text-xl font-elegant text-foreground/90 leading-relaxed tracking-wide mb-2"
                          }`}
                      >
                        {line}
                      </p>
                      {i === 0 && (
                          <div className="letter-line opacity-0 flex items-center justify-center mb-6 mt-2 gap-3 w-full">
                            <span className="block h-px w-16 bg-gradient-to-r from-transparent to-secondary/60" />
                            <span className="text-secondary text-glow text-lg">♥</span>
                            <span className="block h-px w-16 bg-gradient-to-l from-transparent to-secondary/60" />
                          </div>
                      )}
                    </React.Fragment>
                ))}
              </div>
          )}
        </div>

        {/* Przycisk resetu zostawiamy fixed, żeby zawsze był pod ręką w rogu, nawet jak przewijasz */}
        <button
            ref={resetRef}
            onClick={() => {
              gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.in",
                onComplete: onReset,
              });
            }}
            className="fixed bottom-6 right-6 opacity-0 px-4 py-2 rounded-full bg-black/40 text-muted-foreground text-sm backdrop-blur-md hover:bg-black/60 transition-all border border-white/10 z-50"
        >
          ↻
        </button>
      </div>
  );
};

export default LoveLetter;