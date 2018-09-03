import * as React from "react";
import styled from "styled-components";
import { hslString } from "../../util/color";

const Container = styled<{ name: string, onClick?: () => void }, "span">("span")`
  color: white;
  background-color: ${({ name }) => hslString(name, 50, 30)};
  padding: 4px 6px;
  border-radius: 4px;
  margin-right: 6px;
  ${({ onClick }) => onClick && "cursor: pointer"}
`;

export const CategoryBadge = (props: {
  name: string;
  shorthand?: string;
  title?: string;
  onClick?: () => void;
}) => {
  return (
    <Container name={props.name} onClick={props.onClick} title={props.title}>{props.name}{props.shorthand ? ` (${props.shorthand})` : ""}</Container>
  );
};