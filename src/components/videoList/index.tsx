import { useEffect, useState } from "react";
import styled from "styled-components";
import filterIcon from "../../assets/images/icons/filter.png";
import youtubeAPI from "../../apis/youtubeAPI";
import { ApiResponse, initState } from "../../types/youtubeApiTypes";
import { getYearDiff } from "../../utils/utils";
interface IProps {
  state: initState;
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
}

const VideoList = ({ state, dispatch }: IProps) => {
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await youtubeAPI.get(
          "search?part=snippet&key=AIzaSyBMxc3zON1lj_BClfxjkOfQZISaBV-oVfU",
          {
            params: { maxResults: 10 },
            signal: controller.signal,
          }
        );
        const json = (await response.data) as ApiResponse;
        console.log(json);
        dispatch({ type: "Initial_Fetch_Success", payload: json });
        // setData(json.Search);
        // setRowCount(json.totalResults);
      } catch (error) {
        // setIsError(true);
        console.error(error);
        dispatch({ type: "Initial_Fetch_Error", payload: {} });
        return;
      }
      //   setIsError(false);
      //   setIsLoading(false);
      //   setIsRefetching(false);
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return (
    <Wrapper>
      <DesktopFilter>
        <FilterWrapper>
          <p>About 13,000,000 filtered results</p>
          <section>
            <img
              src={filterIcon}
              alt="filter"
              height="20px"
              onClick={() => setShowFilter(prevState => !prevState)}
            />
            <span>FILTER</span>
          </section>
        </FilterWrapper>
        {showFilter && (
          <section>
            <CustomSelectWrapper>
              <CustomSelect>
                <select name="type" id="type">
                  <option value="All">All</option>
                  <option value="Video">Video</option>
                  <option value="Channel">Channel</option>
                  <option value="Playlist">Playlist</option>
                  <option value="Movie">Movie</option>
                </select>
                <span></span>
              </CustomSelect>
              <CustomSelect>
                <select name="uploadDate" id="uploadDate">
                  <option value="AnyTime">Any time</option>
                  <option value="Today">Today</option>
                  <option value="ThisWeek">This week</option>
                  <option value="ThisMonth">This month</option>
                  <option value="ThisYear">This year</option>
                </select>
                <span></span>
              </CustomSelect>
            </CustomSelectWrapper>
          </section>
        )}
      </DesktopFilter>
      <MobileFilter>
        <section>
          <CustomSelectWrapper>
            <CustomSelect>
              <select name="type" id="type">
                <option value="All">All</option>
                <option value="Video">Video</option>
                <option value="Channel">Channel</option>
                <option value="Playlist">Playlist</option>
                <option value="Movie">Movie</option>
              </select>
              <span></span>
            </CustomSelect>
            <CustomSelect>
              <select name="uploadDate" id="uploadDate">
                <option value="AnyTime">Any time</option>
                <option value="Today">Today</option>
                <option value="ThisWeek">This week</option>
                <option value="ThisMonth">This month</option>
                <option value="ThisYear">This year</option>
              </select>
              <span></span>
            </CustomSelect>
          </CustomSelectWrapper>
        </section>
      </MobileFilter>
      <section>
        <hr />
        {state &&
          state?.result?.items?.length > 0 &&
          state?.result?.items.map(el => (
            <VideoDetailsWrapper key={el?.id?.videoId}>
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
                      ? getYearDiff(new Date(el?.snippet?.publishedAt)) +
                        " years"
                      : ""}
                  </span>
                </section>
                <p>{el?.snippet?.description}</p>
              </section>
            </VideoDetailsWrapper>
          ))}
      </section>
    </Wrapper>
  );
};

export default VideoList;

const Wrapper = styled.section`
  background-color: #fafafa;
  /* height: calc(100% - 56px); */
  hr {
    margin-top: 0;
    border-top: 1px solid #f5f5f5;
  }
  > section {
    max-width: min(1000px, 70%);
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    > section {
      max-width: unset;
      /* margin: unset; */
    }
  }
`;

const FilterWrapper = styled.section`
  display: flex;
  align-items: center;
  padding-top: 16px;
  p {
    flex: 1;
  }
  section {
    display: flex;
    align-items: center;
    gap: 12px;
    img {
      cursor: pointer;
    }
    color: #9d8e9a;
  }
`;

const CustomSelectWrapper = styled.div`
  display: flex;
  width: 300px;
  /* margin-right: auto; */
  margin-bottom: 12px;
  @media (max-width: 600px) {
    margin: 0 auto 12px;
  }
`;

const DesktopFilter = styled.section`
  max-width: min(1000px, 70%);
  margin: 0 auto;
  @media (max-width: 600px) {
    display: none;
  }
`;

const MobileFilter = styled.section`
  max-width: min(1000px, 70%);
  margin: 0 auto;
  padding-top: 16px;
  @media (min-width: 600px) {
    display: none;
  }
`;

const CustomSelect = styled.section`
  width: 140px;
  select {
    appearance: none;
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    &::-ms-expand {
      display: none;
    }
    outline: none;
    grid-area: select;
  }

  min-width: 120px;
  max-width: 120px;
  border: 1px solid #e5e5e5;
  border-radius: 0.25em;
  padding: 0.8em 0.5em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #f8f8f8;

  &::after {
    content: "";
    width: 0.6em;
    height: 0.3em;
    background-color: #777;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    grid-area: select;
    justify-self: end;
  }

  display: grid;
  grid-template-areas: "select";
  align-items: center;

  &:focus {
    & + span {
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      border: 2px solid blue;
      border-radius: inherit;
    }
  }
  position: relative;
`;

const VideoDetailsWrapper = styled.section`
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
  gap: 12px;
  img {
    flex-basis: 40%;
  }
  section {
    flex-basis: 60%;
  }
  h1 {
    margin: 0;
    font-size: 18px;
  }
  span {
    margin-right: 12px;
  }

  @media (max-width: 600px) {
    width: 320px;
    margin: 0 auto 20px;
    img {
      max-width: 180px;
    }
    section {
      max-width: 120px;
    }
    p {
      display: none;
    }
  }
`;
