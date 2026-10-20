type ArrowCircleIconProps = {
  direction: "left" | "right";
  className?: string;
};

const ArrowCircleIcon = ({ direction, className }: ArrowCircleIconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={direction === "left"
        ? "m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        : "m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}
    />
  </svg>
);

export default ArrowCircleIcon;
