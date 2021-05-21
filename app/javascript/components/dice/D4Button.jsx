import * as React from "react";

function SvgD4Button(props) {
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
          d="M30.511 38.336h-7.08v-1.592q.45-.83 1.006-1.763.557-.932 1.289-2.07.733-1.138 1.685-2.544.952-1.406 2.202-3.193h2.598v9.619h1.992v1.543h-1.992v2.929h-1.7zm-5.341-1.543h5.341v-8.154h-.029q-.996 1.425-1.797 2.597-.801 1.172-1.44 2.154-.64.981-1.148 1.806-.507.825-.927 1.558z"
          fill="#404040"
        />

        <path
          d="M10.676 45.461l9.32-16.144 9.321-16.144 9.32 16.144 9.321 16.144H29.317z"
          fill="currentColor"
        />

        <path
          d="M10.676 45.461l9.32-16.144 9.321-16.144 9.32 16.144 9.321 16.144H29.317z"
          stroke="#404040"
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
            d="M29.867 36.252v-6.338l-4.483 6.338zm.029 4.951v-3.418h-6.133v-1.719l6.407-8.886h1.484v9.072h2.06v1.533h-2.06v3.418z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

export default SvgD4Button;
