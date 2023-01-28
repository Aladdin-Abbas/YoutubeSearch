import React from "react";
import { subtractDays } from "../../utils/utils";
import * as S from "./Styles";

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

const MobileFilter = ({ params, setParams }: IProps) => {
  return (
    <S.MobileFilterStyle>
      <section>
        <S.CustomSelectWrapper>
          <S.CustomSelect>
            <select
              name="type"
              id="type"
              onChange={event =>
                setParams(prevState => ({
                  ...prevState,
                  pageToken: "",
                  type: event.target.value,
                }))
              }
              value={params.type}
            >
              <option value="">All</option>
              <option value="Video">Video</option>
              <option value="Channel">Channel</option>
              <option value="Playlist">Playlist</option>
            </select>
            <span></span>
          </S.CustomSelect>
          <S.CustomSelect>
            <select
              name="publishedAfter"
              id="publishedAfter"
              onChange={event =>
                setParams(prevState => ({
                  ...prevState,
                  pageToken: "",
                  publishedAfter:
                    event.target.value === "null" ? null : event.target.value,
                }))
              }
              value={params.publishedAfter}
            >
              <option value={subtractDays(365 * 3)}>Any time</option>
              <option value={subtractDays(1)}>Today</option>
              <option value={subtractDays(7)}>This week</option>
              <option value={subtractDays(30)}>This month</option>
              <option value={subtractDays(365)}>This year</option>
            </select>
            <span></span>
          </S.CustomSelect>
        </S.CustomSelectWrapper>
      </section>
    </S.MobileFilterStyle>
  );
};

export default MobileFilter;
