import styled from "styled-components";

export const MobileFilterStyle = styled.section`
  max-width: min(1000px, 70%);
  margin: 0 auto;
  padding-top: 16px;
  @media (min-width: 600px) {
    display: none;
  }
`;
