import { UseCase } from "../framework/useCase";
import { AppContext } from "../store/appContext";

export class ClearActivityInput implements UseCase<AppContext> {
  constructor() {
  }

  execute(context: AppContext) {
    context.setState({
      input: {
        text: "",
        categoryText: "",
        commentText: "",
        matchedCategories: [],
        error: void 0,
        showError: false
      }
    });
  }
}