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
import {
  GetProducersPattern,
  GetProducersRequest,
  GetProducersResponse,
} from './GetProducers';
import {
  StartRecordingPattern,
  StartRecordingRequest,
  StartRecordingResponse,
} from './StartRecording';
import {
  StopRecordingPattern,
  StopRecordingRequest,
  StopRecordingResponse,
} from './StopRecording';
import {GetProducerPattern, GetProducerRequest, GetProducerResponse} from './GetProducer';
import {GetRouterPattern, GetRouterRequest, GetRouterResponse} from './GetRouter';

export type Pattern =
  | CreateRouterPattern
  | CreateTransportPattern
  | ConnectTransportPattern
  | CreateProducerPattern
  | CreateConsumerPattern
  | GetRouterPattern
  | GetProducerPattern
  | GetProducersPattern
  | StartRecordingPattern
  | StopRecordingPattern;

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
  GetProducersResponse,
  GetProducersRequest,
  StartRecordingRequest,
  StartRecordingResponse,
  StopRecordingRequest,
  StopRecordingResponse,
};
