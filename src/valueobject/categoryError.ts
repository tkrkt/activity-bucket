export class CategoryError {
  constructor(public message: string) { }
}

export const emptyNameError = new CategoryError("name is required");
export const duplicateNameError = new CategoryError("this name is duplicated with other categories");
export const duplicateShorthandError = new CategoryError("this shorthand is duplicated with other categories");
