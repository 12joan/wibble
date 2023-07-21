import React from 'react';
import * as Icons from 'react-bootstrap-icons';
import { useAppContext } from '../appContext';
import { Button } from '../Button';
import { DiceRollPartsContainer } from '../DiceRollPartsContainer';
import { DiceRollRequestPart } from '../DiceRollRequestPart';

export const FavouriteDiceRolls = () => {
  const { currentProfileStore, postingAs, performDiceRoll } = useAppContext();
  const [currentProfile, setCurrentProfile] = currentProfileStore.use();
  const { favouriteDiceRolls } = currentProfile;

  const removeFavouriteDiceRoll = (index: number) => {
    const newFavouriteDiceRolls = [...favouriteDiceRolls];
    newFavouriteDiceRolls.splice(index, 1);

    setCurrentProfile({
      ...currentProfile,
      favouriteDiceRolls: newFavouriteDiceRolls,
    });
  };

  if (favouriteDiceRolls.length === 0) {
    return (
      <div className="space-y-1 rounded-xl p-8 max-sm:py-4 bg-background text-center">
        <p>
          <strong className="font-medium text-xl">
            No favourites for this profile
          </strong>
        </p>
        <p>
          Click on a dice roll and press the{' '}
          <span className="text-primary whitespace-nowrap">
            <Icons.FileEarmarkPlusFill
              aria-hidden
              className="inline -translate-y-0.5 -mr-0.5"
            />{' '}
            Save
          </span>{' '}
          button to store it here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
      {favouriteDiceRolls.map((diceRoll, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="relative group">
          <Button
            shape="custom"
            className="text-left p-3 pr-12 flex flex-col gap-2 w-full h-full"
            onClick={() =>
              performDiceRoll({
                ...diceRoll,
                postingAs,
              })
            }
          >
            <div className="font-medium">{diceRoll.label}</div>

            <DiceRollPartsContainer>
              {diceRoll.parts.map((part, index) => (
                <DiceRollRequestPart
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  part={part}
                  isFirst={index === 0}
                />
              ))}
            </DiceRollPartsContainer>
          </Button>

          <div className="absolute top-3 right-3 flex flex-col opacity-0 touch-device:opacity-100 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
            <Button
              shape="icon"
              color="subtle"
              className="text-danger"
              aria-label="Remove"
              title="Remove"
              onClick={() => removeFavouriteDiceRoll(index)}
            >
              <Icons.Trash3Fill aria-hidden />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
