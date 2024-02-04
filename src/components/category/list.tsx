import { useCategoryList } from '@/src/api/category/use-category-list';
import CategoryItem from './item';
import cn from '@utils/cn';
import useHistory from '@hooks/use-history';
import type { CategoryType } from '@api/category/category.type';
import { ChangeEvent } from 'react';

type Props = {
  className?: string;
};

const CategoryList = ({ className }: Props) => {
  const { query, updateQuery, getQueryValue } = useHistory();
  const { data: categoryList } = useCategoryList({ suspense: true });

  const handleChange = (category: CategoryType) => (e: ChangeEvent<HTMLInputElement>) => {
    let categoryValues = getQueryValue(query, 'category');

    if (e.target.checked && !categoryValues.includes(category)) {
      categoryValues.push(category);
    } else {
      categoryValues = [...categoryValues.filter((value) => value !== category)];
    }

    updateQuery({ ...query, category: categoryValues });
  };

  return (
    <ul className={cn('space-y-3', className)}>
      {categoryList?.map(({ idCategory, strCategory }) => {
        const id = `${idCategory}_${strCategory}`;
        const category = getQueryValue(query, 'category');
        const checked = category.includes(strCategory);

        return (
          <li key={id}>
            <CategoryItem
              id={id}
              label={strCategory}
              checked={checked}
              onChange={handleChange(strCategory)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryList;
