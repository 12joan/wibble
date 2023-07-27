import React from 'react';
import * as Icons from 'react-bootstrap-icons';
import { Listbox } from '@headlessui/react';
import { Button } from '../Button';
import { KeepOnScreen } from '../KeepOnScreen';
import { useElementSize } from '../useElementSize';

import { TProfile } from '~/core/types';

const withIconClassName = 'flex items-center gap-2';

const MANAGE_PROFILES = 'manage-profiles';
const NEW_PROFILE = 'new-profile';

const optionClassName =
  'px-3 py-2 scroll-my-2 rounded-lg hocus:bg-foreground-dimmed-1 flex items-center cursor-pointer no-focus-ring select-none hui-selected:bg-primary-bg hui-selected:text-white';

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
  const [{ width: buttonWidth }, buttonRef] = useElementSize();

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
    <Listbox value={value.id} onChange={handleChange}>
      <Listbox.Button
        ref={buttonRef}
        id={id}
        as={Button}
        className="max-md:max-w-none px-3 py-2 w-full"
      >
        <div className={withIconClassName}>
          <Icons.PersonCircle aria-hidden className="shrink-0" />
          {value.name}
        </div>
      </Listbox.Button>

      <Listbox.Options
        className="absolute border rounded-lg bg-foreground shadow-lg no-focus-ring animate-in zoom-in-95 fade-in slide-in-from-top-2 origin-top z-50"
        style={{ width: buttonWidth }}
      >
        <KeepOnScreen nearSide="top" className="p-2">
          <Listbox.Option value={MANAGE_PROFILES} className={optionClassName}>
            <div className={withIconClassName}>
              <Icons.PersonLinesFill aria-hidden className="shrink-0" />
              Manage profiles
            </div>
          </Listbox.Option>

          <Listbox.Option value={NEW_PROFILE} className={optionClassName}>
            <div className={withIconClassName}>
              <Icons.PersonPlusFill aria-hidden className="shrink-0" />
              New profile
            </div>
          </Listbox.Option>

          <div className="border-t -mx-2 my-2" />

          {profiles.map(({ id, name }) => (
            <Listbox.Option key={id} value={id} className={optionClassName}>
              <div className="flex items-center gap-2">
                <Icons.PersonCircle aria-hidden className="shrink-0" />
                {name}
              </div>
            </Listbox.Option>
          ))}
        </KeepOnScreen>
      </Listbox.Options>
    </Listbox>
  );
};
