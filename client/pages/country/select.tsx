import React, { FC, useCallback, useMemo, useState } from "react";
import AutoCompleteForm from "@components/AutoCompleteForm";
import CountryList from "@components/CountryList";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import { FLEX_STYLE, toastErrorMessage, WHITE_STYLE } from "config";
import { ICountry } from "@typings/db";
import styled from "@emotion/styled";
import router from "next/router";
import LGLayout from "@layout/LGLayout";
import { wrapper } from "configureStore";
import axios from "axios";
import { getUserInfoAction } from "actions/user";
import MainCountryAllview from "@sections/MainPage/MainCountryAllview";
import tw from "twin.macro";

const GobackBtn = styled.div`
  ${FLEX_STYLE("flex-end", "center")};
  margin-bottom: 2rem;
  button {
    ${tw`bg-white w-28 rounded-xl px-4 py-2 hover:shadow-md`}
  }
`;

const AutoCompleteWrapper = styled.div`
  ${tw`bg-white flex p-2 rounded-2xl`}
  .search-bar {
    width: 100%;
  }
  .autoComplete-form {
    width: 100%;
    .ant-select-selector {
      border: none;
      &:focus {
        border: none !important;
      }
      &:hover {
        border: none !important;
      }
    }
  }
  .search-btn {
    ${tw`w-20 ml-4 rounded-xl cursor-pointer bg-gray-100 hover:bg-gray-300`}
  }
`;

interface IProps {}

const select: FC<IProps> = () => {
  const { data: countries, error, revalidate } = useSWR<ICountry[]>("/country", fetcher);
  const [selectedCountry, setCountry] = useState("");
  const countryOptions = useMemo(
    () =>
      countries?.map((v, i) => {
        return { value: v.name, code: v.code };
      }),
    [countries]
  );
  const onClickGotoCountryPage = useCallback(() => {
    let pickCountry = countryOptions?.find((v) => v.value === selectedCountry);
    if (pickCountry) {
      router.push(`/country/${pickCountry.code}`);
    } else {
      toastErrorMessage("유효하지 않은 국가입니다. 다시 확인해주세요.");
      return;
    }
  }, [selectedCountry, countryOptions]);
  return (
    <LGLayout>
      <GobackBtn>
        <button onClick={() => router.back()}>뒤로가기</button>
      </GobackBtn>
      <h2 className="main-title">인기여행지</h2>
      <CountryList isMain={true} slidesPerView={4.7} />
      <h2 className="main-title">국가선택</h2>
      <AutoCompleteWrapper>
        <div className="search-bar">
          <AutoCompleteForm
            countryOptions={countryOptions}
            selectedCountry={selectedCountry}
            setCountry={setCountry}
          />
        </div>
        <button className="search-btn" onClick={onClickGotoCountryPage}>
          이동
        </button>
      </AutoCompleteWrapper>
      <MainCountryAllview isMain={true} countries={countries} />
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

export default select;
