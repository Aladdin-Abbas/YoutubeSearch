import styled from "styled-components";

export const CustomSelect = styled.section`
  width: 140px;
  select {
    appearance: none;
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    &::-ms-expand {
      display: none;
    }
    outline: none;
    grid-area: select;
  }

  min-width: 120px;
  max-width: 120px;
  border: 1px solid #e5e5e5;
  border-radius: 0.25em;
  padding: 0.8em 0.5em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #f8f8f8;

  &::after {
    content: "";
    width: 0.6em;
    height: 0.3em;
    background-color: #777;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    grid-area: select;
    justify-self: end;
  }

  display: grid;
  grid-template-areas: "select";
  align-items: center;

  &:focus {
    & + span {
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      border: 2px solid blue;
      border-radius: inherit;
    }
  }
  position: relative;
`;
