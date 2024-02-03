import { CategoryType } from '@api/category/category.type';
import { API } from '@api/api-config';
import { UseQueryOptions, useQueries } from '@tanstack/react-query';
import type { ProductList } from './product.type';
import { AxiosError, AxiosResponse } from 'axios';

const productListApi = async (category: CategoryType) => {
  const path = `/filter.php?c=${category}`;

  return await API.get<ProductList>(path);
};

const useProductList = (
  categories: CategoryType[],
  options?: UseQueryOptions<
    AxiosResponse<ProductList>,
    AxiosError,
    ProductList['meals'],
    string[]
  >
) => {
  return useQueries({
    queries: categories.map((category) => ({
      queryKey: ['product-list', category],
      queryFn: () => productListApi(category),
      select: (data: AxiosResponse<ProductList>) => data.data['meals'],
      staleTime: 3000,
      ...options,
    })),
  });
};

export { useProductList };
