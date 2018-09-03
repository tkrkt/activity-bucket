import uuid from "uuid/v4";
import { Entity } from "../framework/entity";
import { Identifier } from "../framework/identifier";

export interface CategoryProps {
  id: Identifier<Category> | string;
  name: string;
  description: string;
  shorthand: string;
}

export class Category implements CategoryProps, Entity {
  id: Identifier<Category>;
  name: string;
  description: string;
  shorthand: string;

  constructor(props: Partial<CategoryProps>) {
    if (props.id instanceof Identifier) {
      this.id = props.id;
    } else if (props.id) {
      this.id = new Identifier(Category, props.id);
    } else {
      this.id = new Identifier(Category, uuid());
    }

    this.name = props.name || "";
    this.description = props.description || "";
    this.shorthand = props.shorthand || "";
  }

  update(props: Partial<CategoryProps>): Category {
    if ((Object.keys(props) as Array<keyof CategoryProps>).every((key) => this[key] === props[key])) {
      return this;
    } else {
      return new Category(Object.assign({}, this, props));
    }
  }

  leftHandMatch(text: string): boolean {
    if (!text) {
      return false;
    } else if (this.name.startsWith(text)) {
      return true;
    } else if (this.shorthand && this.shorthand.startsWith(text)) {
      return true;
    } else {
      return false;
    }
  }

  perfectMatch(text: string): boolean {
    return text === this.name || text == this.shorthand;
  }
}
