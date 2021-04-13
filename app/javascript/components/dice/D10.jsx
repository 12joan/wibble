import * as React from "react";

function SvgD10(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={79.871}
      height={47.121}
      {...props}
    >
      <path
        d="M21.968 44.621L3.5 24.06 21.968 3.5l55.403 20.56z"
        fill="#404040"
      />
      <path
        d="M21.968 44.621L3.5 24.06 21.968 3.5l55.403 20.56z"
        stroke="#404040"
        strokeWidth={5.333}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text transform="translate(27.624 23.559)">
        <tspan x={-2} y={6.867} textAnchor="middle" fontSize={20} fill="#FFF">
          {props.value}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgD10;
