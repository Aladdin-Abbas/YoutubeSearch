import styled from "styled-components";

export const Wrapper = styled.section`
  max-width: min(1000px, 70%);
  min-width: 320px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap: 20px;
  section {
    &:first-child {
      position: relative;
      &::after {
        position: absolute;
        z-index: 10;
        content: "EG";
        top: 0%;
        right: 0%;
        transform: translateX(100%) translateY(-40%);
        font-size: 14px;
        color: #a2a2a2;
      }
      @media (max-width: 600px) {
        display: none;
      }
    }
  }
  > img {
    @media (min-width: 600px) {
      display: none;
    }
  }

  @media (max-width: 600px) {
    background-color: red;
    max-width: 100%;
    position: unset;
  }

  /* position: fixed; */
  /* width: 100%; */
`;
