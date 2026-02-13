import { useRef, useEffect } from "react";
import gsap from "gsap";

interface PlayTriggerProps {
  onPlay: () => void;
}

const PlayTrigger = ({ onPlay }: PlayTriggerProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
    );

    // pulsing
    gsap.to(btnRef.current, {
      scale: 1.08,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const handleClick = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.5,
      ease: "power2.in",
      onComplete: onPlay,
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <button
        ref={btnRef}
        onClick={handleClick}
        className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-primary drop-shadow-[0_0_40px_hsl(348_83%_47%/0.5)] hover:drop-shadow-[0_0_60px_hsl(348_83%_47%/0.7)] transition-all cursor-pointer bg-transparent border-none"
        aria-label="Play"
      >
        {/* Heart SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        {/* Play icon overlay */}
        <svg
          viewBox="0 0 24 24"
          fill="hsl(0 0% 100%)"
          className="absolute w-10 h-10 md:w-12 md:h-12"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
};

export default PlayTrigger;
