import * as React from "react";

function SvgD12Button(props) {
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
          d="M23.596 46.203l-9.257-6.725-3.536-10.882 3.536-10.882 9.257-6.726h11.442l9.256 6.726 3.536 10.882-3.536 10.882-9.256 6.725z"
          fill="currentColor"
        />

        <path
          d="M23.596 46.203l-9.257-6.725-3.536-10.882 3.536-10.882 9.257-6.726h11.442l9.256 6.726 3.536 10.882-3.536 10.882-9.256 6.725z"
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
            d="M19.608 25.877V24.53q1.904-.186 2.656-.621.752-.434 1.123-2.055h1.387v13.925h-1.875v-9.902zM29.441 35.779q.098-1.806.747-3.144.65-1.338 2.535-2.432l1.875-1.084q1.259-.732 1.767-1.25.801-.81.801-1.855 0-1.221-.732-1.939-.733-.717-1.954-.717-1.806 0-2.5 1.367-.371.732-.41 2.031h-1.787q.029-1.826.674-2.978 1.143-2.032 4.033-2.032 2.403 0 3.511 1.299t1.108 2.891q0 1.68-1.181 2.871-.684.693-2.451 1.68l-1.338.742q-.957.527-1.504 1.006-.977.849-1.231 1.884h7.637v1.66z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

export default SvgD12Button;
