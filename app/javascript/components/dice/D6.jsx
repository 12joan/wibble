import * as React from "react";

function SvgD6(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={47.798}
      height={47.799}
      {...props}
    >
      <path d="M3.5 3.5h37.798v37.799H3.5V3.5z" className="fill-dice-primary" />
      <path
        d="M3.5 3.5h37.798v37.799H3.5V3.5z"
        className="stroke-dice-primary"
        strokeWidth={5.333}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text transform="translate(21.899 25.745)">
        <tspan x={0} y={3.945} textAnchor="middle" fontSize={20} className="fill-dice-secondary">
          {props.value}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgD6;
