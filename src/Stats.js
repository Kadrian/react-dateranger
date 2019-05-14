// @flow

import React from "react";
import styled from "@emotion/styled";

import { formatDistance } from "date-fns";

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

function getDistance(value) {
  if (!value.min || !value.max) return "0 days selected";

  return formatDistance(value.max, value.min);
}

const Stats = ({ value }) => {
  const distance = getDistance(value);

  return (
    <Root>
      <Number>{distance}</Number>
    </Root>
  );
};

export default Stats;
