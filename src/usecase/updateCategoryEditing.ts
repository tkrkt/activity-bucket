import { UseCase } from "../framework/useCase";
import { AppContext } from "../store/appContext";
import { validateCategoryInput } from "../service/validateCategoryInput";

export class UpdateCategoryEditing implements UseCase<AppContext> {
  constructor(private props: {
    name: string;
    shorthand: string;
  }) {
  }

  execute(context: AppContext) {
    const editingCategory = context.state.editingCategory;
    if (editingCategory) {
      const error = validateCategoryInput(context.repo.category, {
        ...this.props,
        categoryId: editingCategory.categoryId
      });
      context.setState({
        editingCategory: {
          ...editingCategory,
          ...this.props,
          error
        }
      });
    }
  }
}