import {
  CreateRouterPattern,
  CreateRouterRequest,
  CreateRouterResponse,
} from './CreateRouter';
import {
  CreateTransportPattern,
  CreateTransportRequest,
  CreateTransportResponse,
} from './CreateTransport';
import {
  ConnectTransportPattern,
  ConnectTransportRequest,
  ConnectTransportResponse,
} from './ConnectTransport';
import {
  CreateProducerPattern,
  CreateProducerRequest,
  CreateProducerResponse,
} from './CreateProducer';
import {
  CreateConsumerPattern,
  CreateConsumerRequest,
  CreateConsumerResponse,
} from './CreateConsumer';
import {GetProducerPattern, GetProducerRequest, GetProducerResponse} from './GetProducer';
import {GetRouterPattern, GetRouterRequest, GetRouterResponse} from './GetRouter';

export type Pattern =
  | CreateRouterPattern
  | CreateTransportPattern
  | ConnectTransportPattern
  | CreateProducerPattern
  | CreateConsumerPattern
  | GetRouterPattern
  | GetProducerPattern;

export {
  CreateRouterRequest,
  CreateRouterResponse,
  CreateTransportRequest,
  CreateTransportResponse,
  ConnectTransportRequest,
  ConnectTransportResponse,
  CreateProducerRequest,
  CreateProducerResponse,
  CreateConsumerRequest,
  CreateConsumerResponse,
  GetRouterRequest,
  GetRouterResponse,
  GetProducerRequest,
  GetProducerResponse,
};
