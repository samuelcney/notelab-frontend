const UserRole: Record<string, { name: string; color: string }> = {
  ADMIN: { name: "Admin", color: "#4CAF50" },
  STUDENT: { name: "Estudante", color: "#00A6ED" },
  INSTRUCTOR: { name: "Instrutor", color: "#F44336" },
};

export function translateUserRole(role: string): {
  name: string;
  color: string;
} {
  return UserRole[role] || { name: "---", color: "#a8a8a8" };
}
