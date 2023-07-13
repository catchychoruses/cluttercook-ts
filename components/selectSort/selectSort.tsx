'use client';

import clsx from 'clsx';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '../ui/select';

type Props = {
  className?: string;
};

export const SelectSort = (props: Props) => {
  return (
    <Select>
      <SelectTrigger className={clsx(props.className, 'w-40 bg-background')}>
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent position="item-aligned">
        <SelectItem value="penis">penis</SelectItem>
        <SelectItem value="penis2">penis</SelectItem>
        <SelectItem value="penis3">penis</SelectItem>
      </SelectContent>
    </Select>
  );
};
