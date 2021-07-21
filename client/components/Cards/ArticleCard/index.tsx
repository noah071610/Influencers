import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import NameSpace from "@components/NameSpace";
import { ICountry, IMainPost } from "@typings/db";
import { DEFAULT_ICON_URL } from "config";
import React, { FC, useCallback, useState } from "react";
import { ArticleCardWrapper } from "./styles";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import ReactHtmlParser from "react-html-parser";
import { toastErrorMessage } from "config";
import router from "next/router";

interface IProps {
  mainPost: IMainPost;
}

const ArticleCard: FC<IProps> = ({ mainPost }) => {
  const onClickCountryTag = useCallback(() => {
    router.push(`/country/${mainPost.code}`);
  }, []);
  const onClickTypeTag = useCallback(() => {
    router.push(`/country/${mainPost.code}`);
  }, []);
  const onClickPostIdTag = useCallback(() => {
    router.push(`/country/${mainPost.code}/${mainPost.id}`);
  }, []);
  return (
    <ArticleCardWrapper className="article-card-wrapper">
      <div className="article-top">
        <NameSpace user={mainPost?.user} date={mainPost?.createdAt} />
        <div className="article-header">
          <a onClick={onClickCountryTag}>{mainPost?.country?.name}</a>/
          <a onClick={onClickTypeTag}>{mainPost?.type}</a>/
          <a onClick={onClickPostIdTag}>{mainPost?.id}번째메아리</a>
        </div>
      </div>
      <div className="article">
        <div
          onClick={() => router.push(`/country/${mainPost?.country?.code}/${mainPost?.id}`)}
          className="content"
        >
          {ReactHtmlParser(mainPost?.content as string)}
        </div>
        <div className="image-list"></div>
        <ul className="article-footer">
          <li>
            <CommentOutlined />
            <span className="count">{mainPost?.comments?.length}</span>
            <span>댓글</span>
          </li>
          <li>
            <LikeOutlined />
            <span className="count">{mainPost?.likedUser?.length}</span>
            <span>좋아요</span>
          </li>
        </ul>
      </div>
    </ArticleCardWrapper>
  );
};

export default ArticleCard;
