import { ConnectedUser } from "./ConnectedUser";

export enum GameStatus {
  WAITING = 'waiting',
  RUNNING = 'running',
}

export interface Game {
  name: string;
  id: string;
  slots: number;
  status: GameStatus;
  adminId?: string;
  connectedUsers: ConnectedUser[];
}