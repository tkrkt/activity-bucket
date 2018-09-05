import * as React from "react";
import { bind } from "decko";
import { Context } from "../context";
import { UseCase } from "../useCase";

export class BaseComponent<C extends Context<any, any>, P={}, S={}> extends React.Component<(P & { context: C }), S> {
  get repo(): C["repo"] {
    return this.props.context.repo;
  }

  get store(): C["state"] {
    return this.props.context.state;
  }

  get findById(): C["findById"] {
    return this.props.context.findById;
  }

  @bind
  dispatch(useCase: UseCase<any>) {
    this.props.context.dispatch(useCase);
  }
}