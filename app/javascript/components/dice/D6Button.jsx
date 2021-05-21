import * as React from "react";

function SvgD6Button(props) {
  return (
    <div className="graphical-die-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 57.634 57.634"
        {...props}
      >
        <path d="M15.142 15.143h28.349v28.349H15.142V15.143z" fill="currentColor" />

        <path
          d="M15.142 15.143h28.349v28.349H15.142V15.143z"
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
            d="M29.105 22.868q2.344 0 3.266 1.216.923 1.215.923 2.504h-1.738q-.156-.83-.498-1.298-.635-.879-1.924-.879-1.475 0-2.344 1.362-.869 1.362-.966 3.901.605-.888 1.523-1.328.84-.39 1.875-.39 1.758 0 3.066 1.123 1.309 1.123 1.309 3.349 0 1.905-1.24 3.374-1.241 1.47-3.535 1.47-1.963 0-3.389-1.489-1.426-1.489-1.426-5.015 0-2.607.635-4.424 1.221-3.476 4.463-3.476zm-.127 12.842q1.387 0 2.075-.933.688-.933.688-2.202 0-1.074-.615-2.046-.615-.972-2.236-.972-1.133 0-1.987.752-.855.752-.855 2.266 0 1.328.776 2.231.777.904 2.154.904z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

export default SvgD6Button;
