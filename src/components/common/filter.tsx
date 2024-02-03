import cn from '@utils/cn';
import { ChangeEventHandler } from 'react';

type Props = {
  name: string;
  options: {
    selected?: boolean;
    label: string;
    value: string | number;
  }[];
  onChange?: ChangeEventHandler;
  className?: string;
};

const Filter = ({ name, options, onChange, className }: Props) => {
  const defaultValue = options.find(({ selected }) => selected);

  return (
    <select
      name={name}
      onChange={onChange}
      className={cn(className)}
      defaultValue={defaultValue?.value}
    >
      {options.map(({ label, value }) => {
        return (
          <option key={label} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

export default Filter;
