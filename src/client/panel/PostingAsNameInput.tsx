import React from 'react';
import { useAppContext } from '../appContext';
import { InputGroup } from '../Input';
import { useOverridable } from '../useOverridable';

export interface PostingAsNameProps {
  id: string;
}

export const PostingAsNameInput = ({ id }: PostingAsNameProps) => {
  const { currentProfileStore } = useAppContext();

  const [currentProfile] = currentProfileStore.use();

  const [workingPostingAsName, setWorkingPostingAsName] = useOverridable(
    currentProfile.postingAsName
  );

  const commitPostingAsName = () => {
    const newPostingAsName = workingPostingAsName.trim() || currentProfile.name;
    setWorkingPostingAsName(newPostingAsName);

    currentProfileStore.set({
      ...currentProfile,
      postingAsName: newPostingAsName,
      postingAsNameIsTemporary: false,
    });
  };

  return (
    <InputGroup>
      <InputGroup.Input
        id={id}
        placeholder={currentProfile.name}
        value={workingPostingAsName}
        onChange={(event) => {
          setWorkingPostingAsName(event.target.value);
        }}
        onBlur={commitPostingAsName}
      />
    </InputGroup>
  );
};
