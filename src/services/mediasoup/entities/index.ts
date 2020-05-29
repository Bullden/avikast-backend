import {CreateRouterPattern} from './CreateRouter';
import {CreateTransportPattern} from './CreateTransport';
import {ConnectTransportPattern} from './ConnectTransport';
import {SendTrackPattern} from './SendTrack';
import {CreateConsumerPattern} from './CreateConsumer';

export type Pattern =
  | CreateRouterPattern
  | CreateTransportPattern
  | ConnectTransportPattern
  | SendTrackPattern
  | CreateConsumerPattern;
