import * as React from "react";

function SvgD8(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={60}
      {...props}
    >
      <path
        d="M30.228 3.5L3.5 30.228l26.728 26.728 26.728-26.728L30.228 3.5z"
        fill="#404040"
      />
      <path
        d="M30.228 3.5L3.5 30.228l26.728 26.728 26.728-26.728L30.228 3.5z"
        stroke="#404040"
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
          fill="#FFF"
        >
          {props.value}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgD8;
