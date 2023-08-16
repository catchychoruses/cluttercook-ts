import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CommandGroup, CommandItem, Command } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SORTING_TYPES } from '@/lib/types';

type Props = {
  currentSortingType: SORTING_TYPES;
  setCurrentSortingType: (value: SORTING_TYPES) => void;
};

const SORTING_TYPE = [
  {
    value: SORTING_TYPES.TITLE_DESC,
    label: 'Title Desc.',
  },
  {
    value: SORTING_TYPES.TITLE_ASC,
    label: 'Title Asc.',
  },
  {
    value: SORTING_TYPES.DATE_DESC,
    label: 'Date Desc.',
  },
  {
    value: SORTING_TYPES.DATE_ASC,
    label: 'Date Asc.',
  },
];

export const SelectSort = ({
  currentSortingType,
  setCurrentSortingType,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleSelectSortingType = (selectedType: SORTING_TYPES) => {
    if (currentSortingType !== selectedType) {
      setCurrentSortingType(selectedType);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-50 justify-between"
          aria-expanded={open}
          aria-controls="radix-:R1arbdj9:"
        >
          {currentSortingType
            ? SORTING_TYPE.find((type) => type.value === currentSortingType)
                ?.label
            : 'Sort by:'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandGroup>
            {SORTING_TYPE.map((type) => (
              <CommandItem
                className="pl-0 pr-4"
                key={type.value}
                onSelect={() => handleSelectSortingType(type.value)}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    currentSortingType === type.value
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {type.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
