import {Field, ObjectType} from '@nestjs/graphql';
import ParticipantTrackOptions from 'graphql/entities/room/ParticipantTrackOptions';

@ObjectType()
export default class ParticipantMedia {
  constructor(
    audio: ParticipantTrackOptions,
    video: ParticipantTrackOptions,
    screen: ParticipantTrackOptions,
  ) {
    this.audio = audio;
    this.video = video;
    this.screen = screen;
  }

  @Field(() => ParticipantTrackOptions)
  audio: ParticipantTrackOptions;

  @Field(() => ParticipantTrackOptions)
  video: ParticipantTrackOptions;

  @Field(() => ParticipantTrackOptions)
  screen: ParticipantTrackOptions;
}
