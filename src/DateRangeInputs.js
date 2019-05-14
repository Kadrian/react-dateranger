// @flow

import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import {
  format as formatDate,
  parse as parseDate,
  isValid,
  subDays,
  subWeeks,
  subMonths,
  subQuarters,
  subYears,
  addDays,
  addWeeks,
  addMonths,
  addQuarters,
  addYears
} from "date-fns";

import { LOCAL_FORMAT } from "./helpers";
import { MODES } from "./config";

import leftArrow from "./img/arrow-left.svg";
import rightArrow from "./img/arrow-right.svg";

import ModeToggle from "./ModeToggle";
import PresetButtons from "./PresetButtons";

const Padded = styled("div")`
  margin: 5px 0;
`;

const InputContainer = styled("div")`
  position: relative;
`;

const Input = styled("input")`
  border: ${({ active }) =>
    active ? "3px solid royalblue" : "3px solid #ccc"};
  background-color: white;
  border-radius: 5px;
  padding: 22px 30px 10px;
  font-size: 24px;
  outline-width: 0;
  color: black;
  font-weight: 700;

  &::placeholder {
    color: #aaa;
  }
`;

const FormatIndicator = styled("p")`
  position: absolute;
  left: 34px;
  text-transform: uppercase;
  top: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #666;
  margin: 0;
`;

const Right = styled("div")`
  position: absolute;
  right: 34px;
  top: 17px;
`;

const Buttons = styled("div")`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`;

const ChevronButton = styled("button")`
  border: 0;
  border-radius: 50%;
  padding: 5px;
  font-size: 20px;
  height: 30px;
  width: 30px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  outline-width: 0;
  background-color: white;
  transition: background-color 0.1s, box-shadow 0.1s;
  cursor: pointer;

  &:first-of-type {
    margin-right: 5px;
  }

  &:hover {
    background-color: #fafafa;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonIcon = styled("img")`
  height: 16px;
`;

// const formatBeforeSave = (date: string | Date | null) => {
//   if (!date) return null;

//   // return new parseDateWithFormat(date, LOCAL_FORMAT);

//   if (typeof date === "object") {
//     return formatDate(date, FORMAT);
//   }

//   return date.replace(/ /g, "");
// };
// const applyDate = (what, val, displayDateFormat) => {
//   if (parseDateWithFormat(val, displayDateFormat) === null) {
//     changeSingle(what, "");
//   }
// };
// const dateFormatToSpaced = format => {
//   return format.toLowerCase().replace(/[dym]/g, "_");
// };

const formatBeforeRender = date => {
  if (!date) return "";

  // if (!isValid(date)) return date;

  //parseDateWithFormat(date, FORMAT)

  return formatDate(date, LOCAL_FORMAT);
};

const parseDateWithFormat = (date, format) =>
  parseDate(date, format, new Date());

const isValidDateString = (dateVal, stringVal) =>
  formatBeforeRender(dateVal) !== stringVal;

const withoutForbiddenChars = str => str.replace(/[ äüö]*/g, "");
const denseFormat = str => str.replace(/[-./]*/g, "");

const hasNoFocus = ref => ref.current !== document.activeElement;

export default ({
  value,
  mode,
  selected,
  setSelected,
  onChange,
  onChangeString
}) => {
  const [stringValue, setStringValue] = useState({ min: "", max: "" });

  useEffect(() => {
    setStringValue({
      min: formatBeforeRender(value.min),
      max: formatBeforeRender(value.max)
    });
  }, [value]);

  const refs = {
    min: useRef(null),
    max: useRef(null)
  };

  const changeString = what => e => {
    const val = withoutForbiddenChars(e.target.value);

    // Any string value is fine, really
    setStringValue({ ...stringValue, [what]: val });
    // Callback in case some components wants to know that
    onChangeString(val);

    // TODO: Add shortcuts

    // Prevent to have 15.06.1 interpreted as valid date
    if (denseFormat(val).length !== 8) return;

    const maybeDate = parseDateWithFormat(val, LOCAL_FORMAT);

    if (isValid(maybeDate)) {
      changeSingle(what, maybeDate);
    }
  };
  const changeSingle = (what, val) => {
    onChange({ ...value, [what]: val });
  };

  const changeIndividually = obj => onChange({ ...value, ...obj });

  const applyNextDate = (aDate, aMode, add) => {
    if (!aDate) return aDate;

    switch (aMode) {
      case "WHOLE YEAR":
        return add ? addYears(aDate, 1) : subYears(aDate, 1);
      case "QUARTER":
        return add ? addQuarters(aDate, 1) : subQuarters(aDate, 1);
      case "MONTH":
        return add ? addMonths(aDate, 1) : subMonths(aDate, 1);
      case "WEEK":
        return add ? addWeeks(aDate, 1) : subWeeks(aDate, 1);
      case "DAY":
        return add ? addDays(aDate, 1) : subDays(aDate, 1);
      default:
        return aDate;
    }
  };

  const moveDate = (direction, anotherMode) => {
    const add = direction === "right";
    const modeToUse = anotherMode || mode;

    if (selected === "both" && hasNoFocus(refs.min) && hasNoFocus(refs.max)) {
      onChange({
        min: applyNextDate(value.min, modeToUse, add),
        max: applyNextDate(value.max, modeToUse, add)
      });
    } else if (
      (selected === "min" || selected === "max") &&
      hasNoFocus(refs[selected])
    ) {
      onChange({
        min: value.min,
        max: value.max,
        [selected]: applyNextDate(value[selected], modeToUse, add)
      });
    }
  };

  const onKeyDown = e => {
    switch (e.keyCode) {
      case 37: // Left
        return moveDate("left");
      case 39: // Right
        return moveDate("right");
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

  const onBlur = what => () => {
    if (isValidDateString(value[what], stringValue[what])) {
      changeSingle(what, null);
    }
  };

  return (
    <>
      {["min", "max"].map(what => (
        <Padded key={what}>
          <InputContainer key={what}>
            <FormatIndicator>{LOCAL_FORMAT}</FormatIndicator>
            <Input
              type="text"
              ref={refs[what]}
              active={selected === what || selected === "both"}
              value={stringValue[what]}
              placeholder="15.02.2019"
              onChange={changeString(what)}
              onFocus={e => {
                setSelected(what);
                e.target.select();
              }}
              onBlur={onBlur(what)}
            />
            <Right>
              <Buttons>
                <ChevronButton
                  tabIndex="-1"
                  onClick={() =>
                    changeSingle(what, applyNextDate(value[what], mode, false))
                  }
                >
                  <ButtonIcon src={leftArrow} />
                </ChevronButton>
                <ModeToggle modes={MODES} mode={mode} />
                <ChevronButton
                  tabIndex="-1"
                  onClick={() =>
                    changeSingle(what, applyNextDate(value[what], mode, true))
                  }
                >
                  <ButtonIcon src={rightArrow} />
                </ChevronButton>
              </Buttons>
            </Right>
          </InputContainer>
        </Padded>
      ))}
      <PresetButtons
        selected={selected}
        value={value}
        onClick={(val, theMode) => {
          changeIndividually(val);

          if (theMode !== "DAY") {
            setSelected("both");
          }
        }}
        onLeftClick={theMode => moveDate("left", theMode)}
        onRightClick={theMode => moveDate("right", theMode)}
      />
    </>
  );
};
