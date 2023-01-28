import React, { useState } from "react";
import ytDesktopIcon from "../../assets/images/icons/header-desktop-icon.svg";
import ytMobileIcon from "../../assets/images/icons/youtube-mobile.jpeg";
import SearchWrapper from "./SearchWrapper";
import TextWrapper from "./TextWrapper";
import MobileSearchWrapper from "./MobileSearchWrapper";
import * as S from "./Styles";

interface IProps {
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

const Header = ({ setParams }: IProps) => {
  const [textCase, setTextCase] = useState(true);
  const [mobileSearchTxt, setMobileSearchTxt] = useState("");

  const onSearch = (val: string) => {
    setParams(prevSate => ({ ...prevSate, q: val, pageToken: "" }));
  };

  return (
    <S.Container>
      <S.Wrapper>
        <section>
          <img src={ytDesktopIcon} alt="youtube" height="20px" />
        </section>
        <img src={ytMobileIcon} alt="youtube" height="40px" />

        <SearchWrapper onSearch={onSearch} />

        {textCase ? (
          <TextWrapper
            mobileSearchTxt={mobileSearchTxt}
            setTextCase={setTextCase}
          />
        ) : (
          <MobileSearchWrapper
            mobileSearchTxt={mobileSearchTxt}
            setTextCase={setTextCase}
            textCase={textCase}
            onSearch={onSearch}
            setMobileSearchTxt={setMobileSearchTxt}
          />
        )}
      </S.Wrapper>
    </S.Container>
  );
};

export default Header;
