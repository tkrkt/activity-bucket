import { UseCase } from "../framework/useCase";
import { AppContext } from "../store/appContext";

export class ClearQuery implements UseCase<AppContext> {
  execute(context: AppContext) {
    context.setState({
      query: {
        text: "",
        queries: []
      }
    });
  }
}