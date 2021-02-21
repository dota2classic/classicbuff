import { computed, observable } from "mobx";
import cookies from "browser-cookies";

export class Lang {
  @observable
  public language: string = "en";

  constructor() {
    if (typeof window !== "undefined") {
      const lsLang = localStorage.getItem("d2c-lang");
      const cookieLang = cookies.get("d2c-lang");

      if (lsLang) this.language = lsLang;
      else if (cookieLang) this.language = cookieLang;
    }
  }

  @computed
  public get locale() {
    if (this.language === "ru") {
      return "ru-RU";
    } else {
      return "en-EN";
    }
  }

  @observable
  debugShowIds: boolean = false;

  toggle = () => {
    if (this.language === "ru") {
      this.setLang("en");
    } else {
      this.setLang("ru");
    }
  };

  public setLang(lang: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("d2c-lang", lang);
      cookies.set("d2c-lang", lang);
    }

    if (lang !== this.language) {
      this.language = lang;
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
  }
}
