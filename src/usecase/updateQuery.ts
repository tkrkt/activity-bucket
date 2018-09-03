import { UseCase } from "../framework/useCase";
import { AppContext } from "../store/appContext";
import { parseQuery } from "../service/parseQuery";

export class UpdateQuery implements UseCase<AppContext> {
  constructor(private text: string) {
  }

  execute(context: AppContext) {
    const queries = parseQuery(context.repo.category, this.text);
    context.setState({
      query: {
        text: this.text,
        queries
      }
    });
  }
}