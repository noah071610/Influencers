import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  padding: 1rem 2rem;
  .chart {
    &-another {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
