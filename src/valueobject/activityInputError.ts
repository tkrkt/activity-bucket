export class ActivityInputError {
  constructor(public message: string) { }
}

export const emptyCategoryError = new ActivityInputError("category is required");
export const emptyCommnentError = new ActivityInputError("comment is required");
export const multipleCategoryError = new ActivityInputError("cannot select one category");
