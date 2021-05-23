import * as React from "react";

function SvgD8(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      {...props}
    >
      <path
        d="M30.228 3.5L3.5 30.228l26.728 26.728 26.728-26.728L30.228 3.5z"
        className="fill-dice-primary"
      />
      <path
        d="M30.228 3.5L3.5 30.228l26.728 26.728 26.728-26.728L30.228 3.5z"
        className="stroke-dice-primary"
        strokeWidth={5.33}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text transform="translate(29.728 29.728)">
        <tspan
          x={0}
          y={6.868}
          textAnchor="middle"
          fontSize={20}
          className="fill-dice-secondary"
        >
          {props.value}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgD8;
