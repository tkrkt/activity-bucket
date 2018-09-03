import * as React from "react";
import { AppContext } from "../../store/appContext";
import { QueryInput } from "./queryInput";
import { HistoryItem } from "./historyItem";
import { activityComparator, Activity } from "../../entity/activity";

export class HistoryPanel extends React.Component<{ context: AppContext }, {}> {
  render() {
    const { context } = this.props;
    const { query } = context.state;
    return (
      <div>
        <QueryInput context={context} />
        {
          context.repo.activity.findAll()
            .filter((a: Activity) => query.queries.every(q => q.match(a)))
            .sort(activityComparator)
            .map(a => {
              return (
                <HistoryItem key={"HistoryItem-" + a.id} context={context} activity={a} />
              );
            })
        }
      </div>
    );
  }
}