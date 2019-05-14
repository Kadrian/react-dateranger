// @flow

import React from "react";
import styled from "@emotion/styled";

import {
  getDay,
  getDaysInMonth,
  getMonth,
  startOfWeek,
  addWeeks,
  isSameDay,
  getISOWeek
} from "date-fns";

const Root = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3px;
`;

const Name = styled("h3")`
  text-transform: uppercase;
  margin: 0;
  font-size: 14px;
`;

const WeekNumbers = styled("div")`
  width: 27px;
`;
const WeekNumber = styled("div")`
  width: 28px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;

  &:first-of-type {
    margin-top: 26px;
  }
`;
const Content = styled("div")`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
`;

const Title = styled("div")`
  width: 30px;
  height: 25px;
  font-size: 12px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Days = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: ${7 * 30}px;
`;

const Day = styled("div")`
  width: 28px;
  height: 25px;
  background-color: ${({ active, today, negative }) =>
    active
      ? "royalblue"
      : negative
      ? "#ffcccc"
      : today
      ? "#ccffcc"
      : "#f9f9f9"};
  color: ${({ active, today }) =>
    active && today ? "#ccffcc" : active ? "white" : "black"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.1s;
  cursor: pointer;
  border-radius: 2px;
  margin: 1px;

  &:hover {
    box-sizing: border-box;
    border: 2px solid #999;
    background-color: ${({ active }) => (active ? "royalblue" : "#ddd")};
  }
`;

function isActiveDate(date, min, max) {
  if (!min && !max) return false;

  if (!!min && !!max && min < max) {
    return (
      (isSameDay(min, date) || min < date) &&
      (date < max || isSameDay(date, max))
    );
  }

  return (min && isSameDay(date, min)) || (max && isSameDay(date, max));
}

function isNegativeDate(date, min, max) {
  return !!min && !!max && max < date && date < min;
}

function getWeekNumbers(month, year) {
  const weekNumbers = [];
  let weekDay = new Date(year, month);

  while (getMonth(weekDay) === month) {
    weekNumbers.push(getISOWeek(startOfWeek(weekDay)));

    weekDay = startOfWeek(addWeeks(weekDay, 1));
  }

  return weekNumbers;
}

const Month = props => {
  const firstDay = new Date(props.year, props.month);
  const dayCount = getDaysInMonth(firstDay);

  const name = props.locale.localize.month(props.month);
  const days = [...Array(dayCount).keys()];
  const weekDays = [1, 2, 3, 4, 5, 6, 0];

  const placeholderCount = (getDay(firstDay) - 1 + 7) % 7;
  const placeholderDays = [...Array(placeholderCount).keys()];

  const weekNumbers = getWeekNumbers(props.month, props.year);

  return (
    <Root>
      <Name>{name}</Name>
      <Content>
        <WeekNumbers>
          {weekNumbers.map(w => (
            <WeekNumber key={w}>{w}</WeekNumber>
          ))}
        </WeekNumbers>
        <Days>
          {weekDays.map(d => (
            <Title key={d}>
              {props.locale.localize.day(d, { width: "short" })}
            </Title>
          ))}
          {placeholderDays.map(d => (
            <Title key={d + "-placeholder"} />
          ))}
          {days.map(d => {
            const {
              year,
              month,
              value: { min, max }
            } = props;
            const date = new Date(year, month, d + 1);
            const active = isActiveDate(date, min, max);
            const negative = isNegativeDate(date, min, max);
            const today = isSameDay(date, new Date());

            return (
              <Day key={d} active={active} today={today} negative={negative}>
                {d + 1}
              </Day>
            );
          })}
        </Days>
      </Content>
    </Root>
  );
};

export default Month;
