import { useEffect, useState } from "react";

const LandscapeLock = () => {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const check = () => setIsPortrait(window.innerHeight > window.innerWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="text-center px-8">
        <p className="text-6xl mb-6">📱</p>
        <p
          className="text-2xl font-semibold text-secondary"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Obróć telefon do trybu poziomego ❤️
        </p>
      </div>
    </div>
  );
};

export default LandscapeLock;
