import { Repository } from "../framework/repository";
import { Activity } from "../entity/activity";
import { Identifier } from "../framework/identifier";
import { Category } from "../entity/category";

export class ActivityRepository extends Repository<Activity> {
  async ready() {
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