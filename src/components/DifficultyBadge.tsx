import { DIFFICULTY_LABEL, type Difficulty } from "@/lib/types";

const STYLES: Record<Difficulty, string> = {
  // The -subtle tokens already carry their own alpha, so no opacity modifier.
  easy: "bg-green-subtle text-green-vivid ring-green-ring/40",
  medium: "bg-yellow-subtle text-yellow-vivid ring-yellow-ring/40",
  hard: "bg-red-subtle text-red-vivid ring-red-ring/40",
};

export function DifficultyBadge({
  difficulty,
  className = "",
}: {
  difficulty: Difficulty;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STYLES[difficulty]} ${className}`}
    >
      {DIFFICULTY_LABEL[difficulty]}
    </span>
  );
}
