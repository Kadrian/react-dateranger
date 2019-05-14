// @flow

import React from "react";
import { AutoSizer, List } from "react-virtualized";

import Year from "./Year";

const Calendar = props => {
  const years = new Array(30).fill(0).map((_, i) => i + 2000);

  const rowRenderer = ({ index }) => {
    return <Year year={years[index]} {...props} />;
  };

  // const scrollToIndex = () => {
  //   console.log("scrollToIndex");
  // };

  return (
    <div>
      <AutoSizer>
        {({ width, height }) => (
          <List
            height={height}
            width={width}
            rowHeight={height / years.length}
            overscanRowCount={2}
            rowCount={years.length}
            rowRenderer={rowRenderer}
            scrollToIndex={18}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default Calendar;
