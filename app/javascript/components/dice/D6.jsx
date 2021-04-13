import * as React from "react";

function SvgD6(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={43.798}
      height={43.799}
      {...props}
    >
      <path d="M3.5 3.5h37.798v37.799H3.5V3.5z" fill="#404040" />
      <path
        d="M3.5 3.5h37.798v37.799H3.5V3.5z"
        stroke="#404040"
        strokeWidth={5.333}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text transform="translate(21.899 25.745)">
        <tspan x={0} y={3.945} textAnchor="middle" fontSize={20} fill="#FFF">
          {props.value}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgD6;
