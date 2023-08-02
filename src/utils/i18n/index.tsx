import * as React from "react";
import { FormattedMessage as FormattedHTMLMessageOrigin } from "react-intl";

export const FormattedHTMLMessage = (props: any) => <FormattedHTMLMessageOrigin tagName="span" {...props} />;

export {
  defineMessages,
  FormattedMessage,
  FormattedDate,
  FormattedTime,
  FormattedNumber,
  FormattedPlural
} from "react-intl";

export { default as createI18n } from "./createI18n";
