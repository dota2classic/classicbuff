import styled from "styled-components";
import React from "react";
import { colors } from "../../../shared";
import { SearchGameButton } from "./SearchGameButton";

const SearchBar = styled.div`
  position: fixed;

  background: ${colors.transparentTint};

  right: 50px;
  bottom: 50px;

  z-index: 10000;
`;

export const SearchGameBar = () => {
  return (
    <SearchBar>
      <SearchGameButton />
    </SearchBar>
  );
};
