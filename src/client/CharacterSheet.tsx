import React from 'react';
import * as Icons from 'react-bootstrap-icons';
import { TPostingAs } from '../core/types';
import { Select } from './Select';

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

  const items = ['one', 'two', 'three', 'four', 'five'];
  const [selectedItem, setSelectedItem] = React.useState(items[0]);

  return (
    <div className="space-y-4">
      <Select.Root value={selectedItem} onValueChange={setSelectedItem}>
        <Select.Trigger className="max-md:max-w-none">
          <Select.Value>
            <div className="flex items-center gap-2">
              <Icons.PersonCircle aria-hidden />
              {selectedItem}
            </div>
          </Select.Value>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="x">
                <Select.ItemText>
                  <div className="flex items-center gap-2">
                    <Icons.PersonLinesFill aria-hidden />
                    Manage profiles
                  </div>
                </Select.ItemText>
              </Select.Item>

              <Select.Item value="y">
                <Select.ItemText>
                  <div className="flex items-center gap-2">
                    <Icons.PersonPlusFill aria-hidden />
                    New profile
                  </div>
                </Select.ItemText>
              </Select.Item>

              <Select.Separator />
              {items.map((item) => (
                <Select.Item key={item} value={item}>
                  <Select.ItemText>
                    <div className="flex items-center gap-2">
                      <Icons.PersonCircle aria-hidden />
                      {item}
                    </div>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

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
