import {MuteAction} from 'entities/Room';

export type MutePattern = {
  area: 'producer';
  action: 'mute';
};

export interface MuteRequest {
  action: MuteAction;
  userId: string;
  roomId: string;
}

export interface MuteResponse {
  response: boolean;
}
