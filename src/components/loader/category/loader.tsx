import cn from '@utils/cn';
import ContentLoader from 'react-content-loader';

const ItemLoader = () => {
  return (
    <ContentLoader width={60} height={31} className="rounded-lg">
      <rect x="0" y="0" rx="0" ry="0" width="60" height="31" />
    </ContentLoader>
  );
};

const CategoryLoader = ({ className }: { className?: string }) => {
  return (
    <ul className={cn('space-y-3', className)}>
      {Array.from({ length: 14 }, (_, idx) => idx + 1).map((num) => (
        <li key={num}>
          <ItemLoader />
        </li>
      ))}
    </ul>
  );
};

export default CategoryLoader;
