import { initState } from "../../types/youtubeApiTypes";
import ListItem from "./ListItem";
import LoadingSpinner from "../LoadingSpinner";
import DesktopFilter from "./DesktopFilter";
import MobileFilter from "./MobileFilter";
import * as S from "./Styles";
import useVideoList from "../../hooks/useVideoList";

interface IProps {
  state: initState;
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
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

const VideoList = ({ state, dispatch, params, setParams }: IProps) => {
  const lastVideoRef = useVideoList({ state, dispatch, params, setParams });

  return (
    <S.Wrapper>
      <DesktopFilter params={params} setParams={setParams} state={state} />
      <MobileFilter params={params} setParams={setParams} />
      <section>
        <hr />
        {state?.error && <p>{state.error}</p>}
        {state?.loading && <LoadingSpinner />}
        {!state?.error &&
          !state?.loading &&
          state?.result?.items?.map((el, i) => {
            const isLastItem = state?.result?.items.length === i + 1;
            if (!isLastItem) {
              return (
                <ListItem
                  key={
                    el?.id?.videoId || el?.id?.playlistId || el?.id?.channelId
                  }
                  el={el}
                />
              );
            }
            return (
              <ListItem
                key={el?.id?.videoId || el?.id?.playlistId || el?.id?.channelId}
                el={el}
                ref={lastVideoRef}
              />
            );
          })}
      </section>
    </S.Wrapper>
  );
};

export default VideoList;
