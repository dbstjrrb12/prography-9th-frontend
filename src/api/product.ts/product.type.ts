interface ProductItemType {
  strMeal: string;
  strMealThumb: string;
  idMeal: `${number}`;
}

type ProductList = { meals: ProductItemType[] };

export type { ProductItemType, ProductList };
