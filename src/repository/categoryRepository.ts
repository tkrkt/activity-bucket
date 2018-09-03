import { Repository } from "../framework/repository";
import { Category } from "../entity/category";

export class CategoryRepository extends Repository<Category> {
  async ready() {

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