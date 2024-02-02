import { isReactElementWithName } from '@/src/utils/validation';
import cn from '@utils/cn';
import { Children, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
}>;

const Flex = ({ children, className }: Props) => {
  const row = Children.toArray(children).filter(isReactElementWithName('Row'));
  const col = Children.toArray(children).filter(isReactElementWithName('Col'));

  return (
    <div
      className={cn(className, 'flex', {
        'flex-col': col,
        'flex-row': row,
      })}
    >
      {row}
      {col}
    </div>
  );
};

Flex.Row = function Row({ children, className }: Props) {
  return <div className={className}>{children}</div>;
};

Flex.Col = function Col({ children, className }: Props) {
  return <div className={className}>{children}</div>;
};

export default Flex;
