import styled from "styled-components";
import { colors } from "../shared/styles";

export const ButtonIconWrapper = styled.span`
  height: 24px;
  width: 24px;
`;

export const Text = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  margin: 4px 0;
`;

export const StyledButton = styled.button`
  border-radius: 5px;
  padding: 2px 10px;

  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  
  align-self: center;
  
  cursor: pointer;
  
  
  &.primary {
     background: ${colors.button.main};
     color: ${colors.frame.card};
     svg {
       fill: ${colors.frame.card} !important;
     }
  }

  &.secondary {
     background: ${colors.frame.bar};
     color: ${colors.button.main};
     svg {
       fill: ${colors.button.main} !important;
     }
  }

  &.tertiary {
     background: none;
     color: ${colors.button.main};
     svg {
       fill: ${colors.button.main} !important;
     }
     
     &:hover {
       background: ${colors.frame.bar};
     }
  }


  &.icon {
     padding: 2px;
     background: none;
     color: ${colors.button.main};
     svg {
       fill: ${colors.button.main} !important;
     }
     
     &:hover {
       background: ${colors.frame.bar};
     }
  }
  
  ${ButtonIconWrapper} + ${Text} {
    margin-left: 4px;
  }
  
  ${Text} + ${ButtonIconWrapper} {
    margin-left: 4px;
  }
  
`;
