import React from "react";
import styled from "@emotion/styled";

const Root = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ModeButton = styled("div")`
  color: ${({ col }) => col};
  font-weight: 700;
  padding: 0px;
  border: 0;
  font-size: 14px;
`;

const ModeToggle = ({ modes, mode }) => {
  return (
    <Root>
      {modes
        .filter(aMode => aMode.name === mode)
        .map(aMode => (
          <ModeButton
            key={aMode.name}
            col={aMode.col}
            idx={
              modes.length - modes.map(({ name }) => name).indexOf(aMode.name)
            }
          >
            {aMode.name}
          </ModeButton>
        ))}
    </Root>
  );
};

export default ModeToggle;
