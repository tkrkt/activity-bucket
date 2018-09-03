import { CategoryError, emptyNameError, duplicateNameError, duplicateShorthandError } from "../valueobject/categoryError";
import { CategoryRepository } from "../repository/categoryRepository";
import { Identifier } from "../framework/identifier";
import { Category } from "../entity/category";

const isDuplicated = (repo: CategoryRepository, categoryId: Identifier<Category>, nameOrShorthand: string): boolean => {
  const category = repo.findByNameOrShorthand(nameOrShorthand);
  if (!category) {
    return false;
  } else {
    return !category.id.equals(categoryId);
  }
};

export const validateCategoryInput = (repo: CategoryRepository, args: {
  categoryId: Identifier<Category>;
  name: string;
  shorthand: string;
}): CategoryError | undefined => {
  if (!args.name.length) {
    return emptyNameError;
  } else if (isDuplicated(repo, args.categoryId, args.name)) {
    return duplicateNameError;
  } else if (isDuplicated(repo, args.categoryId, args.name)) {
    return duplicateShorthandError;
  } else {
    return;
  }
};
