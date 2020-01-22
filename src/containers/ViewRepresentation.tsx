import React from "react";
import { observer } from "mobx-react";
import store from "../service/representationsStore";

@observer
export default class ViewRepresentation extends React.Component<{ value: string }> {
  render() {
    return store.values[this.props.value] || this.props.value;
  }
}
