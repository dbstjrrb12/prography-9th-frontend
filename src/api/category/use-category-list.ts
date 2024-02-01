import { API } from '@api/api-config';
import { CategoryList } from './category.type';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

const categoryListApi = async () => {
  return await API.get<CategoryList>('/categories.php');
};

const useCategoryList = (
  options?: UseQueryOptions<
    AxiosResponse<CategoryList>,
    AxiosError,
    CategoryList['categories'],
    string[]
  >
) => {
  return useQuery(['category-list'], categoryListApi, {
    refetchOnWindowFocus: false,
    select: (data) => {
      const categoryList = data.data.categories;
      categoryList.sort((a, b) =>
        Number(a.idCategory) < Number(b.idCategory) ? -1 : 1
      );

      return categoryList;
    },
    ...options,
  });
};

export { useCategoryList };
