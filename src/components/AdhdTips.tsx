"use client";

const tips = [
  {
    title: "Técnica do Body Double",
    icon: "🐱",
    description:
      "Seu gato virtual está aqui! Ter uma 'presença' por perto ajuda cérebros TDAH a manterem foco. Deixe o Pomogato aberto enquanto estuda.",
  },
  {
    title: "Micro-tarefas",
    icon: "✂️",
    description:
      "Divida tudo em pedacinhos minúsculos. Em vez de 'estudar capítulo 5', tente 'ler página 1 do capítulo 5'. Pequenas vitórias = dopamina!",
  },
  {
    title: "Pomodoro Flexível",
    icon: "⏱️",
    description:
      "25 min é muito? Tudo bem! Comece com 10 ou 15 minutos. O importante é começar. Você pode ajustar conforme se sentir confortável.",
  },
  {
    title: "Transições Suaves",
    icon: "🌊",
    description:
      "A pausa não é só parar - levante, beba água, espreguice. Mudar o estado do corpo ajuda o cérebro a 'resetar' entre sessões.",
  },
  {
    title: "Uma Coisa de Cada Vez",
    icon: "🎯",
    description:
      "Use o campo de tarefa acima! Escrever o que você vai fazer ajuda a manter o foco e evitar que o cérebro 'pule' pra outra coisa.",
  },
  {
    title: "Recompensas Imediatas",
    icon: "🏆",
    description:
      "Após cada pomodoro, se dê uma mini-recompensa: um meme, um snack, carinho no gato (real ou virtual). Cérebros TDAH precisam de feedback rápido!",
  },
  {
    title: "Ambiente Preparado",
    icon: "🏠",
    description:
      "Antes de começar: celular longe, abas desnecessárias fechadas, garrafa de água perto. Reduzir distrações é metade da batalha.",
  },
  {
    title: "Seja Gentil Consigo",
    icon: "💜",
    description:
      "Perdeu o foco? Tudo bem! Não é preguiça, é como o seu cérebro funciona. Respire, volte ao timer, e tente de novo. Cada tentativa conta.",
  },
];

export default function AdhdTips() {
  return (
    <div className="w-full max-w-lg animate-fade-in">
      <h2 className="text-lg font-semibold text-center mb-4 text-lavender-dark">
        Técnicas de Estudo para TDAH
      </h2>
      <div className="grid gap-3">
        {tips.map((tip) => (
          <details
            key={tip.title}
            className="group bg-white/70 rounded-xl p-4 cursor-pointer hover:bg-white/90 transition-all"
          >
            <summary className="flex items-center gap-3 font-medium text-sm list-none [&::-webkit-details-marker]:hidden">
              <span className="text-xl">{tip.icon}</span>
              <span className="flex-1">{tip.title}</span>
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
                className="text-soft-gray transition-transform group-open:rotate-180"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <p className="text-sm text-soft-gray mt-3 leading-relaxed">
              {tip.description}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
