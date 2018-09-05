import * as React from "react";
import { getContext, compose, withProps, onlyUpdateForKeys, shouldUpdate } from "recompose";
import PropTypes from "prop-types";
import { Context } from "../context";

export const connect = <T extends Context<any, any>, OwnProps = {}, StateProps = {}, DispatchProps = {}>(
  mapToProps?: (context: T) => StateProps,
  dispatchToProps?: (dispatch: T["dispatch"]) => DispatchProps,
  { pure }: { pure?: boolean } = {}
): {
  (
    component: React.ComponentType<{context: T} & OwnProps & StateProps & DispatchProps>
  ): React.ComponentClass<OwnProps>
} => {
  const hoc = [];
  hoc.push(getContext<{ context: T }>({ context: PropTypes.any }));

  if (mapToProps) {
    hoc.push(withProps(mapToProps));
  }

  if (dispatchToProps) {
    hoc.push(withProps(({context}: {context: T}) => {
      return dispatchToProps(context.dispatch);
    }));
  }

  if (pure && mapToProps) {
    const keys = Object.keys(mapToProps);
    hoc.push(onlyUpdateForKeys(keys));
  } else if (pure) {
    hoc.push(shouldUpdate(() => false));
  }

  return compose(...hoc);
};