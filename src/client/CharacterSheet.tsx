import React from 'react';
import { TPostingAs } from '../core/types';

export interface CharacterSheetProps {
  postingAs: TPostingAs;
  setPostingAs: React.Dispatch<React.SetStateAction<TPostingAs>>;
}

export const CharacterSheet = ({
  postingAs,
  setPostingAs,
}: CharacterSheetProps) => {
  const { id, name } = postingAs;
  const setId = (id: string) => setPostingAs((prev) => ({ ...prev, id }));
  const setName = (name: string) => setPostingAs((prev) => ({ ...prev, name }));

  return (
    <div className="space-y-4">
      <label className="block">
        <div className="font-medium">ID</div>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </label>

      <label className="block">
        <div className="font-medium">Name</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </div>
  );
};
