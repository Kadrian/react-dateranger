// @flow

import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import locale from "./locale";
import { MODES } from "./config";

import Calendar from "./Calendar";
import Stats from "./Stats";
import DateRangeInputs from "./DateRangeInputs";

const Root = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
`;

const TopRow = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  margin: 10px 0 20px;
`;

const Display = styled("div")`
  flex-grow: 1;
  height: 100%;
  overflow: auto;
`;

const Controls = styled("div")`
  background-color: #fafafa;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const FinishedButton = styled("button")`
  cursor: pointer;
  outline-width: 1px;
  padding: 10px 25px;
  font-size: 18px;
  border-radius: 3px;
  border: 1px solid #ccc;
`;

const DateRanger = ({ value, onChange, onChangeString }: PropsType) => {
  const [mode, setMode] = useState(MODES[MODES.length - 1].name);
  const [selected, setSelected] = useState("min");

  const changeBoth = obj => {
    onChange(obj);
  };

  const nextMode = up => {
    const currIdx = MODES.map(({ name }) => name).indexOf(mode);
    const nextIdx = (currIdx + (up ? 1 : -1) + MODES.length) % MODES.length;

    setMode(MODES[nextIdx].name);
  };
  const upMode = () => {
    nextMode(true);
  };
  const downMode = () => {
    nextMode(false);
  };

  const onKeyDown = e => {
    switch (e.keyCode) {
      case 38: // Up
        return upMode();
      case 40: // Down
        return downMode();
      case 32: // Space bar
        const toSelect =
          selected === "min" ? "max" : selected === "max" ? "both" : "min";

        return setSelected(toSelect);
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <Root>
      <Controls>
        <TopRow>
          <Stats value={value} />
          <FinishedButton>Done</FinishedButton>
        </TopRow>
        <DateRangeInputs
          value={value}
          mode={mode}
          selected={selected}
          setSelected={setSelected}
          onChange={val => changeBoth(val)}
          onChangeString={onChangeString}
        />
      </Controls>
      <Display>
        <Calendar locale={locale} value={value} mode={mode} />
      </Display>
    </Root>
  );
};

export default DateRanger;
