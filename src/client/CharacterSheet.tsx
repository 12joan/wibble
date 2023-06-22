import React, { useState, useEffect } from 'react';
import { TPostingAs } from '../core/types';
import { ProfileSelect } from './ProfileSelect';
import { InputGroup } from './Input';

const profiles: TPostingAs[] = [
  { id: '1', name: 'Profile 1' },
  { id: '2', name: 'Profile 2' },
  { id: '3', name: 'Profile 3' },
];

export interface CharacterSheetProps {
  postingAs: TPostingAs;
  setPostingAs: React.Dispatch<React.SetStateAction<TPostingAs>>;
}

export const CharacterSheet = ({
  postingAs,
  setPostingAs,
}: CharacterSheetProps) => {
  const [profile, setProfile] = useState<TPostingAs>(profiles[0]);
  const [nameOverride, setNameOverride] = useState('');

  useEffect(() => {
    setNameOverride('');
  }, [profile]);

  useEffect(() => {
    setPostingAs({
      ...profile,
      name: nameOverride.trim() || profile.name,
    });
  }, [profile, nameOverride]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start gap-[inherit]">
        <div className="lg:max-w-[16rem] w-full space-y-1">
          <label htmlFor="profile-select" className="block text-sm font-medium pointer-events-none">
            Profile
          </label>

          <ProfileSelect
            id="profile-select"
            profiles={profiles}
            value={profile}
            onChange={setProfile}
          />
        </div>

        <div className="lg:max-w-[16rem] w-full space-y-1">
          <label htmlFor="posting-as-input" className="block text-sm font-medium">
            Posting as
          </label>

          <InputGroup>
            <InputGroup.Input
              id="posting-as-input"
              placeholder={profile.name}
              value={nameOverride}
              onChange={(event) => setNameOverride(event.target.value)}
            />
          </InputGroup>
        </div>
      </div>

      {JSON.stringify(postingAs)}
    </div>
  );
};
