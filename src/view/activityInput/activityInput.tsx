import * as React from "react";
import styled from "styled-components";
import { bind } from "decko";
import { AppContext } from "../../store/appContext";
import { UpdateInput } from "../../usecase/updateActivityInput";
import { SubmitInput } from "../../usecase/submitActivity";
import { hslString } from "../../util/color";
import { CategoryBadge } from "../component/categoryBadge";
import { Category } from "../../entity/category";

const fontSize = "36px";
const buttonWidth = "80px";
const borderRadius = "6px";

const TextInput = styled.input`
  width: calc(100% - ${buttonWidth});
  font-size: ${fontSize};
  padding: 5px 20px;
  border: 1px solid #cacaca;
  border-top-left-radius: ${borderRadius};
  border-bottom-left-radius: ${borderRadius};
  &:focus {
    outline: 0;
  }
`;

const AddButton = styled<{ submittable: boolean; categoryName?: string; }, "input">("input")`
  width: ${buttonWidth};
  font-size: ${fontSize};
  background-color: ${({ submittable, categoryName }) => {
    if (submittable && categoryName) {
      return hslString(categoryName, 50, 60);
    } else {
      return "#dcdcdc";
    }
  }};
  cursor: ${({ submittable }) => {
    if (submittable) {
      return "pointer";
    } else {
      return null;
    }
  }};
  padding: 5px 0;
  border: 1px solid #cacaca;
  border-left-width: 0;
  border-top-right-radius: ${borderRadius};
  border-bottom-right-radius: ${borderRadius};

  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: ${({ submittable, categoryName }) => {
    if (submittable && categoryName) {
      return hslString(categoryName, 50, 55);
    } else {
      return null;
    }
  }};
  }
  &:active {
    background-color: ${({ submittable, categoryName }) => {
    if (submittable && categoryName) {
      return hslString(categoryName, 50, 50);
    } else {
      return null;
    }
  }};
  }
`;

const HintBox = styled.div`
  position: absolute;
  left: 12px;
  bottom: 3px;
  color: #6b6b6b;
  font-size: 14px;
`;

const ErrorBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 3px;
  color: #a00;
  font-size: 14px;
`;

const FormContainer = styled.form`
  position: relative;
  height: 100%;
`;

export class ActivityInput extends React.Component<{ context: AppContext }, { text: string }> {
  @bind
  onSubmit(event: React.FormEvent<any>) {
    event.preventDefault();
    const context = this.props.context;
    context.dispatch(new SubmitInput());
  }

  @bind
  onInput(event: React.FormEvent<HTMLInputElement>) {
    const context = this.props.context;
    context.dispatch(new UpdateInput(event.currentTarget.value));
  }

  render() {
    const { context } = this.props;
    const { input } = context.state;

    let hintBox: JSX.Element | undefined;
    let categoryName: string | undefined;
    const matches = context.repo.category.findByIds(input.matchedCategories).filter((id: any) => id) as Category[];
    if (matches.length) {
      hintBox = (
        <HintBox>
          <span>category: </span>
          {matches.map(c => {
            return (
              <CategoryBadge key={"match-" + c.id} name={c.name} shorthand={c.shorthand} />
            );
          })}
        </HintBox>
      );
      if (matches.length === 1) {
        categoryName = matches[0].name;
      }
    } else if (input.categoryText.length) {
      hintBox = (
        <HintBox>
          <span>new category: </span>
          <CategoryBadge name={input.categoryText} />
        </HintBox>
      );
      categoryName = input.categoryText;
    }

    let errorBox: JSX.Element | undefined;
    if (input.showError && input.error) {
      errorBox = (
        <ErrorBox>{input.error.message}</ErrorBox>
      );
    }

    return (
      <FormContainer onSubmit={this.onSubmit}>
        <div>
          <TextInput type="text" value={input.text} onInput={this.onInput} placeholder="input `category comment`" />
          <AddButton type="submit" value="+" submittable={!input.error} categoryName={categoryName} />
        </div>
        {hintBox}
        {errorBox}
      </FormContainer>
    );
  }
}