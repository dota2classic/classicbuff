import styled from "styled-components";

export const IconWrapper = styled.span`
  height: 24px;
  width: 24px;
`;

export const Text = styled.span`
  font-family: Roboto, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

const colors = {
  primary: "#0071C2",
  secondary: "#DEE7ED",
  white: "#fff"
};

export const StyledButton = styled.button`
  border-radius: 5px;
  padding: 2px 10px;

  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  
  cursor: pointer;
  
  &.primary {
     background: ${colors.primary};
     color: ${colors.white};
     svg {
       fill: ${colors.white} !important;
     }
  }

  &.secondary {
     background: ${colors.secondary};
     color: ${colors.primary};
     svg {
       fill: ${colors.primary} !important;
     }
  }

  &.tertiary {
     background: none;
     color: ${colors.primary};
     svg {
       fill: ${colors.primary} !important;
     }
     
     &:hover {
       background: ${colors.secondary};
     }
  }

  ${IconWrapper} + ${Text} {
    margin-left: 4px;
  }
  
  ${Text} + ${IconWrapper} {
    margin-left: 4px;
  }
  
`;
