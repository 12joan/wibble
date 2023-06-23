import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as Icons from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../appContext';
import { BackButton } from '../BackButton';
import { Button, ButtonProps } from '../Button';
import { generateInsecureRandomId } from '../insecureRandomId';
import { transformProfileById } from '../profilesStore';

const ListboxButton = (props: ButtonProps) => {
  const { title } = props;

  return (
    <Button
      shape="custom"
      className="px-4 py-2 rounded-none border-t-0 border-l-0 first:border-l first:rounded-bl-lg"
      aria-label={title}
      {...props}
    />
  );
};

interface ProfileNameInputProps {
  initialName: string;
  commitName: (name: string) => void;
}

const ProfileNameInput = ({
  initialName,
  commitName,
}: ProfileNameInputProps) => {
  const [name, setName] = useState(initialName);
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const input = inputRef.current!;
    input.select();

    return () => {
      // Name variable is stale
      commitName(input.value);
    };
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      className="w-full no-focus-ring bg-foreground text-text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
};

export const ManageProfiles = () => {
  const { profilesStore } = useAppContext();
  const profiles = profilesStore.get();

  const [selectionIndex, setSelectionIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const listboxRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const addProfile = () => {
    setSelectionIndex(profiles.length);

    profilesStore.set([
      ...profiles,
      {
        id: generateInsecureRandomId(),
        name: 'New Profile',
        postingAsName: 'New Profile',
        postingAsNameIsTemporary: true,
      },
    ]);

    setTimeout(() => setIsEditing(true), 0);

    listboxRef.current!.focus();
  };

  const removeProfiles = () => {
    if (selectionIndex === null || profiles.length === 1) return;

    if (selectionIndex === profiles.length - 1) {
      setSelectionIndex(selectionIndex - 1);
    }

    profilesStore.set(profiles.filter((_, i) => i !== selectionIndex));
  };

  const moveProfile = (direction: 'up' | 'down') => {
    if (selectionIndex === null) return;

    const destinationIndex =
      direction === 'up' ? selectionIndex - 1 : selectionIndex + 1;

    const movedProfile = profiles[selectionIndex];
    const newProfiles = [...profiles];
    newProfiles.splice(selectionIndex, 1);
    newProfiles.splice(destinationIndex, 0, movedProfile);

    setSelectionIndex(destinationIndex);
    profilesStore.set(newProfiles);
  };

  const moveSelection = (direction: 'up' | 'down') => {
    if (selectionIndex === null) {
      setSelectionIndex(direction === 'up' ? profiles.length - 1 : 0);
      return;
    }

    const destinationIndex =
      direction === 'up' ? selectionIndex - 1 : selectionIndex + 1;

    if (destinationIndex < 0 || destinationIndex >= profiles.length) return;
    setSelectionIndex(destinationIndex);
  };

  const commitName = (name: string) => {
    const trimmedName = name.trim();
    if (trimmedName === '') return;

    const selectedProfile = profiles[selectionIndex!];
    const shouldUpdatedPostingAsName =
      selectedProfile.postingAsNameIsTemporary ||
      selectedProfile.postingAsName === selectedProfile.name;

    transformProfileById(profilesStore, selectedProfile.id, (profile) => ({
      ...profile,
      name: trimmedName,
      postingAsName: shouldUpdatedPostingAsName
        ? trimmedName
        : profile.postingAsName,
    }));
  };

  // Immediately add profile if route ends in /new
  useEffect(() => {
    if (location.pathname === '/manage-profiles/new') {
      addProfile();
      navigate('/manage-profiles', { replace: true });
    }
  }, []);

  // Deselect on click outside
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (!listboxRef.current?.contains(e.target as Node)) {
        setSelectionIndex(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  // Stop editing on selection change
  useLayoutEffect(() => {
    setIsEditing(false);
  }, [selectionIndex]);

  // Ensure focus is not lost when stop editing
  useEffect(() => {
    if (!isEditing && document.activeElement === document.body) {
      listboxRef.current?.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowUp':
        moveSelection('up');
        event.preventDefault();
        break;

      case 'ArrowDown':
        moveSelection('down');
        event.preventDefault();
        break;

      case 'Enter':
        if (
          selectionIndex !== null &&
          document.activeElement?.tagName !== 'BUTTON'
        ) {
          setIsEditing(!isEditing);
          event.preventDefault();
        }
        break;

      case 'Escape':
        if (isEditing) {
          setIsEditing(false);
          event.preventDefault();
          event.stopPropagation();
        }
        break;
    }
  };

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <BackButton navigate={navigate} />
        <h1 className="text-2xl font-medium">Manage profiles</h1>
      </div>

      <div
        ref={listboxRef}
        role="listbox"
        aria-label="Profiles"
        className="flex flex-col min-h-[200px] rounded-lg ring-offset-2"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {profiles.map((profile, index) => {
          const isSelected = index === selectionIndex;
          const isSelectedAndEditing = isSelected && isEditing;

          return (
            // eslint-disable-next-line jsx-a11y/interactive-supports-focus
            <div
              key={profile.id}
              className="px-4 py-2 hover:bg-foreground-dimmed-1 selected:bg-primary-bg selected:hover:bg-primary-bg-dimmed-1 selected:text-white cursor-pointer first:rounded-t-lg first:border-t border-x"
              role="option"
              aria-selected={isSelected}
              onClick={() => {
                if (isSelected) {
                  setIsEditing(true);
                } else {
                  setSelectionIndex(index);
                }
              }}
              onBlur={() => setIsEditing(false)}
            >
              {isSelectedAndEditing ? (
                <ProfileNameInput
                  initialName={profile.name}
                  commitName={commitName}
                />
              ) : (
                <span className="select-none">{profile.name}</span>
              )}
            </div>
          );
        })}

        <div className="grow border-x" />

        <div className="border-t flex">
          <ListboxButton title="New profile" onClick={addProfile}>
            <Icons.PlusLg aria-hidden />
          </ListboxButton>

          <ListboxButton
            title="Remove profile"
            onClick={removeProfiles}
            disabled={selectionIndex === null || profiles.length === 1}
          >
            <Icons.DashLg aria-hidden />
          </ListboxButton>

          <ListboxButton
            title="Rename profile"
            onClick={() => setIsEditing(!isEditing)}
            disabled={selectionIndex === null || isEditing}
          >
            <Icons.Pencil aria-hidden />
          </ListboxButton>

          <ListboxButton
            title="Move profile up"
            onClick={() => moveProfile('up')}
            disabled={selectionIndex === null || selectionIndex === 0}
          >
            <Icons.ArrowUp aria-hidden />
          </ListboxButton>

          <ListboxButton
            title="Move profile down"
            onClick={() => moveProfile('down')}
            disabled={
              selectionIndex === null || selectionIndex === profiles.length - 1
            }
          >
            <Icons.ArrowDown aria-hidden />
          </ListboxButton>

          <div className="grow border-b border-r rounded-br-lg" />
        </div>
      </div>
    </div>
  );
};
