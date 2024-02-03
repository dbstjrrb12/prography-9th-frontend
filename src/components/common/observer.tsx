import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import cn from '@utils/cn';

type Props = {
  callback: () => void;
  className?: string;
  hidden?: boolean;
};

const Observer = ({ callback, className, hidden }: Props) => {
  const [ref, isInview] = useInView();

  useEffect(() => {
    if (isInview) {
      callback();
    }
  }, [isInview]);

  return (
    <div ref={ref} className={cn('w-full h-[1px]', { hidden }, className)} />
  );
};

export default Observer;
