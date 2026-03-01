"use client";

type CatMood = "idle" | "focus" | "break" | "sleep";

const catFaces: Record<CatMood, { face: string; body: string }> = {
  idle: {
    face: "^• ﻌ •^",
    body: "ฅ(=^‥^=)ฅ",
  },
  focus: {
    face: "^◉ ﻌ ◉^",
    body: "ฅ(=◉‥◉=)ฅ",
  },
  break: {
    face: "^≧ ﻌ ≦^",
    body: "ฅ(=≧‥≦=)ฅ",
  },
  sleep: {
    face: "^- ﻌ -^",
    body: "(=- ‥ -=) zzZ",
  },
};

const catMessages: Record<CatMood, string[]> = {
  idle: [
    "Miau! Bora estudar?",
    "Pronto pra focar!",
    "*ronrona de expectativa*",
  ],
  focus: [
    "Shh... focando...",
    "Você consegue!",
    "*olhar concentrado*",
    "Quase lá!",
  ],
  break: [
    "Hora de espreguiçar!",
    "*ronrona feliz*",
    "Bom trabalho!",
    "Pausa merecida!",
  ],
  sleep: [
    "zzZZzz...",
    "*dormindo feliz*",
    "Sessão encerrada...",
  ],
};

export default function CatAvatar({
  mood,
  isRunning,
}: {
  mood: CatMood;
  isRunning: boolean;
}) {
  const cat = catFaces[mood];
  const messages = catMessages[mood];
  const message = messages[Math.floor(Date.now() / 10000) % messages.length];

  const animationClass =
    mood === "focus" && isRunning
      ? "animate-purr"
      : mood === "break"
        ? "animate-float"
        : mood === "sleep"
          ? ""
          : "animate-float";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`text-5xl sm:text-6xl select-none transition-all duration-500 ${animationClass}`}
        role="img"
        aria-label={`Gato ${mood}`}
      >
        {cat.body}
      </div>
      <p className="text-sm text-soft-gray italic animate-fade-in" key={message}>
        {message}
      </p>
    </div>
  );
}
