import { getYearDiff } from "../../utils/utils";
import * as S from "./VideoDetailsWrapper.style";
import { videoList } from "../../types/youtubeApiTypes";
import React from "react";

interface IProps {
  el: videoList;
}

const ListItem = React.forwardRef(({ el }: IProps, ref: any) => {
  const videoBody = (
    <>
      <img
        src={el?.snippet?.thumbnails?.medium?.url}
        alt={el?.snippet?.title}
      />
      <section>
        <h1>{el?.snippet?.title}</h1>
        <section>
          <span>{el?.snippet?.channelTitle}</span>
          <span>
            {el?.snippet?.publishedAt
              ? getYearDiff(new Date(el?.snippet?.publishedAt)) + " years"
              : ""}
          </span>
        </section>
        <p>{el?.snippet?.description}</p>
      </section>
    </>
  );

  const content = ref ? (
    <S.VideoDetailsWrapper key={el?.id?.videoId} ref={ref}>
      {videoBody}
    </S.VideoDetailsWrapper>
  ) : (
    <S.VideoDetailsWrapper key={el?.id?.videoId}>
      {videoBody}
    </S.VideoDetailsWrapper>
  );

  return content;
});

export default ListItem;
