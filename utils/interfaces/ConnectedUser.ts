export enum UserStatus {
  OFFLINE = "offline",
  LOBBY = "lobby",
  GAME = "game",
}
export interface ConnectedUser {
  name: string;
  id: string;
  clientId: string;
  score: number;
  status: UserStatus;
}
