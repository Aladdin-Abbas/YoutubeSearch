import { useReducer, useState } from "react";
import styled from "styled-components";
import Header from "../../components/header";
import VideoList from "../../components/videoList";
import { initState } from "../../types/youtubeApiTypes";

const initialState = {
  loading: true,
  error: "",
  result: {
    kind: "",
    etag: "",
    nextPageToken: "",
    prevPageToken: "",
    regionCode: "",
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0,
    },
    items: [
      {
        kind: "",
        etag: "",
        id: {
          kind: "",
          videoId: "",
          channelId: "",
          playlistId: "",
        },
        snippet: {
          publishedAt: new Date(),
          channelId: "",
          title: "",
          description: "",
          thumbnails: {
            0: {
              url: "",
              width: 0,
              height: 0,
            },
          },
          channelTitle: "",
          liveBroadcastContent: "",
        },
      },
    ],
  },
};

const Main = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [params, setParams] = useState({
    maxResults: 5,
    q: "",
    type: "",
    publishedAfter: null,
    pageToken: "",
  });

  function reducer(state: initState, action: { type: string; payload?: any }) {
    switch (action.type) {
      case "Initial_Fetch_Success": {
        return {
          loading: false,
          error: "",
          result: action.payload,
        };
      }
      case "Initial_Fetch_Error": {
        return {
          loading: false,
          error: "Something went wrong!",
          result: {},
        };
      }
      case "Append_Data_On_Scroll": {
        if (state?.result?.items[0]?.kind) {
          return {
            loading: false,
            error: "",
            result: {
              ...state.result,
              ...action.payload,
              items: [
                ...new Set([...state.result.items, ...action.payload.items]),
              ],
            },
          };
        } else {
          return {
            loading: false,
            error: "",
            result: action.payload,
          };
        }
      }
      case "Loading": {
        return { ...state, loading: true, error: "" };
      }
    }
    throw Error("Unknown action: " + action.type);
  }

  return (
    <Wrapper>
      <Header setParams={setParams} />
      <VideoList
        state={state}
        dispatch={dispatch}
        params={params}
        setParams={setParams}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 100%;
`;

export default Main;
