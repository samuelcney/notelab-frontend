import { translateUserRole } from "@/utils/translateUserRole";

export const RoleBadge = ({ roleName }: { roleName: string }) => {
  const { name, color } = translateUserRole(roleName);
  return (
    <p
      className="text-xs text-white px-2 py-1 rounded-md shadow-md font-semibold whitespace-nowrap"
      style={{
        backgroundColor: color,
      }}
    >
      {name.toUpperCase()}
    </p>
  );
};
