import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import XLGLayout from "@layout/XLGLayout";
import {
  BORDER_THIN,
  FLEX_STYLE,
  getUserCookieWithServerSide,
  LG_SIZE,
  noRevalidate,
  NO_POST_URL,
  toastErrorMessage,
  WORLD_IMAGE,
  XLG_SIZE,
} from "config";
import { wrapper } from "configureStore";
import { getUserInfoAction } from "actions/user";
import axios from "axios";
import router, { useRouter } from "next/router";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { ICountry, IStory } from "@typings/db";
import fetcher from "utils/fetcher";
import CountryPreviewSlide from "@components/CountryPreviewSlide";
import StoryMainPoster from "@sections/StoryPage/StoryPoster";
import tw from "twin.macro";
import MainCountryAllview from "@components/CountryAllview";
import TopNavigation from "@components/TopNavigation";
import StoryArticleList from "@sections/StoryPage/StoryArticleList";
import ArticleCard from "@components/Cards/ArticleCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "slices";
import ArticleColumnCard from "@components/Cards/ArticleColumnCard";
import Head from "next/head";
import { mainSlice } from "slices/main";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const StoryMainWrapper = styled.div`
  padding-top: 4rem;
  .country-list-wrapper {
    ${tw`mx-auto py-4`}
    width:${XLG_SIZE};
  }
  .story-top-section {
    ${tw`pt-16`}
  }
  .more-story-btn {
    ${tw`py-1 px-3 ml-4 rounded-lg text-xs font-bold hover:shadow-md`}
    ${BORDER_THIN("border")};
  }
  .popular-story-wrapper {
    .article-card-wrapper {
      ${tw`grid mb-8`}
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
      ${tw`text-base font-bold mb-4 text-center`}
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

const StoryMainPage: FC<IProps> = ({ initiaStories, initialPopularStories }) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { user } = useSelector((state: RootState) => state.user);
  const [filter, setFilter] = useState("");
  const [onAllCountries, setAllCountries] = useState(false);
  const [onMorePopularStory, setOnMorePopularStory] = useState(false);
  const { data: popularStories } = useSWR<IStory[]>("/story/popular", fetcher, {
    fallbackData: initialPopularStories,
    ...noRevalidate,
  });
  const { data: stories, setSize } = useSWRInfinite<IStory[]>(
    (index) =>
      `/story?page=${index + 1}&code=${query?.country || ""}&filter=${
        filter === "country" ? "" : filter
      }`,
    fetcher,
    {
      fallbackData: initiaStories,
      ...noRevalidate,
    }
  );

  const storyPageNav = useMemo(() => {
    const nav_list = [
      { name: t("nav.popular"), value: "popular" },
      { name: t("nav.latest"), value: "" },
      { name: t("nav.mostComment"), value: "comment" },
      { name: t("nav.mostView"), value: "view" },
    ];
    if (query?.country) {
      nav_list.push({ name: t("nav.allCountry"), value: "all_country" });
    } else {
      nav_list.push({ name: t("nav.selectCountry"), value: "country" });
    }
    if (user) {
      nav_list.push({ name: t("nav.newStory"), value: "post" });
    }
    return nav_list;
  }, [query, user]);

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
    if (value === "post") {
      router.push("/story/post");
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

  const onClickPostStoryBtn = useCallback(() => {
    if (!user) {
      toastErrorMessage(t("message.needToLogin"));
      dispatch(mainSlice.actions.toggleLoginModal());
    } else {
      router.push("/story/post");
    }
  }, [dispatch, user]);

  return (
    <>
      <Head>
        <title>{country?.name ? country?.name + " Stories" : "Story"} | Fall IN Asia </title>
        <meta
          name="description"
          content={`${
            country?.name ? country?.name + "의" : "아시아"
          } 여행일지와 후기를 담는 연대기! Creators With : FAll IN Asia , 지금 아시아속으로 들어가봐요! | 여행 관광 투어 아시아여행 일본 대만 태국 베트남`}
        />
        <meta property="og:title" content="Fall IN Asia" />
        <meta
          property="og:description"
          content={`${
            country?.name ? country?.name + "의" : "아시아"
          } 여행일지와 후기를 담는 연대기! Creators With : FAll IN Asia , 지금 아시아속으로 들어가봐요! | 여행 관광 투어 아시아여행 일본 대만 태국 베트남`}
        />
        <meta property="og:image" content={country?.image_src || WORLD_IMAGE} />
        <meta property="og:url" content={`https://fallinasia.com/story`} />
      </Head>
      <StoryMainWrapper>
        <StoryMainPoster
          name={country ? t(`country.${country?.name}`) : null}
          image={country?.image_src}
        />
        {!query?.country && (
          <div className="country-list-wrapper">
            <CountryPreviewSlide slidesPerView={6.2} isMain={false} />
          </div>
        )}
        <TopNavigation filter={filter} onClickList={onClickList} list={storyPageNav} />
        <XLGLayout>
          {onAllCountries && (
            <>
              <h2 className="main-title">{t("nav.selectCountry")}</h2>
              <MainCountryAllview isMain={false} countries={countries} />
            </>
          )}
          <h2 style={{ display: "flex", alignItems: "center" }} className="main-title">
            {t("main.popularStory")}
            {popularStories && !onMorePopularStory && popularStories?.length > 1 && (
              <button className="more-story-btn" onClick={onClickMorePopularStoryBtn}>
                {t("main.more")}
              </button>
            )}
          </h2>
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
              </div>
            </>
          )}
          <h2 className="main-title">{t("post.story")}</h2>
          {stories && stories?.flat().length > 0 ? (
            <StoryArticleList grid={4} gap="1.5rem" setSize={setSize} stories={stories} />
          ) : (
            <div className="no-story-wrapper">
              <img src={NO_POST_URL} alt="no-post-img" />
              <h2>{t("main.noStory")}</h2>
              <button className="story-post-btn" onClick={onClickPostStoryBtn}>
                {t("post.uploadStory")}
              </button>
            </div>
          )}
        </XLGLayout>
      </StoryMainWrapper>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, locale }: GetServerSidePropsContext) => {
      getUserCookieWithServerSide(req, store);
      let initialStories = await fetcher(`/story?page=1`);
      initialStories = [initialStories];
      let initialPopularStories = await fetcher(`/story/popular`);
      return {
        props: {
          initialStories,
          initialPopularStories,
          ...(await serverSideTranslations(locale as string, ["common"])),
        },
      };
    }
);

export default StoryMainPage;
