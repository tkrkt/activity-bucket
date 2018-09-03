import * as React from "react";
import styled from "styled-components";
import { AppContext } from "../store/appContext";
import { ActivityInput } from "./activityInput/activityInput";
import { CalendarPanel } from "./calender/calendarPanel";
import { HistoryPanel } from "./history/historyPanel";

const AppLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 60%) minmax(200px, 40%);
  grid-template-rows: 104px 1fr;
`;

const ActivityInputLayout = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  padding: 20px 32px 0;
`;

const CalendarLayout = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  overflow-y: auto;
  padding: 20px 32px;
`;

const HistoryLayout = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  background-color: #f5f5f5;
  border-left: 1px solid #ddd;
  overflow-y: auto;
`;

export class App extends React.Component<{ context: AppContext }, {}> {
  render() {
    const context = this.props.context;

    return (
      <AppLayout className="root">
        <ActivityInputLayout>
          <ActivityInput context={context} />
        </ActivityInputLayout>
        <CalendarLayout>
          <CalendarPanel context={context} />
        </CalendarLayout>
        <HistoryLayout>
          <HistoryPanel context={context} />
        </HistoryLayout>
      </AppLayout>
    );
  }
}