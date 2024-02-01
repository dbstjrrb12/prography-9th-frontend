import cn from '@utils/cn';
import { ChangeEventHandler } from 'react';

type CategoryItemProps = {
  id: string;
  label: string;
  onChange: ChangeEventHandler;
  className?: string;
};

const CategoryItem = ({
  id,
  label,
  className,
  onChange,
}: CategoryItemProps) => {
  return (
    <>
      <input
        id={id}
        type="checkbox"
        onChange={onChange}
        className="a11yHidden peer"
      />
      <label
        htmlFor={id}
        className={cn(
          'cursor-pointer px-2 py-1 border-2 border-gray-400 rounded-lg ',
          'peer-checked:border-blue-600 peer-checked:bg-blue-600/15',
          className
        )}
      >
        {label}
      </label>
    </>
  );
};

export default CategoryItem;
