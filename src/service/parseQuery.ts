import { Query, querySeparator, CategoryQuery, neverQuery, DateQuery, CommentQuery } from "../valueobject/query";
import { CategoryRepository } from "../repository/categoryRepository";

export const parseQuery = (repo: CategoryRepository, text: string): Query[] => {
  return text.trim().split(/\s+/).map((chunk) => {
    const key = chunk.split(querySeparator, 2)[0];
    const value = chunk.substr(key.length + 1);
    if (key === CategoryQuery.queryKey && value) {
      const category = repo.findByName(value);
      if (category) {
        return new CategoryQuery(category.id);
      } else {
        return neverQuery;
      }
    } else if (key === DateQuery.queryKey && value) {
      return new DateQuery(value);
    } else {
      return new CommentQuery(chunk);
    }
  });
}
