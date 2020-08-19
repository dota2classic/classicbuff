import io from "socket.io-client";
import { local } from "../config";
import { MatchmakingMode } from "../utils/format/formatGameMode";
import { computed, observable } from "mobx";

type SocketMessageType = "room-found" | "enter-queue";

interface SocketMessage {
  type: SocketMessageType;
}

class SocketService {
  private socket!: SocketIOClient.Socket;

  @observable
  public mode?: MatchmakingMode;

  @observable
  public room?: { realm: number; id: string }[];

  @observable
  public accepted: number = 0;

  @observable
  public declined: number = 0;

  private matchFound!: HTMLAudioElement;

  @computed
  public get inQueue(): boolean {
    return this.mode !== undefined;
  }
  constructor() {
    if (typeof window !== "undefined" && localStorage.getItem("dev") === "true") {
      console.log("Socket initiated");
      this.socket = io(local ? "ws://localhost:5003" : "wss://dota2classic.ru", {
        transports: ["websocket"],
        upgrade: false
      });

      this.socket.send({ lol: "heh" });
      this.socket.on("message", this.onMessage);
      this.socket.on("disconnect", () => {
        this.mode = undefined;
        this.room = undefined;
        this.accepted = 0;
        this.declined = 0;
      });
      this.socket.send({
        type: "yeah"
      });
    }
  }

  private onMessage = async (msg: SocketMessage & any) => {
    if (msg.type === "enter-queue") {
      this.mode = msg.mode;
    } else if (msg.type === "leave-queue") {
      this.mode = undefined;
    } else if (msg.type === "room-formed") {
      console.log("Yeah game found!!", msg.players);
      this.room = msg.players;
      await this.matchFound.play();
    } else if (msg.type === "ready-check-update") {
      console.log(`Ready cehck update`, msg);
      this.accepted = msg.accepted;
      this.declined = msg.declined;
    } else if (msg.type === "cancel-game") {
      console.log(`GAme cancelled serach Yeah`, msg);
      this.accepted = 0;
      this.declined = 0;
      this.room = undefined;
    }
  };

  public enterQueue(mode: MatchmakingMode) {
    console.log("enter queue?", this.socket.connected);
    this.matchFound = new Audio("/static/sound/match.mp3");
    this.socket.send({
      type: "enter-queue",
      mode
    });
  }

  public acceptGame() {
    console.log("accept game?", this.socket.connected);
    this.socket.send({
      type: "accept-game"
    });
  }

  public declineGame() {
    console.log("decline game?", this.socket.connected);
    this.socket.send({
      type: "decline-game"
    });
    this.mode = undefined;
    this.room = undefined;
    this.accepted = 0;
    this.declined = 0;
  }

  public leaveQueue(mode: MatchmakingMode) {
    this.socket.send({
      type: "leave-queue",
      mode
    });
  }
}

export default new SocketService();
