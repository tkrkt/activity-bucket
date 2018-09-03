import * as React from "react";
import CalendarHeatmap from 'react-calendar-heatmap';
import { AppContext } from "../../store/appContext";
import { bind } from "decko";
import { UpdateQuery } from "../../usecase/updateQuery";
import { colorByCount } from "../../util/color";
import { DateQuery, CategoryQuery } from "../../valueobject/query";
import { Category } from "../../entity/category";

export class CategoryCalender extends React.Component<{ context: AppContext, category?: Category }, {}> {
  @bind
  onDateClick(event?: { date: string }) {
    if (event) {
      const { context, category } = this.props;
      const dateQuery = DateQuery.queryString(event.date);
      if (category) {
        context.dispatch(new UpdateQuery(CategoryQuery.queryString(category.name) + " " + dateQuery));
      } else {
        context.dispatch(new UpdateQuery(dateQuery));
      }
    }
  }

  render() {
    const { context, category } = this.props;
    const valueMap = context.repo.activity.findAll().reduce((acc, a) => {
      if (!category || a.categoryId === category.id) {
        acc[a.date] = (acc[a.date] || 0) + 1;
      }
      return acc;
    }, {} as { [key: string]: number });

    const valueList = Object.keys(valueMap).map(date => {
      return { date, count: valueMap[date] };
    });

    return (
      <CalendarHeatmap
        values={valueList}
        titleForValue={value => {
          if (value && value.count) {
            return `${value.count} ${value.count > 1 ? "activity" : "activities"} (${value.date})`;
          } else {
            return null;
          }
        }}
        tooltipDataAttrs={(event: any) => {
          if (event.count) {
            if (category) {
              return { style: { fill: colorByCount(category.name, event.count as number) } };
            } else {
              return { style: { fill: colorByCount(undefined, event.count as number) } };
            }
          } else {
            return null;
          }
        }}
        onClick={this.onDateClick}
      />
    );
  }
}