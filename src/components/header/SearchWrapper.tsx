import React from "react";
import * as S from "./Styles";
import searchIcon from "../../assets/images/icons/search.svg";

interface IProps {
  onSearch: (val: string) => void;
}
const SearchWrapper = ({ onSearch }: IProps) => {
  const desktopInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <S.SearchWrapperStyle>
      <input
        type="text"
        ref={desktopInputRef}
        onKeyDown={e =>
          e.key === "Enter" && onSearch(desktopInputRef?.current?.value || "")
        }
      />
      <section onClick={() => onSearch(desktopInputRef?.current?.value || "")}>
        <img src={searchIcon} alt="search" height="24px" />
      </section>
    </S.SearchWrapperStyle>
  );
};

export default SearchWrapper;
