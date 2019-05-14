// @flow

import React, { useState } from "react";
import styled from "@emotion/styled";

import DateRanger from "./DateRanger";

const Root = styled("div")`
  background-color: white;
`;

/*
  Example app that uses the date picker
*/
const App = () => {
  const [show, setShow] = useState(true);
  const [value, onChange] = useState({ min: null, max: null });

  return (
    <Root>
      {show && (
        <DateRanger
          value={value}
          onDoneClick={() => setShow(false)}
          onChange={onChange}
          onChangeString={console.log}
        />
      )}
    </Root>
  );
};

export default App;
