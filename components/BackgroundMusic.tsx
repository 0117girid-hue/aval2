import React, { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";

export const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;

    const pauseGlobal = () => audio.pause();
    const playGlobal = () => audio.play().catch(() => {});

    window.addEventListener("pause-global-music", pauseGlobal as EventListener);
    window.addEventListener("play-global-music", playGlobal as EventListener);

    return () => {
      window.removeEventListener("pause-global-music", pauseGlobal as EventListener);
      window.removeEventListener("play-global-music", playGlobal as EventListener);
    };
  }, []);

  return (
    <>
      {/* Audio */}
      <audio
        ref={audioRef}
        src={import.meta.env.BASE_URL + "song.mp3"}
        loop
      />

      {/* Speaker button */}
      {showIcon && (
        <div
          className="fixed bottom-4 right-4 z-[9999] pointer-events-auto"
          style={{
            paddingBottom: "env(safe-area-inset-bottom)",
            paddingRight: "env(safe-area-inset-right)",
          }}
        >
          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current
                  .play()
                  .then(() => setShowIcon(false))
                  .catch((e) => console.log("Play blocked:", e));
              }
            }}
            className="w-12 h-12 bg-pink-500 text-white rounded-full shadow-lg flex items-center justify-center animate-pulse active:scale-95"
            aria-label="Play background music"
          >
            <Volume2 />
          </button>
        </div>
      )}
    </>
  );
};
