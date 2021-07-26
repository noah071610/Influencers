import styled from "@emotion/styled";
import { FLEX_STYLE, FONT_STYLE, GRAY_COLOR, WHITE_COLOR, WHITE_STYLE } from "config";
import tw from "twin.macro";

export const ArticleCardWrapper = styled.div`
  ${tw`cursor-pointer p-4 mb-4 flex`}
  &:hover {
    .image-wrapper {
      img {
        transform: scale(1.05);
      }
    }
  }
  .image-wrapper {
    ${tw`rounded-xl overflow-hidden w-2/5 relative`}
    img {
      ${tw`rounded-xl h-60 w-full `}
      transition: 0.3s all;
    }
    .like-comment-list {
      ${tw`absolute bottom-4 right-4 bg-white py-1 px-2 opacity-50 rounded-xl`}
      li {
        ${tw`p-1 cursor-pointer`}
        .count {
          margin: 0 0.3rem;
        }
        .anticon {
          font-size: 1.2rem;
        }
      }
    }
  }

  .story-info {
    ${FLEX_STYLE("flex-start", "flex-end")};
  }
  .story-content {
    padding: 1rem 0;
    line-height: 1.7;
  }
  .story-main {
    padding-left: 2rem;
    width: 60%;
  }
  h2 {
    ${FONT_STYLE(1.2, true)};
    padding-bottom: 1rem;
  }
`;
