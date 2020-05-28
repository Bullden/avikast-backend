import {CreateRouterPattern} from './CreateRouter';
import {CreateTransportPattern} from './CreateTransport';
import {ConnectTransportPattern} from './ConnectTransport';

export type Pattern =
  | CreateRouterPattern
  | CreateTransportPattern
  | ConnectTransportPattern;
