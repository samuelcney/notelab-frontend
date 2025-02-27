import Icon from "./Icon";

interface ArrowButtonProps {
  onclick?: () => void;
  direction: string;
}

export const ArrowButton = ({ onclick, direction }: ArrowButtonProps) => {
  const arrowDirection =
    direction === "right" ? "ArrowBigRight" : "ArrowBigLeft";
  const absoluteDirection =
    direction === "right"
      ? "right-0 translate-x-2/3"
      : "left-0 -translate-x-2/3";
  return (
    <span
      className={`size-[42px] rounded-full bg-[#5d5d5d] flex items-center justify-center absolute ${absoluteDirection} z-10`}
    >
      <Icon name={arrowDirection} onClick={onclick} color="white" />
    </span>
  );
};
