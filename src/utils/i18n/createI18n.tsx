import * as React from "react";
import { FunctionComponent, ReactElement } from "react";
import "intl-pluralrules";

import {
  FormattedDate,
  FormattedHTMLMessage,
  FormattedNumber,
  FormattedPlural,
  FormattedRelativeTime,
  FormattedTime
} from "react-intl";
import { FormattedMessage } from "./FormattedMessage";

export { defineMessages } from "react-intl";

const types: any = {
  html: (props: { id: string }) => <FormattedHTMLMessage tagName="span" {...props} />,
  date: FormattedDate,
  time: FormattedTime,
  relative: FormattedRelativeTime,
  number: FormattedNumber,
  plural: FormattedPlural
};

const getFormatted = (type: any) => (type && types[type]) || FormattedMessage;

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
    const initType = "";
    const { ...message } = messages[key];
    let Formatted = getFormatted("");
    values[key] = <Formatted {...message} />;

    withProps[key] = ({ type = "", ...props }: any = {}) => {
      Formatted = getFormatted(type || initType);
      return <Formatted {...message} {...props} />;
    };

    withValues[key] = (values: any) => <Formatted {...message} values={values} />;
  });

  return {
    ...values,
    withProps,
    withValues,
    messages
  };
}

export default createI18n;
