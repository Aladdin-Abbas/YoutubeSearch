import * as S from "./Styles";
import searchIcon from "../../assets/images/icons/search.svg";
interface IProps {
  mobileSearchTxt: string;
  setTextCase: React.Dispatch<React.SetStateAction<boolean>>;
  textCase: boolean;
  onSearch: (val: string) => void;
  setMobileSearchTxt: React.Dispatch<React.SetStateAction<string>>;
}

const MobileSearchWrapper = ({
  mobileSearchTxt,
  setTextCase,
  setMobileSearchTxt,
  onSearch,
  textCase,
}: IProps) => {
  return (
    <S.MobileSearchWrapper>
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
    </S.MobileSearchWrapper>
  );
};

export default MobileSearchWrapper;
