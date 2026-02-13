import { useRef, useEffect } from "react";
import gsap from "gsap";

interface CinemaProps {
  onEnd: () => void;
}

const Cinema = ({ onEnd }: CinemaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // Auto-play video & audio
    videoRef.current?.play().catch(() => {});
    audioRef.current?.play().catch(() => {});
  }, []);

  const handleVideoEnd = () => {
    audioRef.current?.pause();
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
      className="fixed inset-0 z-20 bg-background flex items-center justify-center"
    >
      <video
        ref={videoRef}
        onEnded={handleVideoEnd}
        playsInline
        muted={false}
        className="w-full h-full object-cover"
        src="/videos/WITH_MUSIC.mp4"
      >
        Your browser does not support video.
      </video>

      <audio ref={audioRef} src="" loop={false} />

      {/* Placeholder overlay when no video src */}
      {/*<div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">*/}
      {/*  <div className="text-center">*/}
      {/*    <p className="text-4xl mb-4">🎬</p>*/}
      {/*    <p className="text-xl text-secondary italic">*/}
      {/*      Video placeholder*/}
      {/*    </p>*/}
      {/*    <p className="text-muted-foreground mt-2">*/}
      {/*      Dodaj plik wideo i audio aby zobaczyć kino miłości*/}
      {/*    </p>*/}
      {/*    <button*/}
      {/*      onClick={handleVideoEnd}*/}
      {/*      className="mt-6 px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm hover:brightness-110 transition-all"*/}
      {/*    >*/}
      {/*      Pomiń → List miłosny*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default Cinema;
