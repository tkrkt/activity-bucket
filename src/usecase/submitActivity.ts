import { UseCase } from "../framework/useCase";
import { AppContext } from "../store/appContext";
import { AddCategory } from "./addCategory";
import { AddActivity } from "./addActivity";
import { ClearActivityInput } from "./clearActivityInput";
import { Identifier } from "../framework/identifier";
import { Category } from "../entity/category";

export class SubmitInput implements UseCase<AppContext> {
  constructor() {
  }

  execute(context: AppContext) {
    const input = context.state.input;
    if (input.error) {
      context.setState({
        input: {
          ...context.state.input,
          showError: true
        }
      });
      return;
    }

    let categoryId: Identifier<Category>;
    if (input.matchedCategories.length) {
      categoryId = input.matchedCategories[0];
    } else {
      context.dispatch(new AddCategory(input.categoryText));
      const createdCategory = context.repo.category.findByName(input.categoryText);
      if (createdCategory) {
        categoryId = createdCategory.id;
      } else {
        console.error("error");
        return;
      }
    }

    context.dispatch(new AddActivity(categoryId, input.commentText));
    context.dispatch(new ClearActivityInput());
  }
}