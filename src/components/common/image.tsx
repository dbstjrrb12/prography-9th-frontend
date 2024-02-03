import { HTMLProps, SyntheticEvent, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import productFallback from '@assets/image/fallback/product-fallback.png';
import cn from '@utils/cn';

interface Props extends HTMLProps<HTMLImageElement> {
  lazy?: boolean;
  fallback?: string;
}

const Image = ({
  src,
  width,
  height,
  onError,
  fallback = productFallback,
  lazy = true,
  className,
  ...rest
}: Props) => {
  const [imageSrc, setImageSrc] = useState(() => (lazy ? fallback : src));
  const [ref, inView] = useInView();

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    setImageSrc(fallback);
    onError?.(e);
  };

  useEffect(() => {
    if (inView && imageSrc !== src) {
      setImageSrc(src);
    }
  }, [imageSrc, inView, src]);

  return (
    <div
      className={cn('overflow-hidden', className)}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <img ref={ref} src={imageSrc} onError={handleError} className={'w-full h-full'} {...rest} />
    </div>
  );
};

export default Image;
