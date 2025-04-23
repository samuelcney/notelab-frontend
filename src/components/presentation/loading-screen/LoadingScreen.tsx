export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="w-72 h-3 bg-gray-300 rounded-full">
        <div className="w-1/3 h-full bg-greenApp rounded-full animate-[loading_2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
