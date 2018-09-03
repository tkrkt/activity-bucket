import uuid from "uuid/v4";
import moment from "moment";
import { Entity } from "../framework/entity";
import { Identifier } from "../framework/identifier";
import { Category } from "./category";

export interface ActivityProps {
  id: Identifier<Activity> | string;
  categoryId: Identifier<Category>;
  comment: string;
  date: string;
  time: string;
}

export class Activity implements ActivityProps, Entity {
  id: Identifier<Activity>;
  categoryId: Identifier<Category>;
  comment: string;
  date: string;
  time: string;

  static fromJSON(json: any): Activity {
    return new Activity({
      ...json,
      categoryId: new Identifier(Category, json.categoryId)
    });
  }

  constructor(props: Partial<ActivityProps> & { categoryId: Identifier<Category> }) {
    if (props.id instanceof Identifier) {
      this.id = props.id;
    } else if (props.id) {
      this.id = new Identifier(Activity, props.id);
    } else {
      this.id = new Identifier(Activity, uuid());
    }

    this.categoryId = props.categoryId;
    this.comment = props.comment || "";
    this.date = props.date || moment().format("YYYY-MM-DD");
    this.time = props.time || moment().format("HH:mm:ss");
  }

  update(props: Partial<ActivityProps>): Activity {
    if ((Object.keys(props) as Array<keyof ActivityProps>).every((key) => this[key] === props[key])) {
      return this;
    } else {
      return new Activity(Object.assign({}, this, props));
    }
  }
}

export const activityComparator = (a1: Activity, a2: Activity): number => {
  if (a1.date < a2.date) {
    return 1;
  } else if (a1.date > a2.date) {
    return -1;
  } else if (a1.time < a2.time) {
    return 1;
  } else if (a1.time > a2.time) {
    return -1;
  } else {
    return 0;
  }
};
