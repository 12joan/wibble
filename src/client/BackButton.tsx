import React from 'react';
import * as Icons from 'react-bootstrap-icons';
import { Button } from './Button';

export interface BackButtonProps {
  navigate: (to: -1) => void;
  disabled?: boolean;
}

export const BackButton = ({ navigate, disabled }: BackButtonProps) => {
  return (
    <Button
      onClick={() => navigate(-1)}
      shape="link"
      color="link"
      className="flex items-center gap-1"
      disabled={disabled}
    >
      <Icons.CaretLeftFill aria-hidden />
      Back
    </Button>
  );
};
