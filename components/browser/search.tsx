import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Input } from '../ui/input';

interface SearchInputProps {
  query: string | null;
  setTopQuery: Dispatch<SetStateAction<string | null>>;
}
export const Search = ({ query, setTopQuery }: SearchInputProps) => {
  const handleChange = useCallback(
    (input: string) => {
      setTopQuery(input);
    },
    [setTopQuery]
  );

  return (
    <Input
      className="w-50"
      placeholder="Find recipe..."
      value={query || ''}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};
