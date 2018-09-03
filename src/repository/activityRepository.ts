import localforage from "localforage";
import { Repository } from "../framework/repository";
import { Activity } from "../entity/activity";
import { Identifier } from "../framework/identifier";
import { Category } from "../entity/category";

export class ActivityRepository extends Repository<Activity> {
  private storage: LocalForage;

  constructor() {
    super(Activity, {});
    this.storage = localforage.createInstance({
      name: "activity",
      driver: localforage.LOCALSTORAGE
    });
  }

  async ready() {
    return this.storage.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        return this.storage.getItem(key).then((json: any) => {
          const activity = Activity.fromJSON(json);
          this.items[activity.id.value] = activity;
        });
      }));
    });
  }

  save(activity: Activity) {
    super.save(activity);
    this.storage.setItem(activity.id.value, activity);
  }

  remove(id: Identifier<Activity>) {
    super.remove(id);
    this.storage.removeItem(id.value);
  }

  findByCategoryId(categoryId: Identifier<Category>): Activity[] {
    return this.findAll().filter(a => a.categoryId === categoryId);
  }

  findByDate(date: string): Activity[] {
    return this.findAll().filter(a => a.date === date);
  }

  removeByCategoryId(categoryId: Identifier<Category>) {
    this.findAll()
      .filter(a => a.categoryId.equals(categoryId))
      .forEach(a => this.remove(a.id));
  }
}