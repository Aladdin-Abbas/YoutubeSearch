import * as S from "./SpinnerWrapper.style";

const LoadingSpinner = () => {
  return (
    <S.SpinnerWrapper>
      <div className="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </S.SpinnerWrapper>
  );
};

export default LoadingSpinner;
