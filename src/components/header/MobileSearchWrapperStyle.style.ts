import styled from "styled-components";
import { SearchWrapperStyle } from "./SearchWrapperStyle.style";

export const MobileSearchWrapper = styled(SearchWrapperStyle)`
  @media (max-width: 600px) {
    display: flex;
  }

  @media (min-width: 600px) {
    display: none;
  }
`;
