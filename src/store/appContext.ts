import { CategoryRepository } from "../repository/categoryRepository";
import { ActivityRepository } from "../repository/activityRepository";
import { AppState } from "./state";
import { Context } from "../framework/context";

type Repo = {
  category: CategoryRepository;
  activity: ActivityRepository;
};

export class AppContext extends Context<Repo, AppState> {
}