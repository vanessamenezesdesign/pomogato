"use client";

export default function TaskInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="w-full max-w-xs">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="No que vou focar agora?"
        className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-peach/40 text-charcoal text-sm text-center placeholder:text-soft-gray/50 focus:outline-none focus:ring-2 focus:ring-peach-dark/30 focus:border-peach-dark/50 transition-all"
      />
      {value && (
        <p className="text-xs text-soft-gray text-center mt-1.5">
          Tarefa atual: <span className="font-medium text-charcoal">{value}</span>
        </p>
      )}
    </div>
  );
}
