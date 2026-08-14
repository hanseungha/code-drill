import { DIFFICULTY_LABEL, type Difficulty } from "@/lib/types";

const STYLES: Record<Difficulty, string> = {
  easy: "bg-easy/10 text-easy ring-easy/25",
  medium: "bg-medium/10 text-medium ring-medium/25",
  hard: "bg-hard/10 text-hard ring-hard/25",
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
