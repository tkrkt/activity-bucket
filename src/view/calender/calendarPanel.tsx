import * as React from "react";
import { AppContext } from "../../store/appContext";
import { CategoryItem } from "./categoryItem";

export class CalendarPanel extends React.Component<{ context: AppContext }, {}> {
  render() {
    const context = this.props.context;

    return (
      <div>
        <CategoryItem key={"CategoryCalendar-all"} context={context} />
        {
          context.repo.category.findAll().map(c => {
            return (
              <CategoryItem key={"CategoryCalendar-" + c.id} context={context} category={c} />
            );
          })
        }
      </div>
    );
  }
}