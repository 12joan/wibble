import * as React from "react";

function SvgD10(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={83.871}
      height={51.121}
      {...props}
    >
      <path
        d="M21.968 44.621L3.5 24.06 21.968 3.5l55.403 20.56z"
        className="fill-dice-primary"
      />
      <path
        d="M21.968 44.621L3.5 24.06 21.968 3.5l55.403 20.56z"
        className="stroke-dice-primary"
        strokeWidth={5.333}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text transform="translate(27.624 23.559)">
        <tspan x={-2} y={6.867} textAnchor="middle" fontSize={20} className="fill-dice-secondary">
          {props.value}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgD10;
