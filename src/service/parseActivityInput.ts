import { Category } from "../entity/category";
import { ActivityInputError, emptyCategoryError, emptyCommnentError, multipleCategoryError } from "../valueobject/activityInputError";
import { CategoryRepository } from "../repository/categoryRepository";
import { Identifier } from "../framework/identifier";

const split = (text: string): [string, string] => {
  const categoryText: string = text.trim().split(/\s+/, 1)[0];
  const commentText = text.trim().substr(categoryText.length);
  return [categoryText.trim(), commentText.trim()];
};

export const parseActivityInput = (repo: CategoryRepository, text: string): {
  categoryText: string;
  commentText: string;
  error?: ActivityInputError;
  matchedCategories: Array<Identifier<Category>>;
} => {
  const [categoryText, commentText] = split(text);

  let matched: Category[];
  if (categoryText.length) {
    matched = repo.searchByNameOrShorthand(categoryText);
  } else {
    matched = [];
  }

  let error: undefined | ActivityInputError;
  if (!categoryText.length) {
    error = emptyCategoryError;
  } else if (!commentText.length) {
    error = emptyCommnentError;
  } else if (matched.length > 1) {
    if (matched.find(c => c.perfectMatch(categoryText))) {
      error = void 0; // OK
    } else {
      error = multipleCategoryError;
    }
  } else {
    error = void 0; // OK
  }

  return {
    matchedCategories: matched.map(c => c.id),
    categoryText,
    commentText,
    error
  }
};