import styled from "styled-components";

export const DesktopFilterStyle = styled.section`
  max-width: min(1000px, 70%);
  margin: 0 auto;
  @media (max-width: 600px) {
    display: none;
  }
`;
