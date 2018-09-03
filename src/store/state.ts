import { Query } from "../valueobject/query";
import { ActivityInputError } from "../valueobject/activityInputError";
import { CategoryError } from "../valueobject/categoryError";
import { Identifier } from "../framework/identifier";
import { Category } from "../entity/category";

export interface ActivityInputState {
  text: string;
  categoryText: string;
  commentText: string;
  matchedCategories: Array<Identifier<Category>>;
  error?: ActivityInputError;
  showError: boolean;
}

export interface QueryState {
  text: string;
  queries: Query[]
}

export interface EdittingCategoryState {
  categoryId: Identifier<Category>;
  name: string;
  shorthand: string;
  error?: CategoryError;
}

export type AppState = {
  input: ActivityInputState;
  query: QueryState;
  editingCategory?: EdittingCategoryState
};

export const initialState: AppState = {
  input: {
    text: "",
    categoryText: "",
    commentText: "",
    matchedCategories: [],
    showError: false
  },
  query: {
    text: "",
    queries: []
  }
};
