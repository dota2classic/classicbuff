import React from "react";
import TextInput from "../TextInput/TextInput";
import { Icon } from "../../../assets";
import styled from "styled-components";

export interface ISearchInput {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const CloseWrapper = styled.div`
  pointer-events: bounding-box;
  cursor: pointer;
`;

class SearchInput extends React.Component<ISearchInput> {
  static defaultProps = {
    value: "",
    onChange: () => undefined,
    placeholder: ""
  };

  render() {
    let { ...props } = this.props;

    if (!this.props.value) {
      return <TextInput icon={<Icon name="search" />} {...props} />;
    }

    return (
      <TextInput
        icon={
          <CloseWrapper onClick={this.onClear}>
            <Icon name="close" />
          </CloseWrapper>
        }
        {...props}
      />
    );
  }

  onClear = () => {
    if (this.props.onChange) {
      this.props.onChange("");
    }
  };
}

export default SearchInput;
