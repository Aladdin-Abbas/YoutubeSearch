import * as S from "./Styles";
import searchIcon from "../../assets/images/icons/search.svg";
interface IProps {
  mobileSearchTxt: string;
  setTextCase: React.Dispatch<React.SetStateAction<boolean>>;
}

const TextWrapper = ({ mobileSearchTxt, setTextCase }: IProps) => {
  return (
    <S.TextWrapperStyle>
      <p>{mobileSearchTxt}</p>
      <section onClick={() => setTextCase(prevState => !prevState)}>
        <img src={searchIcon} alt="search" height="24px" />
      </section>
    </S.TextWrapperStyle>
  );
};

export default TextWrapper;
