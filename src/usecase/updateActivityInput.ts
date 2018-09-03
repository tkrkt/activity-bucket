import { UseCase } from "../framework/useCase";
import { AppContext } from "../store/appContext";
import { parseActivityInput } from "../service/parseActivityInput";

export class UpdateInput implements UseCase<AppContext> {
  constructor(private text: string) { }

  execute(context: AppContext) {
    context.setState({
      input: {
        ...context.state.input,
        ...parseActivityInput(context.repo.category, this.text),
        text: this.text,
        showError: false
      }
    });
  }
}