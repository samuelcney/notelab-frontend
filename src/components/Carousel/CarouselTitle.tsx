export const CarouselTitle = ({ title }: { title?: string }) => {
  return (
    <div className="w-[95%]">
      <h1 className="font-semibold tracking-wide text-2xl ml-1">{title}</h1>
    </div>
  );
};
