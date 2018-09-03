import * as React from "react";
import styled from "styled-components";
import { bind } from "decko";
import { AppContext } from "../../store/appContext";
import { UpdateQuery } from "../../usecase/updateQuery";
import { ClearQuery } from "../../usecase/clearQuery";
import { StartCategoryEditing } from "../../usecase/startCategoryEditing";
import { hslString } from "../../util/color";
import { Category } from "../../entity/category";
import { CategoryQuery } from "../../valueobject/query";
import { TextButton } from "../component/textButton";

const Head = styled<{ name?: string }, "h2">("h2")`
  display: inline-block;
  cursor: pointer;
  color: ${({ name }) => name ? hslString(name, 80, 20) : "#444"};
  font-size: 24px;
  &:hover {
    text-decoration: underline;
  }
`;

const Shorthand = styled.span`
  margin-left: 10px;
  color: #999;
  cursor: default;
`;

const EditButton = styled(TextButton)`
  display: none;
  position: absolute;
  right: 0;
  bottom: 10px;
  font-size: 20px;
`;

const Container = styled.div`
  position: relative;
  height: 40px;
  &:hover ${EditButton} {
    display: block;
  }
`;

export class CategoryViewHead extends React.Component<{ context: AppContext, category?: Category }, {}> {
  @bind
  onFilterClick() {
    const { context, category } = this.props;
    if (category) {
      context.dispatch(new UpdateQuery(CategoryQuery.queryString(category.name)));
    } else {
      context.dispatch(new ClearQuery());
    }
  }

  @bind
  onEditClick() {
    const { context, category } = this.props;
    if (category) {
      context.dispatch(new StartCategoryEditing(category));
    }
  }

  render() {
    const { category } = this.props;
    if (category) {
      return (
        <Container>
          <Head title={`show activities of category:${category.name}`} name={category.name} onClick={this.onFilterClick}>{category.name}</Head>
          {category.shorthand && <Shorthand title="shorthand">({category.shorthand})</Shorthand>}
          <EditButton onClick={this.onEditClick}>Edit</EditButton>
        </Container>
      );
    } else {
      return (
        <Container>
          <Head title="show all activities" onClick={this.onFilterClick}>All activities</Head>
        </Container>
      );
    }
  }
}