import React from 'react';
import * as Icons from 'react-bootstrap-icons';
import { Select } from '../Select';

import { TProfile } from '~/core/types';

const withIconClassName = 'flex items-center gap-2';

const MANAGE_PROFILES = 'manage-profiles';
const NEW_PROFILE = 'new-profile';

export interface ProfileSelectProps {
  id: string;
  profiles: TProfile[];
  value: TProfile;
  onChange: (profile: TProfile) => void;
  onManageProfiles: () => void;
  onNewProfile: () => void;
}

export const ProfileSelect = ({
  id,
  profiles,
  value,
  onChange,
  onManageProfiles,
  onNewProfile,
}: ProfileSelectProps) => {
  const handleChange = (id: string) => {
    if (id === MANAGE_PROFILES) {
      onManageProfiles();
    } else if (id === NEW_PROFILE) {
      onNewProfile();
    } else {
      const profile = profiles.find((profile) => profile.id === id);
      onChange(profile!);
    }
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
            <Select.Item value={MANAGE_PROFILES}>
              <Select.ItemText>
                <div className={withIconClassName}>
                  <Icons.PersonLinesFill aria-hidden className="shrink-0" />
                  Manage profiles
                </div>
              </Select.ItemText>
            </Select.Item>

            <Select.Item value={NEW_PROFILE}>
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
