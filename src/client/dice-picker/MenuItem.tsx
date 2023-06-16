import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button, ButtonProps } from '../Button';
import { NavigateOptions, useNavigateWithState } from './state';

export type MenuItemProps = ButtonProps;

export const MenuItem = ({ className, ...props }: MenuItemProps) => {
  return (
    <Button
      shape="menu"
      className={twMerge(
        'rounded-none first:rounded-t-lg last:rounded-b-lg border-b-0 last:border-b',
        className
      )}
      {...props}
    />
  );
};

export interface NavMenuItemProps extends MenuItemProps, NavigateOptions {}

export const NavMenuItem = ({
  to,
  transformState,
  replace,
  ...props
}: NavMenuItemProps) => {
  const navigate = useNavigateWithState();

  return (
    <MenuItem
      onClick={() => navigate({ to, transformState, replace })}
      {...props}
    />
  );
};
