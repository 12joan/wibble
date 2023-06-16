import React from 'react';
import * as Icons from 'react-bootstrap-icons';
import { Button } from '../Button';
import { useDicePickerContext } from './dicePickerContext';
import { useNavigateWithState } from './state';

export interface BackAndCancelProps {
  backEnabled?: boolean;
  backLabel?: string;
}

export const BackAndCancel = ({
  backEnabled = true,
  backLabel = 'Back',
}: BackAndCancelProps): JSX.Element => {
  const navigate = useNavigateWithState();
  const { close } = useDicePickerContext();

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button
        onClick={() => navigate({ to: -1 })}
        shape="link"
        color="link"
        className="flex items-center gap-1"
        disabled={!backEnabled}
      >
        <Icons.CaretLeftFill aria-hidden />
        {backLabel}
      </Button>

      <Button
        onClick={() => close()}
        shape="link"
        color="link"
        className="ml-auto"
      >
        Cancel
      </Button>
    </div>
  );
};
