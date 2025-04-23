export default function LoadingScreen() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
      <div className="h-full bg-blue-500 animate-loading-bar"></div>
    </div>
  );
}
