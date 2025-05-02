export const CarouselTitle = ({ title }: { title?: string }) => {
  return (
    <div className="w-full">
      <h1 className="font-semibold tracking-wide text-2xl ml-1 mb-2">
        {title}
      </h1>
    </div>
  );
};
