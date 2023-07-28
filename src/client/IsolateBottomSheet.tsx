import React from 'react';

/**
 * Prevents events in children from bubbling up and causing problems with
 * BottomSheet.
 */

export interface IsolateBottomSheetProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

export const IsolateBottomSheet = ({
  isActive = true,
  ...props
}: IsolateBottomSheetProps) => (
  <div
    className="contents"
    // Drag
    onPointerDown={(event) => isActive && event.stopPropagation()}
    onPointerMove={(event) => isActive && event.stopPropagation()}
    onPointerUp={(event) => isActive && event.stopPropagation()}
    onPointerCancel={(event) => isActive && event.stopPropagation()}
    // Tab
    onKeyDownCapture={(event) => isActive && event.stopPropagation()}
    {...props}
  />
);
