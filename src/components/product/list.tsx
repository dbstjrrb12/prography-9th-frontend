import { useProductList } from '@api/product.ts/use-product-list';
import { CategoryType } from '@api/category/category.type';
import Observer from '@components/common/observer';
import useHistory from '@hooks/use-history';
import cn from '@utils/cn';

import ProductItem from './item';
import { OrderType } from './product.type';
import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
  filter: {
    cols: number;
    order: OrderType;
  };
};

const ProductList = ({ className, filter }: Props) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const { query, getQueryValue } = useHistory();
  const categoryList = getQueryValue(query, 'category') as CategoryType[];

  const {
    data: productList,
    fetchNextPage,
    isLast,
  } = useProductList(categoryList, {
    suspense: true,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  productList.sort((a, b) => {
    if (filter.order === 'new') {
      return a.idMeal > b.idMeal ? -1 : 1;
    }

    return filter.order === 'desc'
      ? b.strMeal.localeCompare(a.strMeal)
      : a.strMeal.localeCompare(b.strMeal);
  });

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0 });
    }
  }, [categoryList]);

  return (
    <ul
      ref={listRef}
      className={cn(
        'grid grid-cols-1 gap-x-2 gap-y-3',
        {
          'md:grid-cols-4': filter.cols === 4,
          'md:grid-cols-2': filter.cols === 2,
        },
        className
      )}
    >
      {productList?.map(({ strMeal, idMeal, strMealThumb }) => {
        return (
          <li key={`${strMeal}_${idMeal}`} data-id={idMeal}>
            <ProductItem title={strMeal} media={{ url: strMealThumb }} />
          </li>
        );
      })}
      <Observer callback={fetchNextPage} hidden={isLast} />
    </ul>
  );
};

export default ProductList;
