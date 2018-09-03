import { Entity } from "./entity";
import { Identifier } from "./identifier";

export abstract class Repository<T extends Entity> {
  updated: boolean;
  needsRendering: boolean;
  handlers: Array<() => void>;

  constructor(
    public entityClass: { new(...args: any[]): T },
    protected items: { [id: string]: T } = {}
  ) {
    this.updated = false;
    this.needsRendering = false;
    this.handlers = [];
  }

  addHandler(handler: () => void) {
    this.handlers.push(handler);
  }

  removeHandler(handler: () => void) {
    this.handlers = this.handlers.filter(h => h === handler);
  }

  private triggerHandlers() {
    this.handlers.forEach(h => h());
  }

  findById(id: Identifier<T>): T | undefined {
    return this.items[id.value];
  }

  findByIds(ids: Array<Identifier<T>>): Array<T | undefined> {
    return ids.map(id => this.findById(id));
  }

  findAll(): T[] {
    return Object.values(this.items);
  }

  save(t: T) {
    this.items[t.id.value] = t;
    this.updated = true;
    this.needsRendering = true;
    this.triggerHandlers();
  }

  remove(id: Identifier<T>) {
    delete this.items[id.value];
    this.updated = true;
    this.needsRendering = true;
    this.triggerHandlers();
  }

  onRenderStart(): boolean {
    this.needsRendering = false;
    return this.updated;
  }

  onRenderEnd(): boolean {
    if (!this.needsRendering) {
      this.updated = false;
    }
    return this.needsRendering;
  }

  abstract async ready(): Promise<any>;
}