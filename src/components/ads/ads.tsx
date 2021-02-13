import React, { useEffect } from "react";

interface Props {
  html: string;
}

export const InlineHtml = ({ html }: Props) => <span dangerouslySetInnerHTML={{ __html: html }} />;

export const InlineAdBanner = () => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "inline-block", width: "100%", height: "50px", marginBottom: 20 }}
      data-ad-client="ca-pub-2522763197238996"
      data-ad-slot={3040153195}
      data-full-width-responsive="true"
    />
  );
};
export const AdBanner = () => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "inline-block", width: "100%", height: "100px", marginBottom: 20 }}
      data-ad-client="ca-pub-2522763197238996"
      data-ad-slot={3040153195}
      data-full-width-responsive="true"
    />
  );
};

//
export const BigAdBanner = () => {
  // useEffect(() => {
  //   try {
  //     // @ts-ignore
  //     (window.adsbygoogle = window.adsbygoogle || []).push({});
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  return null;
  // return (
  //   <ins
  //     className="adsbygoogle"
  //     style={{ display: "block" }}
  //     data-ad-client="ca-pub-2522763197238996"
  //     data-ad-slot={8833451645}
  //     data-ad-format="auto"
  //     data-full-width-responsive="true"
  //   />
  // );
};
