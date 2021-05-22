import * as React from "react";

function SvgD20(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={53.804}
      height={61.2}
      {...props}
    >
      <path
        d="M27.403 3.5l23.902 13.799v27.6l-23.902 13.8L3.5 44.899v-27.6L27.403 3.5z"
        className="fill-dice-primary"
      />
      <path
        d="M27.403 3.5l23.902 13.799v27.6l-23.902 13.8L3.5 44.899v-27.6L27.403 3.5z"
        className="stroke-dice-primary"
        strokeWidth={5.333}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text transform="translate(26.903 34.443)">
        <tspan x={0} y={3.945} textAnchor="middle" fontSize={20} className="fill-dice-secondary">
          {props.value}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgD20;
