"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import CatAvatar from "./CatAvatar";
import AdhdTips from "./AdhdTips";
import TaskInput from "./TaskInput";

type TimerMode = "focus" | "shortBreak" | "longBreak";

const MODES: Record<TimerMode, { label: string; minutes: number; color: string }> = {
  focus: { label: "Foco", minutes: 25, color: "bg-focus" },
  shortBreak: { label: "Pausa Curta", minutes: 5, color: "bg-sage" },
  longBreak: { label: "Pausa Longa", minutes: 15, color: "bg-lavender-tab-active" },
};

export default function Timer() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(MODES.focus.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessions] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = MODES[mode].minutes * 60;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  const catMood = !isRunning && secondsLeft === totalSeconds
    ? "idle"
    : mode === "focus"
      ? "focus"
      : "break";

  const playSound = useCallback(() => {
    if (typeof window !== "undefined") {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      osc.type = "sine";
      gain.gain.value = 0.3;
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.stop(ctx.currentTime + 0.5);
    }
  }, []);

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      setMode(newMode);
      setSecondsLeft(MODES[newMode].minutes * 60);
      setIsRunning(false);
    },
    [],
  );

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          playSound();
          if (mode === "focus") {
            const newSessions = sessionsCompleted + 1;
            setSessions(newSessions);
            switchMode(newSessions % 4 === 0 ? "longBreak" : "shortBreak");
          } else {
            switchMode("focus");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode, sessionsCompleted, playSound, switchMode]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const paws = Array.from({ length: 4 }, (_, i) => i < sessionsCompleted % 4);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 gap-6">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Pomo<span className="text-peach-dark">gato</span>
        </h1>
        <p className="text-soft-gray text-sm mt-1">
          Seu companheiro felino de estudos
        </p>
      </header>

      {/* Cat */}
      <CatAvatar mood={catMood} isRunning={isRunning} />

      {/* Task */}
      <TaskInput value={currentTask} onChange={setCurrentTask} />

      {/* Mode Tabs */}
      <div className="flex gap-2">
        {(Object.entries(MODES) as [TimerMode, (typeof MODES)[TimerMode]][]).map(
          ([key, { label, color }]) => (
            <button
              key={key}
              onClick={() => switchMode(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                mode === key
                  ? `${color} text-charcoal shadow-md scale-105`
                  : "bg-white/60 text-soft-gray hover:bg-white"
              }`}
            >
              {label}
            </button>
          ),
        )}
      </div>

      {/* Timer Display */}
      <div className="relative flex items-center justify-center">
        {/* Circular Progress */}
        <svg className="w-56 h-56 sm:w-64 sm:h-64 -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#f0e6e0"
            strokeWidth="8"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={
              mode === "focus"
                ? "#f4a89a"
                : mode === "shortBreak"
                  ? "#87a96b"
                  : "#a07ee6"
            }
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 90}`}
            strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-5xl sm:text-6xl font-mono font-bold tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          <span className="text-xs text-soft-gray uppercase tracking-widest mt-1">
            {MODES[mode].label}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer ${
            isRunning
              ? "bg-coral text-white hover:bg-coral/90"
              : "bg-peach-dark text-white hover:bg-peach-dark/90"
          }`}
        >
          {isRunning ? "Pausar" : secondsLeft === totalSeconds ? "Iniciar" : "Continuar"}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setSecondsLeft(totalSeconds);
          }}
          className="p-3 rounded-full bg-white/60 text-soft-gray hover:bg-white hover:text-charcoal transition-all cursor-pointer"
          aria-label="Resetar timer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M21 21v-5h-5" />
          </svg>
        </button>
      </div>

      {/* Session Paws */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-soft-gray">Sessões:</span>
        <div className="flex gap-1.5">
          {paws.map((filled, i) => (
            <span
              key={i}
              className={`text-lg transition-all duration-300 ${
                filled ? "scale-110" : "opacity-30"
              }`}
            >
              🐾
            </span>
          ))}
        </div>
        <span className="text-xs text-soft-gray">
          ({sessionsCompleted} total)
        </span>
      </div>

      {/* ADHD Tips Toggle */}
      <button
        onClick={() => setShowTips(!showTips)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-lavender/30 text-lavender-dark hover:bg-lavender/50 transition-all text-sm font-medium cursor-pointer"
      >
        <span>{showTips ? "Esconder" : "Ver"} dicas TDAH</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${showTips ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {showTips && <AdhdTips />}

      {/* Footer */}
      <footer className="text-xs text-soft-gray/60 mt-4">
        Pomogato &mdash; feito com carinho para cérebros TDAH
      </footer>
    </div>
  );
}
