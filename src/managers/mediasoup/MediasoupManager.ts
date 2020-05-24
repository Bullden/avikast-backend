import {Injectable} from '@nestjs/common';
import IMediasoupManager from "./IMediasoupManager";

@Injectable()
export default class MediasoupManager extends IMediasoupManager {
    constructor() {
        super();
    }

    createRoom() {
        const room = "conference-Room"
        return room
    }
}
