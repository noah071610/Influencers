import styled from "@emotion/styled";
import { FLEX_STYLE } from "config";
import tw from "twin.macro";

export const SmallCardWrapper = styled.div`
  ${tw`py-2 pr-8 pl-2 cursor-pointer rounded-md w-auto hover:bg-gray-100 mb-2 mr-2`}
  ${FLEX_STYLE("center", "center")};
  img {
    ${tw`rounded-md w-16 h-16`}
  }
  .country-desc {
    ${tw`text-xs ml-4`}
    h4 {
      ${tw`pb-1`}
    }
  }
`;
