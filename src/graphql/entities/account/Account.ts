import {Field, ObjectType} from '@nestjs/graphql';
import User from '../user/User';
import Preferences from '../user/Preferences';

@ObjectType()
export default class Account {
  @Field(() => User)
  user: User;

  @Field(() => Preferences)
  preferences: Preferences;

  constructor(user: User, preferences: Preferences) {
    this.user = user;
    this.preferences = preferences;
  }
}
