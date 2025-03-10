const difficulty: Record<string, { name: string; color: string }> = {
  BEGINNER: { name: "Iniciante", color: "#4CAF50" },
  INTERMEDIATE: { name: "Intermediário", color: "#FF9800" },
  ADVANCED: { name: "Avançado", color: "#F44336" },
};

export function translateDifficulty(level: string): {
  name: string;
  color: string;
} {
  return difficulty[level] || { name: "---", color: "#a8a8a8" };
}
