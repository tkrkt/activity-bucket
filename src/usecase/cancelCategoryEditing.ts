import { UseCase } from "../framework/useCase";
import { AppContext } from "../store/appContext";

export class CancelCategoryEditing implements UseCase<AppContext> {
  constructor() { }

  execute(context: AppContext) {
    context.setState({
      editingCategory: void 0
    });
  }
}