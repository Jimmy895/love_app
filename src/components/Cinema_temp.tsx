import { useRef, useEffect, useState } from "react";

export const Cinema = ({ onComplete }: { onComplete: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ta funkcja odpala się od razu jak komponent wskoczy na ekran
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // Resetujemy czas na wszelki wypadek
          videoRef.current.currentTime = 0;
          // Próbujemy odpalić
          await videoRef.current.play();
        } catch (err) {
          console.error("Autoplay failed:", err);
          // Jeśli przeglądarka zablokuje, tutaj byśmy pokazali przycisk "Napraw",
          // ale skoro mówisz, że user już klikał wcześniej, to powinno pójść.
        }
      }
    };

    playVideo();
  }, []);

  const handleVideoEnd = () => {
    if (onComplete) onComplete();
  };

  return (
    <div className="fixed inset-0 z-20 bg-background flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        onEnded={handleVideoEnd}
        playsInline
        // Dodaj autoPlay, to pomaga przeglądarce zrozumieć intencje
        autoPlay 
        className="w-full h-full object-cover"
        src="/videos/WITH_SONG.mp4"
      >
        Your browser does not support video.
      </video>

      {/* Opcjonalnie: Przycisk awaryjny, gdyby jednak coś nie odpaliło */}
      <button
         onClick={() => videoRef.current?.play()}
         className="absolute top-4 right-4 text-white/10 hover:text-white z-50 p-4"
      >
         ⟳
      </button>
    </div>
  );
};