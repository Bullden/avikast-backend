import {CreateRouterPattern} from './CreateRouter';
import {CreateTransportPattern} from './CreateTransport';
import {ConnectTransportPattern} from './ConnectTransport';
import {SendTrackPattern} from './SendTrack';

export type Pattern =
  | CreateRouterPattern
  | CreateTransportPattern
  | ConnectTransportPattern
  | SendTrackPattern;
