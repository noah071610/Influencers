import React, { useEffect } from "react";
import { wrapper } from "configureStore";
import axios from "axios";
import { getUserInfoAction } from "actions/user";
import { noRevalidate, toastSuccessMessage } from "config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "slices";
import MomentList from "@sections/MainPage/MomentList";
import MomentPostingForm from "@sections/MainPage/MomentPostingForm";
import { useSWRInfinite } from "swr";
import fetcher from "utils/fetcher";
import { momentSlice } from "slices/moment";
import { useRouter } from "next/router";
import { IMoment } from "@typings/db";
import CountryList from "@components/CountryList";
import MainTopArticleSlide from "@sections/MainPage/MainTopArticleSlide";
import LGLayout from "@layout/LGLayout";

const index = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const {
    data: moments,
    revalidate,
    setSize,
  } = useSWRInfinite<IMoment[]>(
    (index) =>
      `/moment?code=${query?.code || ""}&page=${index + 1}&filter=${query?.filter || ""}&type=${
        query?.type || ""
      }`,
    fetcher,
    noRevalidate
  );

  const { momentCreateDone, momentLikeDone, momentDislikeDone } = useSelector(
    (state: RootState) => state.moment
  );
  useEffect(() => {
    if (momentCreateDone) {
      toastSuccessMessage("게시물을 성공적으로 작성했습니다.");
      dispatch(momentSlice.actions.momentCreateClear());
      revalidate();
    }
  }, [momentCreateDone]);
  useEffect(() => {
    if (momentLikeDone) {
      toastSuccessMessage("좋아요!💓");
      dispatch(momentSlice.actions.momentLikeClear());
      dispatch(getUserInfoAction());
      revalidate();
    }
  }, [momentLikeDone]);

  useEffect(() => {
    if (momentDislikeDone) {
      toastSuccessMessage("좋아요 취소💔");
      dispatch(momentSlice.actions.momentDislikeClear());
      dispatch(getUserInfoAction());
      revalidate();
    }
  }, [momentDislikeDone]);
  return (
    <LGLayout>
      <h2 className="main-title">인기여행지</h2>
      <CountryList slidesPerView={3.2} isMain={true} />
      <h2 className="main-title">인기 급상승 연대기</h2>
      <MainTopArticleSlide />
      <h2 className="main-title">포스팅</h2>
      <MomentPostingForm />
      <div className="test" style={{ overflow: "hidden" }}>
        <MomentList setSize={setSize} moments={moments} />
      </div>
    </LGLayout>
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
