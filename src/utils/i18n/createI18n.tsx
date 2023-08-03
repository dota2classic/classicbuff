import * as React from "react";
import { FunctionComponent, ReactElement } from "react";
import "intl-pluralrules";
import { FormattedMessage } from "react-intl";

export { defineMessages } from "react-intl";

export interface MessageDescriptor {
  id: string;
  description?: string;
  defaultMessage?: string;
}

type Messages<T> = {
  [key in keyof T]: MessageDescriptor;
};

type FormattedMessages<T> = {
  [key in keyof T]: ReactElement;
} & {
  withProps: {
    [key in keyof T]: FunctionComponent<any>;
  };
  withValues: {
    [key in keyof T]: FunctionComponent<any>;
  };
  messages: Messages<T>;
};

function createI18n<T>(messages: Messages<T>): FormattedMessages<T> {
  type Names = keyof T;
  // any is required, because we fill objects after.
  let values: { [key in Names]: ReactElement } = {} as any;
  let withProps: {
    [key in Names]: FunctionComponent<any>;
  } = {} as any;
  let withValues: {
    [key in Names]: FunctionComponent<any>;
  } = {} as any;

  Object.keys(messages).forEach(_key => {
    const key = _key as Names;
    const { ...message } = messages[key];
    values[key] = <FormattedMessage {...message} />;

    withProps[key] = ({ type = "", ...props }: any = {}) => {
      return <FormattedMessage {...message} {...props} />;
    };

    withValues[key] = (values: any) => <FormattedMessage {...message} values={values} />;
  });

  return {
    ...values,
    withProps,
    withValues,
    messages
  };
}

export default createI18n;
