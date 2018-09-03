import { UseCase } from "../framework/useCase";
import { AppContext } from "../store/appContext";
import { Identifier } from "../framework/identifier";
import { Activity } from "../entity/activity";

export class RemoveActivity implements UseCase<AppContext> {
  constructor(private activityId: Identifier<Activity>) {
  }

  execute(context: AppContext) {
    context.repo.activity.remove(this.activityId);
  }
}