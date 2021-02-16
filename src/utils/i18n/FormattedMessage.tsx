import React from "react";
import { FormattedMessage as FormattedMessageOriginal } from "react-intl";
import { observer } from "mobx-react";
import { Services } from "../../service/store";

export interface IFormattedMessageProps {
  id: string;
  children?: (...formattedMessage: Array<string | JSX.Element>) => React.ReactNode;
}

export const KeyName = {
  ESC: ["Escape", "Esc"],
  I: ["I"]
};

export const FormattedMessage = observer((props: IFormattedMessageProps) => {
  const { children, ...restProps } = props;

  return (
    <React.Fragment>
      {Services.site.languageStore.debugShowIds ? (
        props.id
      ) : (
        <FormattedMessageOriginal {...restProps}>{children}</FormattedMessageOriginal>
      )}
    </React.Fragment>
  );
});
