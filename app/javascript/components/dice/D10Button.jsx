import * as React from "react";

function SvgD10Button(props) {
  return (
    <div className="graphical-die-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 59.403 57.634"
        {...props}
      >
        <path
          d="M16.351 44.169L2.5 28.748l13.851-15.42 41.552 15.42z"
          fill="currentColor"
        />

        <path
          d="M16.351 44.169L2.5 28.748l13.851-15.42 41.552 15.42z"
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
          viewBox="0 0 59.403 57.634"
          {...props}
        >
          <path
            d="M12.025 25.717v-1.348q1.904-.185 2.656-.62.752-.435 1.123-2.056h1.387v13.926h-1.875v-9.902zM26.644 21.635q2.714 0 3.925 2.236.938 1.729.938 4.736 0 2.852-.85 4.717Q29.427 36 26.634 36q-2.52 0-3.75-2.188-1.026-1.826-1.026-4.902 0-2.383.616-4.092 1.152-3.183 4.17-3.183zm-.02 12.763q1.367 0 2.178-1.211.81-1.211.81-4.511 0-2.383-.586-3.921-.586-1.538-2.275-1.538-1.553 0-2.271 1.46-.717 1.46-.717 4.301 0 2.139.459 3.438.703 1.982 2.402 1.982z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

export default SvgD10Button;
