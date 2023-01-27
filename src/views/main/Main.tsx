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

// interface initialState {
//   loading: boolean;
//   error: string;
//   result: {
//     kind: string;
//     etag: string;
//     nextPageToken: string;
//     prevPageToken: string;
//     regionCode: string;
//     pageInfo: {
//       totalResults: number;
//       resultsPerPage: number;
//     };
//     items: videoList[];
//   };
// }

// type videoList = {
//   kind: string;
//   etag: string;
//   id: {
//     kind: string;
//     videoId: string;
//     channelId: string;
//     playlistId: string;
//   };
//   snippet: {
//     publishedAt: Date;
//     channelId: string;
//     title: string;
//     description: string;
//     thumbnails: {
//       ["key"]: {
//         url: string;
//         width: number;
//         height: number;
//       };
//     };
//     channelTitle: string;
//     liveBroadcastContent: string;
//   };
// };

const Main = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [params, setParams] = useState({
    maxResults: 10,
    q: "",
    type: "",
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
    }
    throw Error("Unknown action: " + action.type);
  }

  return (
    <Wrapper>
      <Header params={params} setParams={setParams} />
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
