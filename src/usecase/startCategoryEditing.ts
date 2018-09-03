import { UseCase } from "../framework/useCase";
import { AppContext } from "../store/appContext";
import { Category } from "../entity/category";

export class StartCategoryEditing implements UseCase<AppContext> {
  constructor(private category: Category) { }

  execute(context: AppContext) {
    context.setState({
      editingCategory: {
        categoryId: this.category.id,
        name: this.category.name,
        shorthand: this.category.shorthand,
        error: void 0
      }
    });
  }
}