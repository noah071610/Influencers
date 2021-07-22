import styled from "@emotion/styled";
import { BORDER_THIN, FLEX_STYLE, FONT_STYLE, WHITE_COLOR } from "config";

export const HeaderWrapper = styled.header`
  padding: 0.7rem 1.2rem;
  ${BORDER_THIN("border-bottom")};
  width: 100%;
  ${FLEX_STYLE("space-between", "center")};
  background-color: ${WHITE_COLOR};
  a {
    ${FONT_STYLE(1.05, true)};
  }
`;

export const HeaderLeft = styled.ul`
  img {
    width: 8.5rem;
    height: 2.5rem;
    margin-right: 2rem;
  }
  li {
    margin-right: 1.3rem;
    .icon {
      width: 2.5rem;
      height 2.5rem;
      border-radius:50%;
    }
  }
`;

export const HeaderRight = styled.ul`
  ${FLEX_STYLE("", "center")};
  li {
    margin-left: 1.3rem;
    .icon {
      width: 2.5rem;
      height 2.5rem;
      border-radius:50%;
      margin-right:0.5rem;
    }
    .anticon {
      font-size : 1.3rem;
    }
  }
`;
