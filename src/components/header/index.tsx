import React, { useState } from "react";
import styled from "styled-components";
import ytDesktopIcon from "../../assets/images/icons/header-desktop-icon.svg";
import searchIcon from "../../assets/images/icons/search.svg";
import ytMobileIcon from "../../assets/images/icons/youtube-mobile.jpeg";

interface IProps {
  params: {
    maxResults: number;
    q: string;
    type: string;
    publishedAfter: any;
    pageToken: string;
  };
  setParams: React.Dispatch<
    React.SetStateAction<{
      maxResults: number;
      q: string;
      type: string;
      publishedAfter: any;
      pageToken: string;
    }>
  >;
}

const Header = ({ params, setParams }: IProps) => {
  const [textCase, setTextCase] = useState(true);
  const [mobileSearchTxt, setMobileSearchTxt] = useState("");
  const desktopInputRef = React.useRef<HTMLInputElement>(null);

  const onSearch = (val: string) => {
    setParams(prevSate => ({ ...prevSate, q: val, pageToken: "" }));
  };

  return (
    <Wrapper>
      <section>
        <img src={ytDesktopIcon} alt="youtube" height="20px" />
      </section>
      <img src={ytMobileIcon} alt="youtube" height="40px" />

      <SearchWrapper>
        <input type="text" ref={desktopInputRef} />
        <section
          onClick={() => onSearch(desktopInputRef?.current?.value || "")}
        >
          <img src={searchIcon} alt="search" height="24px" />
        </section>
      </SearchWrapper>

      {textCase ? (
        <TextWrapper>
          <p>{mobileSearchTxt}</p>
          <section onClick={() => setTextCase(prevState => !prevState)}>
            <img src={searchIcon} alt="search" height="24px" />
          </section>
        </TextWrapper>
      ) : (
        <MobileSearchWrapper>
          <input
            type="text"
            value={mobileSearchTxt}
            onChange={e => setMobileSearchTxt(e.target.value)}
          />
          <section
            onClick={() => {
              if (!textCase) {
                onSearch(mobileSearchTxt);
              }
              setTextCase(prevState => !prevState);
            }}
          >
            <img src={searchIcon} alt="search" height="24px" />
          </section>
        </MobileSearchWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
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
  }
`;

const SearchWrapper = styled.section`
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

const MobileSearchWrapper = styled(SearchWrapper)`
  @media (max-width: 600px) {
    display: flex;
  }

  @media (min-width: 600px) {
    display: none;
  }
`;

const TextWrapper = styled.section`
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
export default Header;
