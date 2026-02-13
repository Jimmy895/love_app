import { useState } from "react";
import FloatingHearts from "./FloatingHearts";
import LandscapeLock from "./LandscapeLock";
import DateGate from "./DateGate";
import PlayTrigger from "./PlayTrigger";
import Cinema from "./Cinema";
import LoveLetter from "./LoveLetter";

type AppState = "gate" | "trigger" | "cinema" | "letter";

const DeepLove = () => {
  const [state, setState] = useState<AppState>("gate");

  return (
    <div className="w-screen h-screen  relative animated-bg">
      <FloatingHearts />
      <LandscapeLock />

      {state === "gate" && (
        <DateGate onCorrect={() => setState("trigger")} />
      )}

      {state === "trigger" && (
        <PlayTrigger onPlay={() => setState("cinema")} />
      )}

      {state === "cinema" && (
        <Cinema onEnd={() => setState("letter")} />
      )}

      {/*{state === "letter" && (*/}
      {/*  <LoveLetter onReset={() => setState("trigger")} />*/}
      {/*)}*/}

    {state === "letter" && (
        // --- ZMIANA TUTAJ ---
        // Tworzymy absolutną warstwę na wierzchu (z-index), która pozwala na scrollowanie (overflow-y-auto)
        <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden">
            {/* Dodajemy trochę paddingu, żeby tekst nie dotykał krawędzi */}
            <div className="min-h-full w-full flex flex-col items-center justify-center p-8">
                <LoveLetter onReset={() => setState("trigger")} />
            </div>
        </div>
    )}
    </div>
  );
};

export default DeepLove;
