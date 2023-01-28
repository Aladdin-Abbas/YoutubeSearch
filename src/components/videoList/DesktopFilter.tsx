import * as S from "./Styles";
import filterIcon from "../../assets/images/icons/filter.png";
import { subtractDays } from "../../utils/utils";
import { initState } from "../../types/youtubeApiTypes";
import { useState } from "react";

interface IProps {
  state: initState;
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

const DesktopFilter = ({ params, state, setParams }: IProps) => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <S.DesktopFilterStyle>
      <S.FilterWrapper>
        {params.publishedAfter || params.type ? (
          <p>About {state?.result?.pageInfo?.totalResults} filtered results</p>
        ) : (
          <p>About {state?.result?.pageInfo?.totalResults} results</p>
        )}
        <section>
          <img
            src={filterIcon}
            alt="filter"
            height="20px"
            onClick={() => setShowFilter(prevState => !prevState)}
          />
          <span>FILTER</span>
        </section>
      </S.FilterWrapper>
      {showFilter && (
        <section>
          <S.CustomSelectWrapper>
            <S.CustomSelect>
              <select
                name="type"
                id="type"
                onChange={event =>
                  setParams(prevState => ({
                    ...prevState,
                    type: event.target.value,
                    pageToken: "",
                  }))
                }
                value={params.type}
              >
                <option value="">All</option>
                <option value="video">Video</option>
                <option value="channel">Channel</option>
                <option value="playlist">Playlist</option>
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
      )}
    </S.DesktopFilterStyle>
  );
};

export default DesktopFilter;
