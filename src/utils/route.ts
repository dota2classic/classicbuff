import Router from "next/router";
import { steamIdToNum } from "./numSteamId";

export interface IRouterPage {
  link: { href: string; as?: string; shallow?: boolean };
  open: (hard?: boolean) => void;
}

export interface IRouterPageablePage extends IRouterPage {
  page: (page: number) => IRouterPage;
}

export const page = (href: string, as?: string, shallow?: boolean): IRouterPage => ({
  link: { href, as, shallow },
  open: (hard?: boolean) => {
    if (hard) {
      window.open(as);
    } else {
      return Router.push(href, as);
    }
  }
});

export const pageablePage = (href: string, as?: string): IRouterPageablePage => {
  const createPage = page;

  return {
    ...createPage(href, as),
    page: (page: number = 1) => {
      if (page === 1) return createPage(href, as);
      return createPage(`${href}?page=${page}`, as?.concat(`?page=${page}`));
    }
  };
};

const spage = (href: string) => page(href, href, true);

export const AppRouter = {
  index: spage("/"),
  donate: spage("/donate"),
  download: spage("/download"),
  queue: spage("/queue"),
  leaderboard: spage("/leaderboard"),
  live: spage("/live"),

  player: (id: string | number) => page(`/player/[id]`, `/player/${typeof id === "string" ? steamIdToNum(id) : id}`),

  admin: {
    tournamentMatch: {
      match: (id: number) => page(`/admin/tournament_match/[id]`, `/admin/tournament_match/${id}`)
    }
  },
  tournament: {
    index: page("/tournament"),
    tournament: (id: number) => page(`/tournament/[id]`, `/tournament/${id}`),
    bracket: (id: number) => page(`/tournament/[id]/bracket`, `/tournament/${id}/bracket`)
  },
  tournamentMatch: {
    match: (id: number) => page(`/tournament/match/[match_id]`, `/tournament/match/${id}`)
  },
  match: (id: number) => page(`/match/[id]`, `/match/${id}`),
  history: {
    index: spage(`/history`)
  }
};
