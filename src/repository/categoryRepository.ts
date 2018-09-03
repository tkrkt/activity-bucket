import localforage from "localforage";
import { Repository } from "../framework/repository";
import { Category } from "../entity/category";
import { Identifier } from "../framework/identifier";

export class CategoryRepository extends Repository<Category> {
  private storage: LocalForage;

  constructor() {
    super(Category, {});
    this.storage = localforage.createInstance({
      name: "category",
      driver: localforage.LOCALSTORAGE
    });
  }

  async ready() {
    return this.storage.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        return this.storage.getItem(key).then((json) => {
          const activity = Category.fromJSON(json);
          this.items[activity.id.value] = activity;
        });
      }));
    });
  }

  save(category: Category) {
    super.save(category);
    this.storage.setItem(category.id.value, category);
  }

  remove(id: Identifier<Category>) {
    super.remove(id);
    this.storage.removeItem(id.value);
  }

  findByName(name: string): Category | undefined {
    return this.findAll().find(c => c.name === name);
  }

  findByShorthand(shorthand: string): Category | undefined {
    return this.findAll().find(c => c.shorthand === shorthand);
  }

  findByNameOrShorthand(nameOrShorthand: string): Category | undefined {
    return this.findAll().find(c => c.perfectMatch(nameOrShorthand));
  }

  searchByNameOrShorthand(nameOrShorthand: string): Category[] {
    return this.findAll().filter(c => c.leftHandMatch(nameOrShorthand));
  }
}