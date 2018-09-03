import { UseCase } from "../framework/useCase";
import { AppContext } from "../store/appContext";
import { Category, CategoryProps } from "../entity/category";

export class AddCategory implements UseCase<AppContext> {
  constructor(private name: string) {
  }

  execute(context: AppContext) {
    const props: Partial<CategoryProps> = {
      name: this.name
    };
    if (!context.repo.category.findByNameOrShorthand(this.name[0])) {
      props.shorthand = this.name[0];
    }
    context.repo.category.save(new Category(props));
  }
}