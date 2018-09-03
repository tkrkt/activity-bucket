import { Repository } from "./repository";
import { UseCase } from "./useCase";
import { bind } from "decko";
import { Entity } from "./entity";
import { Identifier } from "./identifier";

export class Context<Repo extends { [key: string]: Repository<any> }, State> {
  debug = false;
  private updateCounter: number;
  private repoArray: Array<Repository<any>>;
  private repoMap: Map<{ new(...args: any[]): Entity }, Repository<Entity>>;

  constructor(
    private renderer: () => Promise<any>,
    public repo: Repo,
    public state: State
  ) {
    this.updateCounter = 0;
    this.repoArray = Object.keys(this.repo).map(key => this.repo[key]);
    this.repoMap = new Map();

    this.repoArray.forEach(r => {
      r.addHandler(this.onRepositoryChange);
      this.repoMap.set(r.entityClass, r);
    });
  }

  ready() {
    return Promise.all(this.repoArray.map(r => r.ready()));
  }

  private update(runner?: () => void) {
    this.updateCounter++;
    runner && runner();
    this.updateCounter--;

    if (this.updateCounter === 0) {
      this.triggerRenderer();
    }
  }

  private triggerRenderer() {
    this.repoArray.forEach(r => r.onRenderStart());
    this.renderer().then(() => {
      let needsRendering = false;
      this.repoArray.forEach(r => {
        needsRendering = r.onRenderEnd() || needsRendering;
      });
      if (needsRendering) {
        this.triggerRenderer();
      }
    });
  }

  findById<T extends Entity>(id: Identifier<T>): T | undefined {
    const repo = this.repoMap.get(id.entityClass);
    if (repo) {
      return repo.findById(id) as T;
    } else {
      return void 0;
    }
  }

  save(e: Entity) {
    const repo = this.repoMap.get(e.id.entityClass);
    if (repo) {
      return repo.save(e);
    } else {
      return void 0;
    }
  }

  dispatch(useCase: UseCase<this>) {
    this.update(() => {
      this.debug && console.log(useCase.constructor.name, useCase);
      useCase.execute(this);
    });
  }

  setState(state: Partial<State>) {
    this.update(() => {
      this.debug && console.log("State updated", state);
      Object.assign(this.state, state);
    });
  }

  @bind
  onRepositoryChange() {
    this.update();
  }
}