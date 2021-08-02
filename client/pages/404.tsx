import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import router from "next/router";
import tw from "twin.macro";
import { FLEX_STYLE } from "config";

export const NotFoundWrapper = styled.div`
  ${tw`pt-16`}
  height: 80vh;
  ${FLEX_STYLE("center", "center", "column")};
  h1 {
    font-size: 3rem;
    ${tw`mb-3`}
  }
  button {
    ${tw`mt-6 rounded-xl shadow-md py-3 px-8`}
  }
`;
interface IProps {}

const notFound: FC<IProps> = () => {
  return (
    <NotFoundWrapper>
      <h1>NOT FOUND</h1>
      <h3>페이지를 찾지 못했어요.</h3>
      <button onClick={() => router.back()}>이전페이지로 돌아가기</button>
    </NotFoundWrapper>
  );
};

export default notFound;
