// @flow

import React from "react";
import styled from "@emotion/styled";

import { differenceInDays, formatDistance } from "date-fns";

const Root = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  width: 100%;
`;

const Number = styled("span")`
  font-weight: 700;
`;
// const Label = styled("span")`
//   margin-left: 5px;
// `;

function getTotalDays(value) {
  if (!value.min || !value.max) return "0 days selected";

  return formatDistance(value.max, value.min);
  // const diff = differenceInDays(value.max, value.min);

  // return diff >= 0 ? diff + 1 : diff - 1;
}

const Stats = ({ value }) => {
  const total = getTotalDays(value);

  return (
    <Root>
      <Number>{total}</Number>
    </Root>
  );
};

export default Stats;
