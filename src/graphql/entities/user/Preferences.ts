import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class Preferences {
  constructor(allowNotifications: boolean) {
    this.allowNotifications = allowNotifications;
  }

  @Field(() => Boolean)
  allowNotifications: boolean;
}
