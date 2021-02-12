import { TournamentBracketParticipantDto } from "../../api/back/models";

export function renderParticipantLabel(name: HTMLElement, p: TournamentBracketParticipantDto) {
  if (p.profile) {
    const span = document.createElement("span");
    span.innerText = p.profile.name;
    name.appendChild(span);
  } else if (p.team) {
    const span = document.createElement("span");
    span.innerText = p.team.name;
    name.appendChild(span);
  } else {
    const span = document.createElement("span");
    span.innerText = "???";
    name.appendChild(span);
  }
}

export function renderParticipantImage(name: HTMLElement, p: TournamentBracketParticipantDto) {
  if (p.profile) {
    const img = new Image();
    img.src = p.profile.avatar;
    img.classList.add("participant-image");
    name.appendChild(img);
  } else if (p.team) {
    const img = new Image();
    img.src = p.team.imageUrl;
    img.classList.add("participant-image");
    name.appendChild(img);
  }
}

export function wbLoserFinal() {
  return `Лузер финала ВС`;
}

export function wbRoundLoser(round: number, position: number) {
  return `Лузер ВС ${round}.${position}`;
}

export function wbRound(round: number) {
  return `ВС Раунд ${round}`;
}

export function wbFinalRound() {
  return `Финал ВС`;
}

export function lbRound(round: number) {
  return `НС Раунд ${round}`;
}

export function lbFinalRound() {
  return `Финал НС`;
}

export function loserWbSemi(position: number) {
  return `Лузер ВС полуфинал ${position}`;
}
