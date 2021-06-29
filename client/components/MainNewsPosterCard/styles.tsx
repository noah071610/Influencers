import styled from "@emotion/styled";
import { RGB_BLACK } from "config";

export const CardWrapper = styled.div`
  cursor: pointer;
  padding: 1.5rem;
  border: 1px solid ${RGB_BLACK("0.1")};

  &:hover {
    h2 {
      text-decoration: underline;
    }
    background: ${RGB_BLACK("0.03")};
    img {
      transform: scale(1.08);
    }
  }
  div {
    overflow: hidden;
    img {
      transition: 0.3s all;
      width: 100%;
      margin-bottom: 1rem;
    }
  }

  h3 {
    margin-bottom: 1rem;
  }
`;
