import * as React from "react";

function SvgD8(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={46.925}
      height={53.256}
      {...props}
    >
      <path
        d="M23.963 3.5l20.462 11.814v23.628L23.963 50.757 3.5 38.942V15.314L23.963 3.5z"
        fill="#404040"
      />
      <path
        d="M23.963 3.5l20.462 11.814v23.628L23.963 50.757 3.5 38.942V15.314L23.963 3.5z"
        stroke="#404040"
        strokeWidth={5.333}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text transform="translate(23.463 30.472)">
        <tspan x={0} y={3.945} textAnchor="middle" fontSize={20} fill="#FFF">
          {props.value}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgD8;
