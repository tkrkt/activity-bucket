import { UseCase } from "../framework/useCase";
import { AppContext } from "../store/appContext";
import { Identifier } from "../framework/identifier";
import { Category } from "../entity/category";

export class RemoveCategory implements UseCase<AppContext> {
  constructor(private categoryId: Identifier<Category>) {
  }

  execute(context: AppContext) {
    context.repo.activity.removeByCategoryId(this.categoryId);
    context.repo.category.remove(this.categoryId);
  }
}