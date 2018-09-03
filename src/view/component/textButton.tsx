import styled from "styled-components";

export const TextButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ccc;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
  &:hover {
    color: #777;
    text-decoration: underline;
  }
  &:active {
    color: #555;
  }
`;