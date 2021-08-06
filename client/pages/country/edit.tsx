import React, { FC, useEffect } from "react";
import { noRevalidate, toastSuccessMessage } from "config";
import router, { useRouter } from "next/router";
import LGLayout from "@layout/LGLayout";
import MomentPostingForm from "@sections/MainPage/MomentPostingForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "slices";
import { wrapper } from "configureStore";
import axios from "axios";
import { getUserInfoAction } from "actions/user";
import fetcher from "utils/fetcher";
import { IMoment } from "@typings/db";
import useSWR from "swr";

interface IProps {
  initialMoment: IMoment;
}

const edit: FC<IProps> = ({ initialMoment }) => {
  const { query } = useRouter();
  const { user } = useSelector((state: RootState) => state.user);
  const { data: moment } = useSWR<IMoment>(`/moment/${query?.code}/${query?.momentId}/0`, fetcher, {
    initialData: initialMoment,
    ...noRevalidate,
  });

  useEffect(() => {
    if (!user) {
      router.back();
    }
  }, [user]);

  useEffect(() => {
    if (user?.id !== moment?.user.id) {
      router.back();
    }
  }, [user, moment]);

  return (
    <LGLayout>
      <h2 className="main-title">모멘트 수정</h2>
      <MomentPostingForm editMoment={moment} />
    </LGLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(getUserInfoAction());
  const initialMoment = await fetcher(query && `/moment/${query?.code}/${query?.momentId}/0`);
  return {
    props: { initialMoment },
  };
});

export default edit;
