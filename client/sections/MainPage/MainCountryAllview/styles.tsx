import styled from "@emotion/styled";
import { FONT_STYLE } from "config";
import tw from "twin.macro";

export const MainCountryAllviewWrapper = styled.div`
  ${tw`w-full rounded-2xl bg-white p-4 pb-8 mt-4`}
  .country-card-wrapper {
    ${tw`flex flex-wrap`}
  }
  h3 {
    ${FONT_STYLE(0.9, true)};
    ${tw`mb-4 mt-6`}
  }
  h3:first-of-type {
    ${tw`mt-4`}
  }
`;
