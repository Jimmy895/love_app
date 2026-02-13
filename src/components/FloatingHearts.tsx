import { useEffect, useRef } from "react";
import gsap from "gsap";

const HEART_COUNT = 40;
const HEART_CHARS = ["♥", "❤", "💕", "💗", "💖", "♡"];

const FloatingHearts = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hearts: HTMLDivElement[] = [];

    for (let i = 0; i < HEART_COUNT; i++) {
      const heart = document.createElement("div");
      heart.innerHTML = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];
      heart.style.position = "absolute";
      heart.style.fontSize = `${gsap.utils.random(14, 40)}px`;
      heart.style.opacity = "0";
      heart.style.pointerEvents = "none";
      heart.style.userSelect = "none";
      heart.style.filter = `blur(${gsap.utils.random(0, 2)}px)`;
      container.appendChild(heart);
      hearts.push(heart);

      animateHeart(heart);
    }

    function animateHeart(el: HTMLDivElement) {
      const startX = gsap.utils.random(0, 100);
      const hue = gsap.utils.random(320, 360);
      const sat = gsap.utils.random(70, 100);
      const light = gsap.utils.random(60, 85);
      el.style.color = `hsl(${hue} ${sat}% ${light}%)`;
      el.style.textShadow = `0 0 ${gsap.utils.random(8, 20)}px hsl(${hue} ${sat}% ${light}% / 0.6)`;

      gsap.set(el, {
        left: `${startX}%`,
        top: "110%",
        opacity: 0,
        scale: gsap.utils.random(0.4, 1.4),
        rotation: gsap.utils.random(-45, 45),
      });

      gsap.to(el, {
        top: "-10%",
        opacity: gsap.utils.random(0.2, 0.6),
        duration: gsap.utils.random(6, 14),
        ease: "none",
        delay: gsap.utils.random(0, 6),
        x: `+=${gsap.utils.random(-120, 120)}`,
        rotation: `+=${gsap.utils.random(-90, 90)}`,
        onComplete: () => animateHeart(el),
      });
    }

    return () => {
      hearts.forEach((h) => h.remove());
      gsap.killTweensOf(hearts);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    />
  );
};

export default FloatingHearts;
