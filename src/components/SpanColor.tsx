import React, { forwardRef } from 'react';

interface SpanColorProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  colorType: string;
}

const getColorClass = (colorType: string) => {
  if (colorType === "work") {
    return "bg-purple-200 px-1 rounded-md hover:bg-purple-500";
  } else if (colorType === "home") {
    return "bg-green-200 px-1 rounded-md hover:bg-green-500";
  } else if (colorType === "hobby") {
    return "bg-blue-200 px-1 rounded-md hover:bg-blue-500";
  } else if (colorType === "low") {
    return "bg-yellow-200 px-1 rounded-md hover:bg-yellow-500";
  } else if (colorType === "medium") {
    return "bg-orange-200 px-1 rounded-md hover:bg-orange-500";
  } else if (colorType === "high") {
    return "bg-red-200 px-1 rounded-md hover:bg-red-500";
  }
  return "bg-gray-200 px-1 rounded-md hover:bg-gray-500";
};

const SpanColor = forwardRef<HTMLSpanElement, SpanColorProps>(({ text, colorType }, ref) => {
  const colorClass = getColorClass(colorType);

  return (
    <span ref={ref} className={colorClass}>
      {text}
    </span>
  );
});

export default SpanColor;
