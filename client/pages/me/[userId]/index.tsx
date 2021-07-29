import React, { useEffect, useMemo, useState } from "react";
import { wrapper } from "configureStore";
import axios from "axios";
import { getUserInfoAction } from "actions/user";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import UserInfoLayout from "@layout/UserInfoLayout";
import VisitedCountryList from "@sections/UserPage/VisitedCountryList";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import { noRevalidate } from "config";
import { IUserInfo } from "@typings/db";
import CountryRouteMap from "@components/Maps/CountryRouteMap";

const index = () => {
  const { query } = useRouter();
  const { data: userInfo } = useSWR<IUserInfo>(`/user/${query?.userId}`, fetcher, noRevalidate);
  console.log(userInfo);

  const notices = useMemo(() => {
    return userInfo?.notices.reverse();
  }, [userInfo]);
  return (
    <UserInfoLayout>
      <h2 className="main-title">알림</h2>
      {notices?.map((v, i) => (
        <li key={i} className="user-info-list-card">
          <div className="user-info-list-desc">
            <h4>{v.header}</h4>
            <p>{v.content}</p>
          </div>
        </li>
      ))}
      <h2 className="main-title">{userInfo?.name}님의 연대기 지도</h2>
      <CountryRouteMap stories={userInfo?.stories || []} />
      <h2 className="main-title">다녀온 국가 리스트</h2>
      {userInfo && <VisitedCountryList stories={userInfo?.stories} />}
      <div className="post-list-wrapper">
        <div className="post-list">
          <h2 className="main-title">
            {userInfo?.name}님의 작성 연대기 {userInfo?.moments?.length || 0}개
          </h2>
          {userInfo?.stories?.map((v, i) => (
            <li key={i} className="user-info-list-card">
              <img src={v.thumbnail} alt="story_thumbnail" />
              <div className="user-info-list-desc">
                <h4>
                  {v.country.name}/{userInfo?.name}의 {i + 1}번째 연대기
                </h4>
                <p>{v.title}</p>
              </div>
            </li>
          ))}
        </div>
        <div className="post-list">
          <h2 className="main-title">
            {userInfo?.name}님의 작성 포스트 {userInfo?.stories?.length || 0}개
          </h2>
          {userInfo?.moments?.map((v, i) => (
            <li key={i} className="user-info-list-card">
              <div className="user-info-list-desc">
                <h4>
                  {v.country.name}/{v.type}/{v.id}번째포스트
                </h4>
                <p>{v.content}</p>
              </div>
            </li>
          ))}
        </div>
      </div>
    </UserInfoLayout>
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
