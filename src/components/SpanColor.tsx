import React, { forwardRef } from 'react';
import { Todo } from '../types/todo';

type colorType = Todo["category"] | Todo["priority"];

interface SpanColorProps extends React.HTMLAttributes<HTMLSpanElement> {
  colorType: colorType;
}

const getColorClass = (colorType: colorType) => {
  if (colorType === "work") {
    return "bg-purple-200 px-1 rounded-md";
  } else if (colorType === "home") {
    return "bg-green-200 px-1 rounded-md";
  } else if (colorType === "others") {
    return "bg-teal-200 px-1 rounded-md";
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
