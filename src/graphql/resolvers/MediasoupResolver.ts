import {Mutation, Resolver} from '@nestjs/graphql';
import IMediasoupManager from "../../managers/mediasoup/IMediasoupManager";

@Resolver()
export class MediasoupResolver {
    constructor(private readonly mediasoupManager: IMediasoupManager) {
    }

    @Mutation()
    createRoom() {
        return this.mediasoupManager.createRoom()
    }
}
