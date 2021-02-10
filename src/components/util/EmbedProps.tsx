import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

interface Props {
  title: string;
  description: string;
  url?: string;
  image?: string;
}
export const EmbedProps = (p: Props) => {
  const url = useRouter().asPath;
  return (
    <Head>
      <meta property="og:title" content={p.title} />
      <meta property="og:description" content={p.description} />
      <meta property="og:image" content={p.image} />
      <meta property="og:url" content={p.url || url} />
    </Head>
  );
};
