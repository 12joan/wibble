import React, { useState } from 'react';
import * as Icons from 'react-bootstrap-icons';
import { Select } from './Select';
import { TPostingAs } from '../core/types';

const withIconClassName = 'flex items-center gap-2';

export interface ProfileSelectProps {
  id: string;
  profiles: TPostingAs[];
  value: TPostingAs;
  onChange: (profile: TPostingAs) => void;
}

export const ProfileSelect = ({
  id,
  profiles,
  value,
  onChange,
}: ProfileSelectProps) => {
  const handleChange = (id: string) => {
    const profile = profiles.find((profile) => profile.id === id);
    onChange(profile!);
  };

  return (
    <Select.Root value={value.id} onValueChange={handleChange}>
      <Select.Trigger id={id} className="max-md:max-w-none">
        <Select.Value>
          <div className={withIconClassName}>
            <Icons.PersonCircle aria-hidden className="shrink-0" />
            {value.name}
          </div>
        </Select.Value>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="x">
              <Select.ItemText>
                <div className={withIconClassName}>
                  <Icons.PersonLinesFill aria-hidden className="shrink-0" />
                  Manage profiles
                </div>
              </Select.ItemText>
            </Select.Item>

            <Select.Item value="y">
              <Select.ItemText>
                <div className={withIconClassName}>
                  <Icons.PersonPlusFill aria-hidden className="shrink-0" />
                  New profile
                </div>
              </Select.ItemText>
            </Select.Item>

            <Select.Separator />

            {profiles.map(({ id, name }) => (
              <Select.Item key={id} value={id}>
                <Select.ItemText>
                  <div className="flex items-center gap-2">
                    <Icons.PersonCircle aria-hidden className="shrink-0" />
                    {name}
                  </div>
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
