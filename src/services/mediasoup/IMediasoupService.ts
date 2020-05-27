import {RtpCapabilities} from 'mediasoup/lib/types';

export default abstract class IMediasoupService {
  abstract createRouter(): Promise<RtpCapabilities>;
}
