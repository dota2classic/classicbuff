import React from "react";
import App, { AppContext } from "next/app";
import { TokenSniffer } from "../utils/sniffToken";
import { ModalProvider } from "react-modal-hook";
import "react-datepicker/dist/react-datepicker.css";
import { SWRConfig } from "swr";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import { NextPageContext } from "next";
import Cookies from "cookies";
import { AuthServiceService } from "../service/AuthServiceService";
import { RootStoreProvider } from "../stores/StoreProvider";
import { initializeStore } from "../stores";

const cache = createIntlCache();

const getMessages = (locale: string) => {
  return require(`../lang/${locale.split("-")[0]}.json`);
};

export const getLang = (ctx: NextPageContext) => {
  const cookies = new Cookies(ctx.req!!, ctx.res!!);

  const locale = cookies.get("d2c-lang") || "ru";

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

  if (req) {
    const { locale, messages } = getLang(ctx);

    return { locale, messages };
  } else {
    const stores = initializeStore();
    const locale = stores.lang.locale;

    return { locale, messages: getMessages(locale) };
  }
};

export default class MyApp extends App<any> {
  componentDidCatch(error: Error, errorInfo: any) {
    // captureComponentException(error, errorInfo);
    super.componentDidCatch(error, errorInfo);
  }

  static async getInitialProps(appContext: AppContext) {
    const langProps = getLangProps(appContext.ctx);
    const appProps = await App.getInitialProps(appContext);

    if (!appContext.ctx.req || !appContext.ctx.res) return { ...appProps, ...langProps };

    const cookies = new Cookies(appContext.ctx.req, appContext.ctx.res);
    const cookieToken = cookies.get(AuthServiceService.cookieTokenKey);

    return { ...appProps, ...langProps, token: cookieToken };
  }

  render() {
    const { Component, pageProps, locale, messages, token, router } = this.props;

    let loc: string = locale;
    if (router.query.lang !== undefined) {
      if (router.query.lang === "en") {
        loc = "en";
      } else {
        loc = "ru";
      }
    }

    const intl = createIntl({ locale: loc, messages: getMessages(loc), defaultLocale: "ru" }, cache);

    const defaultHydration = {
      lang: {
        language: loc
      }
    };
    return (
      <ModalProvider>
        <SWRConfig
          value={{
            refreshInterval: typeof window === "undefined" ? 0 : 10000
          }}
        >
          <RawIntlProvider value={intl}>
            <RootStoreProvider
              token={token}
              hydrationData={{
                ...defaultHydration,
                ...(this.props.pageProps.hydrationData || {})
              }}
            >
              <TokenSniffer />
              <Component {...pageProps} />
            </RootStoreProvider>
          </RawIntlProvider>
        </SWRConfig>
      </ModalProvider>
    );
  }
}
