import React, { forwardRef } from 'react';

interface SpanColorProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  colorType: string;
}

const getColorClass = (colorType: string) => {
  if (colorType === "work") {
    return "purple";
  } else if (colorType === "home") {
    return "green";
  } else if (colorType === "hobby") {
    return "blue";
  } else if (colorType === "low") {
    return "yellow";
  } else if (colorType === "medium") {
    return "orange";
  } else if (colorType === "high") {
    return "red";
  }
  return "gray";
};

const SpanColor = forwardRef<HTMLSpanElement, SpanColorProps>(({ text, colorType }, ref) => {
  const colorClass = getColorClass(colorType);

  return (
    <span ref={ref} className={`bg-${colorClass}-200 px-1 rounded-md hover:bg-${colorClass}-500`}>
      {text}
    </span>
  );
});

export default SpanColor;
