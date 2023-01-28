import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import filterIcon from "../../assets/images/icons/filter.png";
import youtubeAPI from "../../apis/youtubeAPI";
import { ApiResponse, initState } from "../../types/youtubeApiTypes";
import { subtractDays } from "../../utils/utils";
import ListItem from "./ListItem";
import LoadingSpinner from "../LoadingSpinner";

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
  const [showFilter, setShowFilter] = useState(false);

  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastVideoRef = useCallback(
    (ListItem: any) => {
      if (state.loading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(videos => {
        if (videos[0].isIntersecting && state?.result?.nextPageToken) {
          console.log("We are near the last post!");
          setParams(prevState => ({
            ...prevState,
            pageToken: state?.result?.nextPageToken,
          }));
          console.log(state?.result?.nextPageToken);
        }
      });

      if (ListItem) intObserver.current.observe(ListItem);
    },
    [state.loading, state?.result?.nextPageToken]
  );

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: "Loading", payload: {} });
    const fetchData = async () => {
      try {
        const response = await youtubeAPI.get(
          "search?part=snippet&key=AIzaSyDaeWvgwauLl8pXxMXRJHo3k7BiPIBsXfM",
          {
            params,
            signal: controller.signal,
          }
        );
        const json = (await response.data) as ApiResponse;
        console.log(json);
        params.pageToken
          ? dispatch({ type: "Append_Data_On_Scroll", payload: json })
          : dispatch({ type: "Initial_Fetch_Success", payload: json });
      } catch (error) {
        console.error(error);
        dispatch({ type: "Initial_Fetch_Error", payload: {} });
        return;
      }
    };

    fetchData();
    return () => controller.abort();
  }, [params]);

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
              </CustomSelect>
              <CustomSelect>
                <select
                  name="publishedAfter"
                  id="publishedAfter"
                  onChange={event =>
                    setParams(prevState => ({
                      ...prevState,
                      pageToken: "",
                      publishedAfter:
                        event.target.value === "null"
                          ? null
                          : event.target.value,
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
              </CustomSelect>
            </CustomSelectWrapper>
          </section>
        )}
      </DesktopFilter>
      <MobileFilter>
        <section>
          <CustomSelectWrapper>
            <CustomSelect>
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
                <option value="All">All</option>
                <option value="Video">Video</option>
                <option value="Channel">Channel</option>
                <option value="Playlist">Playlist</option>
              </select>
              <span></span>
            </CustomSelect>
            <CustomSelect>
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
            </CustomSelect>
          </CustomSelectWrapper>
        </section>
      </MobileFilter>
      <section>
        <hr />
        {state?.error && <p>{state.error}</p>}
        {state?.loading && <LoadingSpinner />}
        {!state?.error &&
          !state?.loading &&
          state?.result?.items?.map((el, i) => {
            const isLastItem = state?.result?.items.length === i + 1;
            if (!isLastItem) {
              return <ListItem key={el?.etag} el={el} />;
            }
            return <ListItem key={el?.etag} el={el} ref={lastVideoRef} />;
          })}
      </section>
    </Wrapper>
  );
};

export default VideoList;

const Wrapper = styled.section`
  background-color: #fafafa;
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
