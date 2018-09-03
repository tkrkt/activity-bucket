import * as React from "react";
import styled from "styled-components";
import { AppContext } from "../../store/appContext";
import { bind } from "decko";
import { RemoveCategory } from "../../usecase/removeCategory";
import { UpdateCategoryEditing } from "../../usecase/updateCategoryEditing";
import { CancelCategoryEditing } from "../../usecase/cancelCategoryEditing";
import { SaveCategoryEditing } from "../../usecase/saveCategoryEditing";
import { hslString } from "../../util/color";
import { TextButton } from "../component/textButton";

const FormContainer = styled.form`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  height: 40px;
`;

const CategoryInput = styled<{ name: string }, "input">("input")`
  font-size: 24px;
  width: 200px;
  font-weight: bold;
  border: 0;
  font-family: inherit;
  background-color: #eee;
  padding: 0 5px;
  color: ${({ name }) => name ? hslString(name, 80, 20) : "#444"};
`;

const ShorthandLabel = styled.label`
  margin-left: 10px;
  font-size: 14px;
  color: #999;
`;

const ShorthandInput = styled.input`
  font-size: 14px;
  width: 30px;
  border: 0;
  font-family: inherit;
  background-color: #eee;
  padding: 0 5px;
  text-align: center;
`;

const ControlButton = styled(TextButton)`
  font-size: 20px;
  margin-left: 10px;
`;

export class CategoryEditHead extends React.Component<{ context: AppContext }, {}> {

  @bind
  onSubmit(event: React.FormEvent<any>) {
    event.preventDefault();
    this.onSaveClick();
  }

  @bind
  onNameChange(event: React.FormEvent<HTMLInputElement>) {
    const context = this.props.context;
    const editingCategory = context.state.editingCategory;
    if (editingCategory) {
      context.dispatch(new UpdateCategoryEditing({
        name: event.currentTarget.value,
        shorthand: editingCategory.shorthand
      }));
    }
  }

  @bind
  onShorthandChange(event: React.FormEvent<HTMLInputElement>) {
    const context = this.props.context;
    const editingCategory = context.state.editingCategory;
    if (editingCategory) {
      context.dispatch(new UpdateCategoryEditing({
        name: editingCategory.name,
        shorthand: event.currentTarget.value
      }));
    }
  }

  @bind
  onDeleteClick() {
    const context = this.props.context;
    const editingCategory = context.state.editingCategory;
    if (editingCategory) {
      if (window.confirm("Are you sure to delete this category and its activities?")) {
        context.dispatch(new RemoveCategory(editingCategory.categoryId));
      } else {
        context.dispatch(new CancelCategoryEditing());
      }
    }
  }

  @bind
  onCancelClick() {
    const context = this.props.context;
    context.dispatch(new CancelCategoryEditing());
  }

  @bind
  onSaveClick() {
    const context = this.props.context;
    const editingCategory = context.state.editingCategory;
    if (!editingCategory || !editingCategory.error) {
      context.dispatch(new SaveCategoryEditing());
    }
  }

  render() {
    const context = this.props.context;
    const editingCategory = context.state.editingCategory;

    if (editingCategory) {
      return (
        <FormContainer onSubmit={this.onSubmit}>
          <div>
            <CategoryInput name={editingCategory.name.trim()} placeholder="category" value={editingCategory.name} onChange={this.onNameChange} />
            <label>
              <ShorthandLabel>Shorthand:</ShorthandLabel>
              <ShorthandInput value={editingCategory.shorthand} onChange={this.onShorthandChange} />
            </label>
          </div>
          <div>
            <ControlButton onClick={this.onDeleteClick}>Delete</ControlButton>
            <ControlButton onClick={this.onCancelClick}>Cancel</ControlButton>
            <ControlButton onClick={this.onSaveClick} disabled={!!editingCategory.error}>Save</ControlButton>
          </div>
        </FormContainer>
      );
    } else {
      return null;
    }
  }
}