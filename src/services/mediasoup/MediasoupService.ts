import IMediasoupService from './IMediasoupService';
import {Inject} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {MEDIASOUP_SERVICE} from './Constants';
import {requireResult} from './Utils';

export default class MediasoupService extends IMediasoupService {
  constructor(@Inject(MEDIASOUP_SERVICE) private readonly mediasoupClient: ClientProxy) {
    super();
  }

  async add(...payload: number[]) {
    const pattern = {cmd: 'sum'};
    const result = await this.mediasoupClient.send<number>(pattern, payload);
    return result.toPromise().then(requireResult);
  }
}
