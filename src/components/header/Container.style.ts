import styled from "styled-components";

export const Container = styled.section`
  height: 56px;
  position: fixed;
  @media (max-width: 600px) {
    position: unset;
  }
  width: 100%;
  background-color: white;
`;
