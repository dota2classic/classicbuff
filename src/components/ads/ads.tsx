import React from "react";

interface Props {
  html: string;
}

export const InlineHtml = ({ html }: Props) => <span dangerouslySetInnerHTML={{ __html: html }} />;
