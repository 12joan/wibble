import * as React from "react";

function SvgD100Button(props) {
  return (
    <div className="graphical-die-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 61.634 57.634"
        {...props}
      >
        <path
          d="M22.736 39.195L10.27 25.317l12.466-13.879 37.397 13.879z"
          fill="currentColor"
        />

        <path
          d="M22.736 39.195L10.27 25.317l12.466-13.879 37.397 13.879z"
          className="stroke-dice-button-outline"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        <path
          d="M16.351 44.737L2.5 29.317l13.851-15.421 41.552 15.421z"
          fill="currentColor"
        />

        <path
          d="M16.351 44.737L2.5 29.317l13.851-15.421 41.552 15.421z"
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
          viewBox="0 0 61.634 57.634"
          {...props}
        >
          <path
            d="M16.186 22.295q2.715 0 3.926 2.237.937 1.728.937 4.736 0 2.851-.849 4.717-1.231 2.675-4.024 2.675-2.519 0-3.75-2.187-1.025-1.826-1.025-4.902 0-2.383.615-4.092 1.152-3.184 4.17-3.184zm-.019 12.764q1.367 0 2.177-1.211.811-1.211.811-4.512 0-2.382-.586-3.921-.586-1.538-2.276-1.538-1.552 0-2.27 1.46t-.718 4.302q0 2.139.459 3.437.703 1.983 2.403 1.983zM27.309 22.295q2.715 0 3.926 2.237.937 1.728.937 4.736 0 2.851-.849 4.717-1.231 2.675-4.024 2.675-2.519 0-3.75-2.187-1.025-1.826-1.025-4.902 0-2.383.615-4.092 1.153-3.184 4.17-3.184zm-.019 12.764q1.367 0 2.177-1.211.811-1.211.811-4.512 0-2.382-.586-3.921-.586-1.538-2.275-1.538-1.553 0-2.271 1.46t-.718 4.302q0 2.139.459 3.437.703 1.983 2.403 1.983z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

export default SvgD100Button;
