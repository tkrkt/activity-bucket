import { Activity } from "../entity/activity";
import { Identifier } from "../framework/identifier";
import { Category } from "../entity/category";

export interface QueryInterface {
  match(activity: Activity): boolean;
}

export const querySeparator = ":";

export class CategoryQuery implements QueryInterface {
  static queryKey = "category";

  static queryString(name: string) {
    return CategoryQuery.queryKey + querySeparator + name;
  }

  constructor(readonly categoryId: Identifier<Category>) { }

  match(activity: Activity) {
    return activity.categoryId.equals(this.categoryId);
  }
}

export class DateQuery implements QueryInterface {
  static queryKey = "date";

  static queryString(date: string) {
    return DateQuery.queryKey + querySeparator + date;
  }

  constructor(readonly date: string) { }

  match(activity: Activity) {
    return activity.date === this.date;
  }
}

export class CommentQuery implements QueryInterface {
  constructor(readonly comment: string) { }

  match(activity: Activity) {
    return activity.comment.includes(this.comment);
  }
}

class NeverQuery implements QueryInterface {
  constructor() { }

  match(_: Activity) {
    return false;
  }
}

export const neverQuery = new NeverQuery();

export type Query = CategoryQuery | DateQuery | CommentQuery | NeverQuery;
