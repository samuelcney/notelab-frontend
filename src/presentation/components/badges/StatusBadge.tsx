export const StatusBadge = ({ status }: { status: boolean }) => {
  return (
    <p
      className="text-xs text-white px-2 py-1 rounded-md shadow-md font-semibold whitespace-nowrap flex items-center justify-center"
      style={{
        backgroundColor: status ? "#4CAF50" : "#F44336",
      }}
    >
      {status ? "ATIVO" : "INATIVO"}
    </p>
  );
};
