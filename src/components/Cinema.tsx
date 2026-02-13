import { useRef, useEffect } from "react";
import gsap from "gsap";

interface CinemaProps {
  onEnd: () => void;
}

const Cinema = ({ onEnd }: CinemaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null); // Opcjonalne, jeśli masz audio

  // Flaga, żeby nie odpalać wyciszania w kółko przy każdej klatce
  const isFadingRef = useRef(false);

  useEffect(() => {
    // Animacja wejścia (fade in)
    gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    if (videoRef.current) {
      // Ustawiamy głośność na start na 100%
      videoRef.current.volume = 1.0;
      videoRef.current.play().catch((e) => console.log("Autoplay blocked", e));
    }

    // Jeśli używasz osobnego audio:
    // if (audioRef.current) {
    //    audioRef.current.volume = 1.0;
    //    audioRef.current.play().catch(() => {});
    // }

  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const totalDuration = video.duration;
    const currentTime = video.currentTime;

    // Moment rozpoczęcia wyciszania: 3/4 długości filmu (75%)
    const fadeStartPoint = totalDuration * 0.5;

    // Sprawdzamy, czy przekroczyliśmy ten punkt i czy już nie wyciszamy
    if (currentTime >= fadeStartPoint && !isFadingRef.current) {
      isFadingRef.current = true; // Zablokuj ponowne odpalenie

      // Obliczamy ile czasu zostało do końca, żeby wyciszenie trwało do samego końca
      const timeRemaining = totalDuration - currentTime;

      // Animujemy głośność wideo do 0
      gsap.to(video, {
        volume: 0,
        duration: timeRemaining, // Wycisza się płynnie aż do końca filmu
        ease: "linear" // Liniowe wyciszanie (najbardziej naturalne)
      });

      // Jeśli masz osobne audio, je też wyciszamy:
      if (audioRef.current) {
        gsap.to(audioRef.current, {
          volume: 0,
          duration: timeRemaining,
          ease: "linear"
        });
      }
    }
  };

  const handleVideoEnd = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: onEnd,
    });
  };

  return (
      <div
          ref={containerRef}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      >
        <video
            ref={videoRef}
            onEnded={handleVideoEnd}
            onTimeUpdate={handleTimeUpdate} // <--- TO JEST KLUCZOWE
            playsInline
            // Ważne: usuń muted={false} lub zostaw puste, byle nie muted
            className="w-full h-full object-cover"
            src="/videos/WITH_SONG.mp4"
        >
          Your browser does not support video.
        </video>

        {/* Opcjonalne audio */}
        {/* <audio ref={audioRef} src="/muzyka.mp3" /> */}

        {/* Przycisk pomiń */}
        <button
            onClick={handleVideoEnd}
            className="absolute bottom-8 right-8 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all z-30"
        >
          Pomiń →
        </button>
      </div>
  );
};

export default Cinema;