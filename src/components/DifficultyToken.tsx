import { Token } from "@astryxdesign/core/Token";
import { DIFFICULTY_LABEL, type Difficulty } from "@/lib/types";

/**
 * Difficulty is metadata, not a count, so it renders as a Token rather than a
 * Badge — Badge is reserved for counts and enumerated states.
 */
const COLOR: Record<Difficulty, "green" | "yellow" | "red"> = {
  easy: "green",
  medium: "yellow",
  hard: "red",
};

export function DifficultyToken({
  difficulty,
  size = "sm",
}: {
  difficulty: Difficulty;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Token
      label={DIFFICULTY_LABEL[difficulty]}
      color={COLOR[difficulty]}
      size={size}
    />
  );
}
