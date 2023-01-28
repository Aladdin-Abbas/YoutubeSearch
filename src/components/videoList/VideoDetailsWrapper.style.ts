import styled from "styled-components";

export const VideoDetailsWrapper = styled.section`
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
  gap: 12px;
  img {
    flex-basis: 40%;
  }
  section {
    flex-basis: 60%;
  }
  h1 {
    margin: 0;
    font-size: 18px;
  }
  span {
    margin-right: 12px;
  }

  @media (max-width: 600px) {
    width: 320px;
    margin: 0 auto 20px;
    img {
      max-width: 180px;
    }
    section {
      max-width: 120px;
    }
    p {
      display: none;
    }
  }
`;
