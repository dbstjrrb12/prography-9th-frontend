import cn from '@utils/cn';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;

  col?: boolean;
}>;

const Flex = ({ children, className, col }: Props) => {
  return (
    <div
      className={cn(className, 'flex', {
        'flex-col': col,
      })}
    >
      {children}
    </div>
  );
};

export default Flex;
