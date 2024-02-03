import { CategoryType } from '@api/category/category.type';
import { API } from '@api/api-config';
import { UseQueryOptions, useQueries } from '@tanstack/react-query';
import type { ProductItemType, ProductList } from './product.type';
import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

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
  const queryResults = useQueries({
    queries: categories.map((category) => ({
      queryKey: ['product-list', category],
      queryFn: () => productListApi(category),
      select: (data: AxiosResponse<ProductList>) => data.data['meals'],
      staleTime: 3000,
      ...options,
    })),
  }).reduce((acc: ProductItemType[], cur) => {
    return cur.data ? [...acc, ...cur.data] : [...acc];
  }, []);

  const [index, setIndex] = useState(20);
  const fetchNextPage = () => {
    setIndex((prev) =>
      prev + 20 < queryResults.length ? prev + 20 : queryResults.length
    );
  };

  return {
    data: queryResults.slice(0, index),
    isLast: index === queryResults.length,
    fetchNextPage,
  };
};

export { useProductList };
