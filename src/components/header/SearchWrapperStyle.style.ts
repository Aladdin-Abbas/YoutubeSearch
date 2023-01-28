import styled from "styled-components";

export const SearchWrapperStyle = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  @media (max-width: 600px) {
    justify-content: unset;
    width: unset;
    display: none;
  }

  input {
    height: 35px;
    width: 70%;
    min-width: 120px;
    @media (max-width: 600px) {
      width: 220px;
    }

    /* border-top-right-radius: 0px;
  border-bottom-right-radius: 0px; */
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
    cursor: pointer;
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
