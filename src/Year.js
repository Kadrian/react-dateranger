// @flow

import React from "react";
import styled from "@emotion/styled";

import Month from "./Month";

const Root = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
`;

const Headline = styled("h3")`
  font-size: 20px;
  margin: 0;
`;

const Months = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  max-width: 1200px;
`;

const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const Year = props => {
  return (
    <Root>
      <Headline>{props.year}</Headline>
      <Months>
        {MONTHS.map(m => (
          <Month key={m} month={m} {...props} />
        ))}
      </Months>
    </Root>
  );
};

export default Year;
