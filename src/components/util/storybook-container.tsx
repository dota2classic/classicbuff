import styled from "styled-components";
import { colors } from "../../shared";

export const StorybookContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  padding: 20px;
  background: ${colors.darkBg};

  display: flex;
  flex-direction: column;
  & > * {
    margin-top: 20px;
  }
`;
