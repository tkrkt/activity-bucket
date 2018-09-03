import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./view/app";
import { AppContext } from "./store/appContext";
import { CategoryRepository } from "./repository/categoryRepository";
import { ActivityRepository } from "./repository/activityRepository";
import { initialState } from "./store/state";

const container = document.getElementById("app");

const context = new AppContext(render, {
  category: new CategoryRepository(),
  activity: new ActivityRepository()
}, initialState);

if (process.env.NODE_ENV !== "production") {
  (window as any)["context"] = context;
  context.debug = true;
}

function render() {
  return new Promise(resolve => {
    ReactDOM.render(<App context={context} />, container, resolve);
  });
};

render();
context.ready().then(render);