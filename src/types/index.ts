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
  timestamp?: Date;
}

export interface IAuthData {
  idInstance: string;
  apiTokenInstance: string;
}
