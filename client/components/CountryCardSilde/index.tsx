import React, { FC, useCallback, useState } from "react";
import { CountryCardSildeWrapper } from "./styles";
import { SwiperSlide, Swiper } from "swiper/react";
import CountryCard from "@components/Cards/CountryCard";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import { ICountry } from "@typings/db";

interface IProps {
  slidesPerView: number;
}

const CountryCardSilde: FC<IProps> = ({ slidesPerView }) => {
  const { data: countries, error, revalidate } = useSWR<ICountry[], any>("/country", fetcher);
  return (
    <CountryCardSildeWrapper>
      <Swiper className="slide-country" slidesPerView={slidesPerView} freeMode={true}>
        {countries?.map((v, i) => {
          return (
            <SwiperSlide key={i}>
              <CountryCard country={v} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </CountryCardSildeWrapper>
  );
};

export default CountryCardSilde;
