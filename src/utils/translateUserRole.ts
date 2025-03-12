const UserRole: Record<string, { name: string; color: string }> = {
  ADMIN: { name: "Admin", color: "#4CAF50" },
  STUDENT: { name: "Aluno", color: "#00A6ED" },
  INSTRUCTOR: { name: "Tutor", color: "#F44336" },
};

export function translateUserRole(role: string): {
  name: string;
  color: string;
} {
  return UserRole[role] || { name: "---", color: "#a8a8a8" };
}
