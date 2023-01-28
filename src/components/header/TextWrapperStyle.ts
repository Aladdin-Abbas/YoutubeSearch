import styled from "styled-components";

export const TextWrapperStyle = styled.section`
  display: flex;
  align-items: center;
  p {
    width: 70%;
    min-width: 120px;
    color: #fff;
    @media (max-width: 600px) {
      width: 220px;
    }
  }
  @media (min-width: 600px) {
    display: none;
  }
  section {
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    padding: 0 20px;
    border-radius: 0px 4px 4px 0;
    border: 1px solid gray;
    border-left: 0px;
    @media (max-width: 600px) {
      background-color: red;
      max-width: 100%;
      border: 0;
      img {
        filter: brightness(0) invert(1);
      }
    }
  }
`;
