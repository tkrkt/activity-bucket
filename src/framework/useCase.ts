import { Context } from "./context";

export interface UseCase<C extends Context<any, any>> {
  execute(context: C): void;
}