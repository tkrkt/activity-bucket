import { UseCase } from "../framework/useCase";
import { AppContext } from "../store/appContext";

export class SaveCategoryEditing implements UseCase<AppContext> {
  constructor() {
  }

  execute(context: AppContext) {
    const editingCategory = context.state.editingCategory;
    if (editingCategory && !editingCategory.error) {
      context.setState({
        editingCategory: void 0
      });
      const category = context.repo.category.findById(editingCategory.categoryId);
      if (category) {
        context.repo.category.save(category.update({
          name: editingCategory.name,
          shorthand: editingCategory.shorthand ? editingCategory.shorthand : void 0
        }));
      } else {
        console.log("error");
      }
    }
  }
}