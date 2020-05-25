export default abstract class IMediasoupService {
  abstract add(...payload: number[]): Promise<number>;
}
