import * as React from "react";
import styled from "styled-components";
import { bind } from "decko";
import { AppContext } from "../../store/appContext";
import { Category } from "../../entity/category";
import { UpdateQuery } from "../../usecase/updateQuery";
import { CategoryQuery, DateQuery } from "../../valueobject/query";
import { CategoryEditHead } from "./categoryEditHead";
import { CategoryViewHead } from "./categoryViewHead";
import { CategoryCalender } from "./categoryCalender";

const Container = styled.div`
  margin-top: 20px;
  &:first-of-type {
    margin-top: 0;
  }
`;

export class CategoryItem extends React.Component<{ context: AppContext, category?: Category }, {}> {
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

    let head: JSX.Element;
    if (context.state.editingCategory
      && category
      && context.state.editingCategory.categoryId.equals(category.id)) {
      head = (
        <CategoryEditHead context={context} />
      );
    } else {
      head = (
        <CategoryViewHead context={context} category={category} />
      );
    }

    return (
      <Container>
        {head}
        <CategoryCalender context={context} category={category} />
      </Container>
    );
  }
}