export type FilteredCategoriesProps = {
  selectedCategory: string
  isCategoryListOpen: boolean;
  toggleCategoryList: () => void;
  handleCategorySelect: (status: string) => void;
};
