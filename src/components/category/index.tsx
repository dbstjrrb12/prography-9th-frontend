import { Suspense } from 'react';
import CategoryLoader from '../loader/category/loader';
import CategoryList from './list';
import QueryErrorBoundary from '../common/error-boundary';
import ErrorFallback from '../common/error-fallback';

type Props = {
  className?: string;
};

const Category = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className="h-[calc(100vh-150px)] overflow-hidden">
        <QueryErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorFallback resetErrorBoundary={resetErrorBoundary} className="h-full px-4" />
          )}
        >
          <Suspense fallback={<CategoryLoader />}>
            <CategoryList className="h-full pt-1 overflow-scroll" />
          </Suspense>
        </QueryErrorBoundary>
      </div>
    </div>
  );
};

export default Category;
