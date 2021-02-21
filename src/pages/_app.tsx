import React from "react";
import App, { AppContext } from "next/app";
import { Provider } from "mobx-react";
import { TokenSniffer } from "../utils/sniffToken";
import { ModalProvider } from "react-modal-hook";
import { stores } from "../stores";
import "react-datepicker/dist/react-datepicker.css";
import { SWRConfig } from "swr";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import { NextPageContext } from "next";

const cache = createIntlCache();

const getMessages = (locale: string) => {
  return require(`../lang/${locale.split("-")[0]}.json`);
};

export const getLang = (ctx: NextPageContext) => {
  // todo cookie lang
  const urlLang = ctx.req?.headers;

  const cookies: any = (urlLang?.cookie || "").split(";").reduce((res, c) => {
    const [key, val] = c
      .trim()
      .split("=")
      .map(decodeURIComponent);
    try {
      return Object.assign(res, { [key]: JSON.parse(val) });
    } catch (e) {
      return Object.assign(res, { [key]: val });
    }
  }, {});
  const locale = cookies["d2c-lang"] || "ru";

  if (ctx.req?.url?.startsWith("/admin"))
    return {
      locale,
      messages: getMessages(locale)
    };

  return {
    locale,
    messages: getMessages(locale)
  };
};

const getLangProps = (ctx: NextPageContext): { locale: string; messages: any } => {
  // Get the `locale` and `messages` from the request object on the server.
  // In the browser, use the same values that the server serialized.
  const { req } = ctx;
  const { locale, messages } = req
    ? getLang(ctx)
    : { locale: stores.lang.language, messages: getMessages(stores.lang.language) };

  return { locale, messages };
};

export default class MyApp extends App<any> {
  componentDidCatch(error: Error, errorInfo: any) {
    // captureComponentException(error, errorInfo);
    super.componentDidCatch(error, errorInfo);
  }

  static async getInitialProps(appContext: AppContext) {
    const langProps = getLangProps(appContext.ctx);
    const appProps = await App.getInitialProps(appContext);

    // await Services.site.profileStore.fetchSilent();

    return { ...appProps, ...langProps };
  }

  render() {
    const { Component, pageProps, locale, messages } = this.props;

    const intl = createIntl({ locale, messages, defaultLocale: "ru" }, cache);

    return (
      <ModalProvider>
        <SWRConfig
          value={{
            refreshInterval: typeof window === "undefined" ? 0 : 10000
          }}
        >
          <RawIntlProvider value={intl}>
            <Provider {...stores}>
              <TokenSniffer />
              <Component {...pageProps} />
            </Provider>
          </RawIntlProvider>
        </SWRConfig>
      </ModalProvider>
    );
  }
}
