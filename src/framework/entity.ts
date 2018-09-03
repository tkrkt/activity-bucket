import { Identifier } from "./identifier";

export interface Entity<T extends string | number = string> {
  id: Identifier<Entity<T>, T>;
}