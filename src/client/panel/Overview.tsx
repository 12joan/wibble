import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../appContext';
import { FavouriteDiceRolls } from './FavouriteDiceRolls';
import { PostingAsNameInput } from './PostingAsNameInput';
import { ProfileSelect } from './ProfileSelect';

export const Overview = () => {
  const { profilesStore, currentProfileStore } = useAppContext();
  const navigate = useNavigate();

  const profiles = profilesStore.get();
  const [currentProfile, setCurrentProfile] = currentProfileStore.use();

  const handleManageProfiles = () => {
    navigate('/manage-profiles');
  };

  const handleNewProfile = () => {
    navigate('/manage-profiles/new');
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
            onManageProfiles={handleManageProfiles}
            onNewProfile={handleNewProfile}
          />
        </div>

        <div className="lg:max-w-[16rem] w-full space-y-1">
          <label
            htmlFor="posting-as-input"
            className="block text-sm font-medium"
          >
            Posting as
          </label>

          <PostingAsNameInput id="posting-as-input" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-medium">Favourites</h1>
        <FavouriteDiceRolls />
      </div>
    </div>
  );
};
