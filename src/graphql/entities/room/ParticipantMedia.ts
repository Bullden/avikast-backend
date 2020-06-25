import {Field, ObjectType} from '@nestjs/graphql';
import ParticipantTrackOptions from 'graphql/entities/room/ParticipantTrackOptions';

@ObjectType()
export default class ParticipantMedia {
  constructor(
    userName: string,
    audio: ParticipantTrackOptions,
    video: ParticipantTrackOptions,
    screen: ParticipantTrackOptions,
  ) {
    this.userName = userName;
    this.audio = audio;
    this.video = video;
    this.screen = screen;
  }

  @Field(() => String)
  userName: string;

  @Field(() => ParticipantTrackOptions)
  audio: ParticipantTrackOptions;

  @Field(() => ParticipantTrackOptions)
  video: ParticipantTrackOptions;

  @Field(() => ParticipantTrackOptions)
  screen: ParticipantTrackOptions;
}
