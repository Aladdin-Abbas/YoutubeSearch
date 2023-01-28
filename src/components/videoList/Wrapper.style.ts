import styled from "styled-components";

export const Wrapper = styled.section`
  background-color: #fafafa;
  hr {
    margin-top: 0;
    border-top: 1px solid #f5f5f5;
  }
  > section {
    max-width: min(1000px, 70%);
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    padding-top: 0;
    > section {
      max-width: unset;
    }
  }
  padding-top: 50px;
`;
