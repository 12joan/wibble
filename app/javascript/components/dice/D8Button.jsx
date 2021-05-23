import * as React from "react";

function SvgD8Button(props) {
  return (
    <div className="graphical-die-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 57.634 57.634"
        {...props}
      >
        <path
          d="M29.317 9.271L9.271 29.317l20.046 20.046 20.046-20.046L29.317 9.271z"
          fill="currentColor"
        />

        <path
          d="M29.317 9.271L9.271 29.317l20.046 20.046 20.046-20.046L29.317 9.271z"
          className="stroke-dice-button-outline"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      <div className="graphical-die-button-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 57.634 57.634"
          {...props}
        >
          <path
            d="M28.806 28.415q1.163 0 1.817-.649.654-.649.654-1.548 0-.781-.625-1.435-.625-.655-1.904-.655-1.27 0-1.836.655-.566.654-.566 1.533 0 .986.732 1.543.732.556 1.728.556zm.108 6.924q1.221 0 2.026-.659.806-.659.806-1.968 0-1.357-.83-2.06-.83-.703-2.129-.703-1.26 0-2.055.717-.796.718-.796 1.988 0 1.093.727 1.889.728.796 2.251.796zm-2.5-6.25q-.732-.312-1.142-.732-.772-.781-.772-2.031 0-1.563 1.133-2.686t3.213-1.123q2.011 0 3.154 1.06 1.142 1.059 1.142 2.475 0 1.309-.664 2.119-.371.459-1.152.899.869.4 1.367.918.928.976.928 2.539 0 1.845-1.24 3.129-1.241 1.285-3.506 1.285-2.041 0-3.452-1.109-1.411-1.108-1.411-3.217 0-1.241.605-2.144.606-.903 1.797-1.382z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

export default SvgD8Button;
