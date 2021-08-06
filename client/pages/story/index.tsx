import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import XLGLayout from "@layout/XLGLayout";
import {
  BORDER_THIN,
  FLEX_STYLE,
  LG_SIZE,
  noRevalidate,
  NO_POST_URL,
  RGB_BLACK,
  XLG_SIZE,
} from "config";
import { wrapper } from "configureStore";
import { getUserInfoAction } from "actions/user";
import axios from "axios";
import router, { useRouter } from "next/router";
import useSWR, { useSWRInfinite } from "swr";
import { ICountry, IStory } from "@typings/db";
import fetcher from "utils/fetcher";
import CountryPreviewSlide from "@components/CountryPreviewSlide";
import StoryMainPoster from "@sections/StoryPage/StoryPoster";
import tw from "twin.macro";
import MainCountryAllview from "@components/CountryAllview";
import TopNavigation from "@components/TopNavigation";
import StoryArticleList from "@sections/StoryPage/StoryArticleList";
import ArticleCard from "@components/Cards/ArticleCard";
import { useSelector } from "react-redux";
import { RootState } from "slices";
import ArticleColumnCard from "@components/Cards/ArticleColumnCard";
import MoreButton from "@components/MoreButton";

const Wrapper = styled.div`
  padding-top: 4rem;
  .country-list-wrapper {
    ${tw`mx-auto py-4`}
    width:${XLG_SIZE};
  }
  .story-top-section {
    ${tw`pt-16`}
  }
  .story-post-btn-wrapper {
    ${FLEX_STYLE("flex-end", "center")};
  }
  .more-icon {
    font-size: 2rem;
    color: ${RGB_BLACK(0.15)};
  }
  .story-post-btn {
    ${tw`p-2 w-32 rounded-xl`}
    ${BORDER_THIN("border")};
    &:hover {
      ${tw`shadow-md`}
    }
  }
  .popular-story-wrapper {
    .article-card-wrapper {
      ${tw`grid`}
    }
    .article-card-column-wrapper {
      ${tw`hidden`}
    }
  }
  .no-story-wrapper {
    ${tw`rounded-xl select-none p-8 mt-8`}
    height:500px;
    ${FLEX_STYLE("center", "center", "column")};
    img {
      ${tw`w-40 h-40 opacity-30 mb-4`}
    }
    h2 {
      ${tw`text-base font-bold mb-4`}
    }
  }
  @media (max-width: ${LG_SIZE}) {
    .country-list-wrapper {
      ${tw`px-2 w-full`}
    }
  }
  @media (max-width: 460px) {
    .popular-story-wrapper {
      .article-card-wrapper {
        ${tw`hidden`}
      }
      .article-card-column-wrapper {
        ${tw`block`}
      }
    }
  }
`;

interface IProps {
  initiaStories: IStory[][];
  initialPopularStories: IStory[];
}

const index: FC<IProps> = ({ initiaStories, initialPopularStories }) => {
  const { query } = useRouter();
  const { user } = useSelector((state: RootState) => state.user);
  const [filter, setFilter] = useState("");
  const [onAllCountries, setAllCountries] = useState(false);
  const [onMorePopularStory, setOnMorePopularStory] = useState(false);
  const { data: popularStories } = useSWR<IStory[]>("/story/popular", fetcher, {
    initialData: initialPopularStories,
    ...noRevalidate,
  });
  const { data: stories, setSize } = useSWRInfinite<IStory[]>(
    (index) =>
      `/story?page=${index + 1}&code=${query?.country || ""}&filter=${
        filter === "country" ? "" : filter
      }`,
    fetcher,
    {
      initialData: initiaStories,
      ...noRevalidate,
    }
  );

  const storyPageNav = useMemo(() => {
    const nav_list = [
      { name: "인기순", value: "popular" },
      { name: "최신순", value: "" },
      { name: "댓글많은순", value: "comment" },
      { name: "조회순", value: "view" },
    ];
    if (query?.country) {
      nav_list.push({ name: "국가전체보기", value: "all_country" });
    } else {
      nav_list.push({ name: "국가선택", value: "country" });
    }
    return nav_list;
  }, [query]);

  const { data: countries } = useSWR<ICountry[]>(`/country`, fetcher, noRevalidate);

  const { data: country } = useSWR<ICountry>(
    query?.country ? `/country/${query?.country}` : null,
    fetcher,
    noRevalidate
  );

  useEffect(() => {
    setAllCountries(false);
    setFilter("");
  }, [query]);

  const onClickList = useCallback((value: string) => {
    if (value === "all_country") {
      router.push("/story");
      return;
    }
    setFilter(value);
    if (value === "country") {
      setAllCountries((prev) => !prev);
      scrollTo({ top: 461 });
      return;
    }
    setAllCountries(false);
  }, []);

  const onClickMorePopularStoryBtn = useCallback(() => {
    setOnMorePopularStory(true);
  }, []);

  return (
    <Wrapper>
      <StoryMainPoster name={country?.name} image={country?.image_src} />
      {!query?.country && (
        <div className="country-list-wrapper">
          <CountryPreviewSlide slidesPerView={6.2} isMain={false} />
        </div>
      )}
      <TopNavigation filter={filter} onClickList={onClickList} list={storyPageNav} />
      <XLGLayout>
        {user && (
          <div className="story-post-btn-wrapper">
            <button className="story-post-btn" onClick={() => router.push("/story/post")}>
              연대기 올리기
            </button>
          </div>
        )}
        {onAllCountries && (
          <>
            <h2 className="main-title">국가선택</h2>
            <MainCountryAllview isMain={false} countries={countries} />
          </>
        )}
        <h2 className="main-title">인기연대기</h2>
        {popularStories && (
          <>
            <div className="popular-story-wrapper">
              <ArticleCard story={popularStories[0]} />
              <ArticleColumnCard story={popularStories[0]} />
              {onMorePopularStory &&
                popularStories?.slice(1).map((v, i) => {
                  return <ArticleCard key={i} story={v} />;
                })}
              {onMorePopularStory &&
                popularStories?.slice(1).map((v, i) => {
                  return <ArticleColumnCard key={i} story={v} />;
                })}
              {!onMorePopularStory && popularStories?.length > 1 && (
                <MoreButton onClickMoreBtn={onClickMorePopularStoryBtn} />
              )}
            </div>
          </>
        )}
        <h2 className="main-title">연대기</h2>
        {stories && stories?.flat().length > 0 ? (
          <StoryArticleList grid={4} gap="1.5rem" setSize={setSize} stories={stories} />
        ) : (
          <div className="no-story-wrapper">
            <img src={NO_POST_URL} alt="no-post-img" />
            <h2>연대기가 없습니다. 첫 연대기에 주인공이 되어주세요!</h2>
            <button className="story-post-btn" onClick={() => router.push("/story/post")}>
              연대기 올리기
            </button>
          </div>
        )}
      </XLGLayout>
    </Wrapper>
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
      let initialStories = await fetcher(`/story?page=1`);
      initialStories = [initialStories];
      let initialPopularStories = await fetcher(`/story/popular`);
      return {
        props: { initialStories, initialPopularStories },
      };
    }
);

export default index;
