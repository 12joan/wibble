import * as React from "react";

function SvgD12(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={55.37}
      height={52.953}
      {...props}
    >
      <path
        d="M20.556 50.453L8.214 41.486 3.5 26.976l4.714-14.509L20.556 3.5h15.257l12.342 8.967 4.714 14.509-4.714 14.51-12.342 8.967z"
        fill="#404040"
      />
      <path
        d="M20.556 50.453L8.214 41.486 3.5 26.976l4.714-14.509L20.556 3.5h15.257l12.342 8.967 4.714 14.509-4.714 14.51-12.342 8.967z"
        stroke="#404040"
        strokeWidth={5.333}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text transform="translate(27.685 30.32)">
        <tspan y={3.945} textAnchor="middle" fontSize={20} fill="#FFF">
          {props.value}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgD12;
