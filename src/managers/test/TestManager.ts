import ITestManager from './ITestManager';
import IMediasoupService from '../../services/mediasoup/IMediasoupService';
import {Injectable} from '@nestjs/common';

@Injectable()
export default class TestManager extends ITestManager {
  constructor(private readonly mediasoupService: IMediasoupService) {
    super();
  }

  add() {
    return this.mediasoupService.add();
  }
}
