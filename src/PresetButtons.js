import React from "react";
import styled from "@emotion/styled";
import {
  startOfWeek,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  endOfWeek,
  endOfMonth,
  endOfQuarter,
  endOfYear
} from "date-fns";

import leftArrow from "./img/arrow-left.svg";
import rightArrow from "./img/arrow-right.svg";

const PRESETS = [
  {
    mode: "DAY",
    name: "Today",
    value: selected =>
      selected === "both"
        ? {
            min: new Date(),
            max: new Date()
          }
        : {
            [selected]: new Date()
          }
  },
  {
    mode: "WEEK",
    name: "This week",
    value: () => ({
      min: startOfWeek(new Date(), { weekStartsOn: 1 }),
      max: endOfWeek(new Date(), { weekStartsOn: 1 })
    })
  },
  {
    mode: "MONTH",
    name: "This month",
    value: () => ({
      min: startOfMonth(new Date()),
      max: endOfMonth(new Date())
    })
  },
  {
    mode: "QUARTER",
    name: "This quarter",
    value: () => ({
      min: startOfQuarter(new Date()),
      max: endOfQuarter(new Date())
    })
  },
  {
    mode: "WHOLE YEAR",
    name: "This year",
    value: () => ({ min: startOfYear(new Date()), max: endOfYear(new Date()) })
  }
];

const Row = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Root = styled("div")``;

const BaseBtn = styled("button")`
  border: 1px solid #ccc;
  font-size: 16px;
  padding: 8px 15px;
  border-radius: 3px;
  box-shadow: 0 0 2px 0 rgba(30, 30, 40, 0.12);
  margin: 5px;
  cursor: pointer;
  outline-width: 1px;
`;

const PresetButton = styled(BaseBtn)`
  width: 200px;
`;

const MoveBtn = styled(BaseBtn)``;

const ButtonIcon = styled("img")`
  height: 16px;
`;

export default ({ selected, onClick, onLeftClick, onRightClick }) => (
  <Root>
    {PRESETS.map(preset => (
      <Row key={preset.name}>
        <MoveBtn onClick={() => onLeftClick(preset.mode)}>
          <ButtonIcon src={leftArrow} />
        </MoveBtn>
        <PresetButton
          key={preset.name}
          onClick={() => onClick(preset.value(selected), preset.mode)}
        >
          {preset.name}
        </PresetButton>
        <MoveBtn onClick={() => onRightClick(preset.mode)}>
          <ButtonIcon src={rightArrow} />
        </MoveBtn>
      </Row>
    ))}
  </Root>
);
