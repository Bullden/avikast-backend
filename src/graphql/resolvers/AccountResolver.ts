import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import IAccountManager from '../../managers/account/IAccountManager';
import Account from '../entities/account/Account';
import {UseGuards, ValidationPipe} from '@nestjs/common';
import AuthGuard from '../../enhancers/guards/AuthGuard';
import CurrentSession from '../../enhancers/decorators/CurrentSession';
import UserUpdateRequest from '../entities/user/UserUpdateRequest';
import {mapAccountToGQL, mapUsersToGQL} from '../entities/Mappers';
import SessionInfo from 'entities/SessionInfo';
import User from 'graphql/entities/user/User';

@Resolver()
@UseGuards(AuthGuard)
export class AccountResolver {
  constructor(private readonly accountManager: IAccountManager) {}

  @Query(() => Account)
  async myAccount(@CurrentSession() {userId}: SessionInfo) {
    return mapAccountToGQL(await this.accountManager.getMyAccount(userId));
  }

  @Mutation(() => Account)
  async updateMyAccount(
    @CurrentSession() {userId}: SessionInfo,
    @Args('user', new ValidationPipe()) userInput: UserUpdateRequest, // TODO: remove ValidationPipe?
  ) {
    return mapAccountToGQL(
      await this.accountManager.updateAccount(userId, {
        name: userInput.name,
        country: userInput.country,
        city: userInput.city,
        dateOfBirth: userInput.dateOfBirth,
        tags: userInput.tags,
        skills: userInput.skills,
        referralCode: userInput.referralCode,
      }),
    );
  }

  @Mutation(() => Boolean)
  async updateUserImage(
    @CurrentSession() {userId}: SessionInfo,
    @Args('fileId') fileId: string,
  ) {
    return this.accountManager.updateUserImage(userId, fileId);
  }

  @Mutation(() => Boolean)
  async banUsersTemporary(
    @Args({name: 'userIds', type: () => [String]}) userIds: string[],
    @Args({name: 'untilDate', type: () => String}) untilDate: string,
  ) {
    await this.accountManager.banUsersTemporary(userIds, untilDate);
    return true;
  }

  @Mutation(() => Boolean)
  async banUsersPermanently(
    @Args({name: 'userIds', type: () => [String]}) userIds: string[],
  ) {
    await this.accountManager.banUsersPermanently(userIds);

    return true;
  }

  @Mutation(() => Boolean)
  async restoreUsers(@Args({name: 'userIds', type: () => [String]}) userIds: string[]) {
    await this.accountManager.restoreUsers(userIds);

    return true;
  }

  @Query(() => [User])
  async users() {
    return mapUsersToGQL(await this.accountManager.getUsers());
  }

  @Mutation(() => Boolean)
  async deleteUsers(
    @Args({name: 'userIds', type: () => [String]}) userIds: string[],
  ): Promise<Boolean> {
    await this.accountManager.deleteUsers(userIds);

    return true;
  }

  @Query(() => [User])
  async referrersByUserId(@Args({name: 'userId', type: () => String}) userId: string) {
    const test = await this.accountManager.referrersByUserId(userId);
    return mapUsersToGQL(test);
  }
}
