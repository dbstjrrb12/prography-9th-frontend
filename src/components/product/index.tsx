import { ChangeEventHandler, Suspense, useState } from 'react';
import ProductList from './list';

import Filter from '@components/common/filter';
import useHistory from '@/src/hooks/use-history';
import { OrderType } from './product.type';
import ProductsLoader from '../loader/product/loader';
import Flex from '../common/flex';

import QueryErrorBoundary from '../common/error-boundary';
import ErrorFallback from '../common/error-fallback';

const ProductsGrid = () => {
  const { query, getQueryValue, updateQuery } = useHistory();
  const filterValue = (getQueryValue<OrderType>(query, 'filter') || ['new'])[0];

  const [cols, setCols] = useState(4);
  const [order, setOrder] = useState(filterValue);

  const colOptions = [
    { label: '4개씩 보기', value: 4, selected: cols === 4 },
    { label: '2개씩 보기', value: 2, selected: cols === 2 },
  ];
  const orderOptions = [
    { label: '최신순', value: 'new', selected: order === 'new' },
    { label: '이름 오름차순', value: 'asc', selected: order === 'asc' },
    { label: '이름 내림차순', value: 'desc', selected: order === 'desc' },
  ];

  const handleColChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const cols = Number(e.target.value);
    setCols(cols);
  };
  const handleOrderChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const order = e.target.value as OrderType;
    updateQuery({ ...query, filter: order });
    setOrder(order);
  };

  return (
    <Flex col className="flex-auto basis-[80%] h-[calc(100vh-150px)] overflow-hidden">
      <Flex className="mb-5 space-x-2 justify-end">
        <Filter
          name="보기개수"
          options={colOptions}
          onChange={handleColChange}
          className="border border-gray-400 rounded px-2 py-1 hidden md:block"
        />
        <Filter
          name="정렬"
          options={orderOptions}
          onChange={handleOrderChange}
          className="border border-gray-400 rounded px-2 py-1"
        />
      </Flex>

      <QueryErrorBoundary
        fallbackRender={({ resetErrorBoundary }) => (
          <ErrorFallback resetErrorBoundary={resetErrorBoundary} className="flex-auto" />
        )}
      >
        <Suspense fallback={<ProductsLoader cols={cols} />}>
          <ProductList filter={{ cols, order }} className="flex-auto overflow-scroll" />
        </Suspense>
      </QueryErrorBoundary>
    </Flex>
  );
};

export default ProductsGrid;
