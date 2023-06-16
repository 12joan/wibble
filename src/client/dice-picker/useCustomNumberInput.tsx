import React, { useMemo, useState } from 'react';
import { Button } from '../Button';
import { InputGroup } from '../Input';

export interface UseCustomNumberInputOptions {
  placeholder: string;
  inputAriaLabel: string;
  validateInput?: (value: string) => boolean;
  validateNumber?: (value: number) => boolean;
}

export const useCustomNumberInput = ({
  placeholder,
  inputAriaLabel,
  validateInput = () => true,
  validateNumber = () => true,
}: UseCustomNumberInputOptions) => {
  const [stringValue, setStringValue] = useState('');

  const numberValue: number | null = useMemo(() => {
    if (stringValue === '') return null;
    const number = Number(stringValue);
    if (Number.isNaN(number)) return null;
    if (!validateNumber(number)) return null;
    return number;
  }, [stringValue, validateNumber]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (validateInput(value)) {
      setStringValue(value);
    }
  };

  const component = (
    <InputGroup className="rounded-b-none border-b-0">
      <InputGroup.Input
        value={stringValue}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={inputAriaLabel}
      />

      {stringValue !== '' && (
        <Button
          type="submit"
          shape="link"
          color="link"
          className="px-3"
          disabled={numberValue === null}
          children="Confirm"
        />
      )}
    </InputGroup>
  );

  return [numberValue, component] as const;
};
