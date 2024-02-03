import { isReactElementWithName } from '@/src/utils/validation';
import cn from '@utils/cn';
import { Children, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
}>;

const Flex = ({ children, className }: Props) => {
  const row = Children.toArray(children).filter(
    isReactElementWithName<Props>('Row')
  );
  const col = Children.toArray(children).filter(
    isReactElementWithName<Props>('Col')
  );

  const rowClassName = row && row.map(({ props }) => props.className);
  const colClassName = col && col.map(({ props }) => props.className);

  return (
    <div
      className={cn(
        className,
        'flex',
        {
          'flex-col': col.length > 0,
          'flex-row': row.length > 0,
        },
        ...rowClassName,
        ...colClassName
      )}
    >
      {row}
      {col}
    </div>
  );
};

Flex.Row = function Row({ children }: Props) {
  return <>{children}</>;
};

Flex.Col = function Col({ children }: Props) {
  return <>{children}</>;
};

export default Flex;
