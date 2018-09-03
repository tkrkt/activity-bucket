import { UseCase } from "../framework/useCase";
import { AppContext } from "../store/appContext";
import { Activity } from "../entity/activity";
import { Identifier } from "../framework/identifier";
import { Category } from "../entity/category";

export class AddActivity implements UseCase<AppContext> {
  constructor(private categoryId: Identifier<Category>, private comment: string) {
  }

  execute(context: AppContext) {
    context.repo.activity.save(new Activity({
      categoryId: this.categoryId,
      comment: this.comment
    }));
  }
}