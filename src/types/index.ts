export type TInstanceState =
  | "notAuthorized"
  | "authorized"
  | "blocked"
  | "sleepMode"
  | "starting";

export interface IMessage {
  id: string;
  type: "outgoing" | "incoming";
  chat: string;
  text: string;
  time: string;
}

export interface IAuthData {
  idInstance: string;
  apiTokenInstance: string;
}
