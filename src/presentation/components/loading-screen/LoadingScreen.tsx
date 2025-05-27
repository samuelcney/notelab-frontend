export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50 flex-col gap-3">
      <div className="w-80 h-2 bg-gray-300 rounded-3xl">
        <div className="w-1/3 h-full bg-green-500 rounded-full animate-loading" />
      </div>
    </div>
  );
}
