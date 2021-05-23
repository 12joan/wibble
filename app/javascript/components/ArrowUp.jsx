import * as React from "react"

function SvgArrowUp(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
    >
      <path d="M9 15V3.415l4.291 4.294a1.001 1.001 0 001.416-1.416L8.708.294a1 1 0 00-1.416 0L1.293 6.293a1.001 1.001 0 001.415 1.416L7 3.415V15a1 1 0 002 0z" />
    </svg>
  );
}

export default SvgArrowUp;
