import { useCategoryList } from '@/src/api/category/use-category-list';
import CategoryItem from './item';
import cn from '@utils/cn';

type Props = {
  className?: string;
};

const CategoryList = ({ className }: Props) => {
  const { data: categoryList } = useCategoryList({ suspense: true });

  return (
    <ul className={cn('space-y-3', className)}>
      {categoryList?.map(({ idCategory, strCategory }) => {
        const id = `${idCategory}_${strCategory}`;

        return (
          <li key={id}>
            <CategoryItem id={id} label={strCategory} onChange={() => {}} />
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryList;
