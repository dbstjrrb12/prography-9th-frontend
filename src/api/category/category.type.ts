type CategoryType =
  | 'Beef'
  | 'Chicken'
  | 'Dessert'
  | 'Lamb'
  | 'Miscellaneous'
  | 'Pasta'
  | 'Pork'
  | 'Seafood'
  | 'Side'
  | 'Starter'
  | 'Vegan'
  | 'Vegetarian'
  | 'Breakfast'
  | 'Goat';

interface CategoryItem {
  idCategory: `${number}`;
  strCategory: CategoryType;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

type CategoryList = { categories: CategoryItem[] };

export type { CategoryList, CategoryType };
