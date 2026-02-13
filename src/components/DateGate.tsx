import { useRef, useState } from "react";
import gsap from "gsap";

interface DateGateProps {
  onCorrect: () => void;
}

const CORRECT_DATE = "2025-07-12";

const DateGate = ({ onCorrect }: DateGateProps) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!value) return;

    if (value === CORRECT_DATE) {
      setError(false);
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: onCorrect,
      });
    } else {
      setError(true);
      gsap.fromTo(
        inputRef.current,
        { x: -12 },
        { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" }
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <div className="text-center max-w-md px-6">
        <h1 className="text-4xl md:text-6xl font-love text-glow-strong text-secondary mb-4 tracking-wide">
          Kiedy zaczęła się nasza historia?
        </h1>
        <p className="text-muted-foreground text-lg mb-8 font-elegant italic tracking-wider">
          Wybierz datę, która zmieniła wszystko...
        </p>

        <div ref={inputRef}>
          <input
            type="date"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            className="w-64 h-12 rounded-lg bg-muted/50 border border-border text-foreground text-center text-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-sm"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:brightness-110 transition-all font-love text-xl"
        >
          Sprawdź ❤️
        </button>

        {error && (
          <p className="mt-4 text-accent text-lg italic animate-fade-in">
            Spróbuj ponownie kochanie 💕
          </p>
        )}
      </div>
    </div>
  );
};

export default DateGate;
