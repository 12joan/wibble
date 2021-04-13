import * as React from "react";

function SvgD4(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={55.71}
      height={49.05}
      {...props}
    >
      <path
        d="M3.5 46.549l12.428-21.525L28.355 3.5l12.427 21.524L53.21 46.549H28.355z"
        fill="#404040"
      />
      <path
        d="M3.5 46.549l12.428-21.525L28.355 3.5l12.427 21.524L53.21 46.549H28.355z"
        stroke="#404040"
        strokeWidth={5.333}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text transform="translate(27.855 32.009)">
        <tspan x={0} y={4.961} textAnchor="middle" fontSize={20} fill="#FFF">
          {props.value}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgD4;
