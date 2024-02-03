import type { ProductItemType } from '@/src/api/product.ts/product.type';
import { useProductList } from '@/src/api/product.ts/use-product-list';
import ProductItem from './item';
import cn from '@/src/utils/cn';
import useHistory from '@/src/hooks/use-history';
import { CategoryType } from '@/src/api/category/category.type';
import { OrderType } from './product.type';

type Props = {
  className?: string;
  filter: {
    cols: number;
    order: OrderType;
  };
};

const ProductList = ({ className, filter }: Props) => {
  const { query, getQueryValue } = useHistory();
  const categoryList = getQueryValue(query, 'category') as CategoryType[];

  const queryResults = useProductList(categoryList, {
    suspense: true,
    keepPreviousData: true,
  });

  const productList = queryResults.reduce((acc: ProductItemType[], cur) => {
    return cur.data ? [...acc, ...cur.data] : [...acc];
  }, []);

  productList.sort((a, b) => {
    if (filter.order === 'new') {
      return a.idMeal > b.idMeal ? -1 : 1;
    }

    if (a < b) return filter.order === 'desc' ? 1 : -1;
    if (a > b) return filter.order === 'desc' ? -1 : 1;
    return 0;
  });

  return (
    <ul
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
    </ul>
  );
};

export default ProductList;
