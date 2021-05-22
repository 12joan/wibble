import * as React from "react";

function SvgD100(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={98.339}
      height={78.438}
      {...props}
    >
      <path
        d="M21.968 44.622L3.5 24.061 21.968 3.5l55.403 20.561z"
        className="fill-dice-primary"
      />
      <path
        d="M21.968 44.622L3.5 24.061 21.968 3.5l55.403 20.561z"
        className="stroke-dice-primary"
        strokeWidth={5.333}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M77.371 75.938l18.468-20.56-18.468-20.561-55.403 20.561z"
        className="fill-dice-primary"
      />
      <path
        d="M77.371 75.938l18.468-20.56-18.468-20.561-55.403 20.561z"
        className="stroke-dice-primary"
        strokeWidth={5.333}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text transform="translate(27.624 23.559)">
        <tspan x={-2} y={6.867} textAnchor="middle" fontSize={20} className="fill-dice-secondary">
          {props.tens}
        </tspan>
      </text>
      <text transform="translate(70.715 54.876)">
        <tspan x={2} y={6.867} textAnchor="middle" fontSize={20} className="fill-dice-secondary">
          {props.units}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgD100;
