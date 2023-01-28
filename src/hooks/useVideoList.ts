import React, { useCallback, useEffect, useRef } from "react";
import youtubeAPI from "../apis/youtubeAPI";
import { ApiResponse, initState } from "../types/youtubeApiTypes";

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

const useVideoList = ({ state, setParams, params, dispatch }: IProps) => {
  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastVideoRef = useCallback(
    (ListItem: any) => {
      if (state.loading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(videos => {
        if (videos[0].isIntersecting && state?.result?.nextPageToken) {
          setParams(prevState => ({
            ...prevState,
            pageToken: state?.result?.nextPageToken,
          }));
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
          `search?part=snippet&key=${import.meta.env.VITE_API_KEY}`,
          {
            params,
            signal: controller.signal,
          }
        );
        const json = (await response.data) as ApiResponse;
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

  return lastVideoRef;
};

export default useVideoList;
