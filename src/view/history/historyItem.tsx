import * as React from "react";
import styled from "styled-components";
import { AppContext } from "../../store/appContext";
import { Activity } from "../../entity/activity";
import { CategoryBadge } from "../component/categoryBadge";
import { hslString } from "../../util/color";
import { bind } from "decko";
import { RemoveActivity } from "../../usecase/removeActivity";
import { UpdateQuery } from "../../usecase/updateQuery";
import { CategoryQuery, DateQuery } from "../../valueobject/query";
import { TextButton } from "../component/textButton";

const DateTime = styled(TextButton)`
  position: absolute;
  top: 8px;
  right: 24px;
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
`;

const CloseButton = styled(TextButton)`
  display: none;
  position: absolute;
  top: 4px;
  right: 4px;
  padding-left: 6px;
  padding-right: 4px;
  padding-bottom: 4px;
  font-size: 20px;
  &:hover {
    text-decoration: none;
  }
`;

const Comment = styled.div`
  padding: 4px;
`;

const Container = styled<{ category: string }, "div">("div")`
  position: relative;
  padding: 8px 12px 2px;
  background-color: ${({ category }) => hslString(category, 30, 97)};
  border-top: 1px solid #ddd;
  &:hover ${CloseButton} {
    display: block;
  }
  &:last-of-type {
    border-bottom: 1px solid #ddd;
  }
`;

export class HistoryItem extends React.Component<{ context: AppContext, activity: Activity }, {}> {
  @bind
  onRemove() {
    const { context, activity } = this.props;
    context.dispatch(new RemoveActivity(activity.id));
  }

  @bind
  onBadgeClick() {
    const { context, activity } = this.props;
    const category = context.repo.category.findById(activity.categoryId);
    if (category) {
      context.dispatch(new UpdateQuery(CategoryQuery.queryString(category.name)));
    }
  }

  @bind
  onDateClick() {
    const { context, activity } = this.props;
    context.dispatch(new UpdateQuery(DateQuery.queryString(activity.date)));
  }

  render() {
    const { context, activity } = this.props;
    const category = context.repo.category.findById(activity.categoryId);

    if (category) {
      return (
        <Container category={category.name}>
          <CategoryBadge title={`show activities of category:${category.name}`} name={category.name} onClick={this.onBadgeClick} />
          <DateTime title={`show activities of date:${activity.date}`} onClick={this.onDateClick}>{activity.date} {activity.time}</DateTime>
          <CloseButton title="delete this activity" onClick={this.onRemove}>×</CloseButton>
          <Comment>{activity.comment}</Comment>
        </Container>
      );
    } else {
      return null;
    }
  }
}