import { Entity } from "./entity";

export class Identifier<E extends Entity<T>, T extends string | number = string> {
  constructor(public entityClass: {new (...args: any[]): E}, public value: T) {
  }

  equals(i: Identifier<any, any>): boolean {
    if (!i) {
      return false;
    } else if (this.entityClass !== i.entityClass) {
      return false;
    } else {
      return this.value === i.value;
    }
  }

  toJSON() {
    return this.value;
  }

  toString() {
    return `${this.entityClass.name}#${this.value}`;
  }
}