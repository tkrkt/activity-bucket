import * as React from "react";
import styled from "styled-components";
import { bind } from "decko";
import { AppContext } from "../../store/appContext";
import { UpdateQuery } from "../../usecase/updateQuery";
import { ClearQuery } from "../../usecase/clearQuery";

const fontSize = "18px";
const buttonWidth = "48px";
const borderRadius = "4px";

const TextInput = styled.input`
  width: calc(100% - ${buttonWidth});
  font-size: ${fontSize};
  padding: 4px 8px;
  border: 1px solid #cacaca;
  border-top-left-radius: ${borderRadius};
  border-bottom-left-radius: ${borderRadius};
  &:focus {
    outline: 0;
  }
`;

const ClearButton = styled.button`
  width: ${buttonWidth};
  font-size: ${fontSize};
  background-color: white;
  cursor: pointer;
  padding: 4px 0;
  border: 1px solid #cacaca;
  border-left-width: 0;
  border-top-right-radius: ${borderRadius};
  border-bottom-right-radius: ${borderRadius};

  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: #eee;
  }
  &:active {
    background-color: #ddd;
  }
`;

const Container = styled.div`
  padding: 8px;
`;

export class QueryInput extends React.Component<{ context: AppContext }, { text: string }> {
  @bind
  onInput(event: React.FormEvent<HTMLInputElement>) {
    const context = this.props.context;
    context.dispatch(new UpdateQuery(event.currentTarget.value));
  }

  @bind
  onClear() {
    const context = this.props.context;
    context.dispatch(new ClearQuery());
  }

  render() {
    const { context } = this.props;
    const { query } = context.state;

    return (
      <Container>
        <TextInput type="text" value={query.text} onChange={this.onInput} placeholder="search" />
        <ClearButton onClick={this.onClear}>×</ClearButton>
      </Container>
    );
  }
}