import React, { useEffect } from "react";
import { wrapper } from "configureStore";
import axios from "axios";
import { getUserInfoAction } from "actions/user";
import GoodsExchangeSection from "@sections/MainPage/GoodsExchangeSection";
import MusicChartSection from "@sections/MainPage/MusicChartSection";
import SupportSection from "@sections/MainPage/SupportSection";
import styled from "@emotion/styled";
import GroupVote from "@components/GroupVote";
import NewsArticle from "@components/NewsArticle";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import { noRevalidate, toastErrorMessage, toastSuccessMessage } from "config";
import { useDispatch, useSelector } from "react-redux";
import { mainSlice } from "slices/main";
import { RootState } from "slices";

const MainWrapper = styled.div`
  padding: 2rem;
`;

const index = () => {
  const { data: groupsData, error, revalidate } = useSWR("/group/score", fetcher, noRevalidate);
  const dispatch = useDispatch();
  const { groupVoteDone } = useSelector((state: RootState) => state.main);
  useEffect(() => {
    if (groupVoteDone) {
      toastSuccessMessage("投票ありがとうございます🥰");
      revalidate();
      dispatch(mainSlice.actions.groupVoteClear());
    }
  }, [groupVoteDone]);
  if (error) {
    toastErrorMessage("予想できないエラーが発生しました。");
  }
  return (
    <MainWrapper>
      <GoodsExchangeSection />
      <NewsArticle />
      <MusicChartSection />
      <SupportSection />
      <GroupVote groupsData={groupsData} />
    </MainWrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      await store.dispatch(getUserInfoAction());
      return {
        props: {},
      };
    }
);

export default index;
