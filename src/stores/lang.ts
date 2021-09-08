import { computed, observable } from "mobx";
import cookies from "browser-cookies";
import { Router } from "next/router";

export class Lang {
  @observable
  public language: string = "ru";

  constructor() {
    if (typeof window !== "undefined") {
      const cookieLang = cookies.get("d2c_user_lang");

      console.log("Constructor: cookie lang is", cookieLang);

      if (cookieLang) this.language = cookieLang;
    }
  }

  @computed
  public get locale() {
    if (this.language === "ru") {
      return "ru-RU";
    } else {
      return "en-EN";
    }

    // return "ru-RU";
  }

  @observable
  debugShowIds: boolean = false;

  toggle = (router: Router) => {
    console.log(router.asPath, router.basePath);
    if (router.locale?.toLowerCase() === "ru-ru") {
      router.push(router.asPath, router.asPath, { locale: "en-us" });
    } else {
      router.push(router.asPath, router.asPath, { locale: "ru-ru" });
    }
  };

  public setLang(lang: string) {
    if (typeof window !== "undefined") {
      cookies.set("d2c_user_lang", lang);
    }

    if (lang !== this.language) {
      this.language = lang;
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
  }
}
