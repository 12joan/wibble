import React from 'react';
import { useAppContext } from './appContext';
import { InputGroup } from './Input';
import { ProfileSelect } from './ProfileSelect';
import { useOverridable } from './useOverridable';

export const CharacterSheet = () => {
  const { profilesStore, currentProfileStore } = useAppContext();

  const profiles = profilesStore.get();
  const [currentProfile, setCurrentProfile] = currentProfileStore.use();

  const [workingPostingAsName, setWorkingPostingAsName] = useOverridable(
    currentProfile.postingAsName
  );

  const commitPostingAsName = () => {
    const newPostingAsName = workingPostingAsName.trim() || currentProfile.name;
    setWorkingPostingAsName(newPostingAsName);

    currentProfileStore.set({
      ...currentProfile,
      postingAsName: newPostingAsName,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start gap-[inherit]">
        <div className="lg:max-w-[16rem] w-full space-y-1">
          <label
            htmlFor="profile-select"
            className="block text-sm font-medium pointer-events-none"
          >
            Profile
          </label>

          <ProfileSelect
            id="profile-select"
            profiles={profiles}
            value={currentProfile}
            onChange={setCurrentProfile}
          />
        </div>

        <div className="lg:max-w-[16rem] w-full space-y-1">
          <label
            htmlFor="posting-as-input"
            className="block text-sm font-medium"
          >
            Posting as
          </label>

          <InputGroup>
            <InputGroup.Input
              id="posting-as-input"
              placeholder={currentProfile.name}
              value={workingPostingAsName}
              onChange={(event) => {
                setWorkingPostingAsName(event.target.value);
              }}
              onBlur={commitPostingAsName}
            />
          </InputGroup>
        </div>
      </div>
    </div>
  );
};
