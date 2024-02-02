import { HTMLProps, SyntheticEvent, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import productFallback from '@assets/image/fallback/product-fallback.png';

interface Props extends HTMLProps<HTMLImageElement> {
  lazy?: boolean;
  fallback?: string;
}

const Image = ({
  src,
  onError,
  fallback = productFallback,
  lazy = true,
  ...rest
}: Props) => {
  const [imageSrc, setImageSrc] = useState(lazy ? fallback : src);
  const [ref, inView] = useInView();

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    setImageSrc(fallback);
    onError?.(e);
  };

  useEffect(() => {
    if (inView && imageSrc !== src) {
      setImageSrc(src);
    }
  }, [inView]);

  return <img ref={ref} src={imageSrc} onError={handleError} {...rest} />;
};

export default Image;
