import React, { forwardRef } from 'react';

interface SpanColorProps extends React.HTMLAttributes<HTMLSpanElement> {
  colorType: string;
}

const getColorClass = (colorType: string) => {
  if (colorType === "work") {
    return "bg-purple-200 px-1 rounded-md";
  } else if (colorType === "home") {
    return "bg-green-200 px-1 rounded-md";
  } else if (colorType === "hobby") {
    return "bg-blue-200 px-1 rounded-md";
  } else if (colorType === "low") {
    return "bg-yellow-200 px-1 rounded-md";
  } else if (colorType === "medium") {
    return "bg-orange-200 px-1 rounded-md";
  } else if (colorType === "high") {
    return "bg-red-200 px-1 rounded-md";
  }
  return "bg-gray-200 px-1 rounded-md";
};

const SpanColor = forwardRef<HTMLSpanElement, SpanColorProps>(({ colorType }, ref) => {
  const colorClass = getColorClass(colorType);

  return (
    <span ref={ref} className={colorClass}>
      {colorType}
    </span>
  );
});

export default SpanColor;
