import ContentLoader from 'react-content-loader';

import cn from '@utils/cn';

const ProductLoader = () => {
  return (
    <ContentLoader height={240} className="rounded-lg w-full">
      <rect x="0" y="0" rx="0" ry="0" height={200} className="w-full" />
      <rect x="0" y="210" rx="0" ry="0" height={30} className="w-full" />
    </ContentLoader>
  );
};

const ProductsLoader = ({
  cols,
  className,
}: {
  cols: number;
  className?: string;
}) => {
  return (
    <ul
      className={cn(
        'grid grid-cols-1 gap-x-2 gap-y-3 ',
        {
          'md:grid-cols-2': cols === 2,
          'md:grid-cols-4': cols === 4,
        },
        className
      )}
    >
      {Array.from({ length: 20 }, (_, idx) => idx + 1).map((num) => {
        return (
          <li key={num}>
            <ProductLoader />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsLoader;
