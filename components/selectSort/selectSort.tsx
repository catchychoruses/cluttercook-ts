import { Dispatch, SetStateAction, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CommandGroup, CommandItem, Command } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';

import clsx from 'clsx';

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const SORTING_TYPE = [
  { value: 'titledesc', label: 'Name Descending' },
  { value: 'titleasc', label: 'Name Ascending' },
  { value: 'datedesc', label: 'Date Descending' },
  { value: 'dateasc', label: 'Date Ascending' },
];

export const SelectSort = ({ value, setValue }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[200px] justify-between"
          aria-expanded={open}
        >
          {value
            ? SORTING_TYPE.find((type) => type.value === value)?.label
            : 'Sort by:'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {SORTING_TYPE.map((type) => (
              <CommandItem
                key={type.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                  console.log(currentValue, value);
                }}
              >
                <Check
                  className={clsx(
                    'mr-2 h-4 w-4',
                    value === type.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {type.value}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
