import React, { forwardRef } from 'react';
import * as Icons from 'react-bootstrap-icons';
import * as UpstreamSelect from '@radix-ui/react-select';
import { twMerge } from 'tailwind-merge';
import { KeepOnScreen } from './KeepOnScreen';

const SelectTrigger: typeof UpstreamSelect.SelectTrigger = forwardRef(
  ({ className, children, ...props }, ref) => {
    const resolvedClassName = twMerge(
      'px-3 py-2 border rounded-lg bg-foreground hocus:bg-foreground-dimmed-1 flex justify-between items-center gap-2 w-full',
      className
    );

    return (
      <UpstreamSelect.SelectTrigger
        ref={ref}
        className={resolvedClassName}
        {...props}
      >
        {children}

        <UpstreamSelect.SelectIcon>
          <Icons.ChevronDown />
        </UpstreamSelect.SelectIcon>
      </UpstreamSelect.SelectTrigger>
    );
  }
);

const SelectContent: typeof UpstreamSelect.SelectContent = forwardRef(
  ({ className, children, ...props }, ref) => {
    const resolvedClassName = twMerge(
      'border rounded-lg bg-foreground w-[--radix-select-trigger-width] no-focus-ring',
      className
    );

    return (
      <UpstreamSelect.SelectContent
        ref={ref}
        className={resolvedClassName}
        position="popper"
        avoidCollisions={false}
        sideOffset={-1}
        {...props}
      >
        <KeepOnScreen nearSide="top" className="p-2">
          {children}
        </KeepOnScreen>
      </UpstreamSelect.SelectContent>
    );
  }
);

const SelectViewport: typeof UpstreamSelect.SelectViewport = forwardRef(
  ({ className, ...props }, ref) => {
    const resolvedClassName = twMerge('', className);

    return (
      <UpstreamSelect.SelectViewport
        ref={ref}
        className={resolvedClassName}
        style={{ overflow: undefined }}
        {...props}
      />
    );
  }
);

const SelectItem: typeof UpstreamSelect.SelectItem = forwardRef(
  ({ className, children, ...props }, ref) => {
    const resolvedClassName = twMerge(
      'px-3 py-2 rounded-lg hocus:bg-foreground-dimmed-1 flex items-center cursor-pointer no-focus-ring select-none',
      className
    );

    return (
      <UpstreamSelect.SelectItem
        ref={ref}
        className={resolvedClassName}
        {...props}
      >
        {children}

        <UpstreamSelect.ItemIndicator className="ml-auto">
          <Icons.Check2 />
        </UpstreamSelect.ItemIndicator>
      </UpstreamSelect.SelectItem>
    );
  }
);

const SelectSeparator: typeof UpstreamSelect.SelectSeparator = forwardRef(
  ({ className, ...props }, ref) => {
    const resolvedClassName = twMerge('border-t -mx-2 my-2', className);

    return (
      <UpstreamSelect.SelectSeparator
        ref={ref}
        className={resolvedClassName}
        {...props}
      />
    );
  }
);

export type {
  SelectProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectViewportProps,
  SelectItemProps,
  SelectSeparatorProps,
} from '@radix-ui/react-select';

export const Select = {
  ...UpstreamSelect,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Viewport: SelectViewport,
  Item: SelectItem,
  Separator: SelectSeparator,
};
