import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import IAccountManager from '../../managers/account/IAccountManager';
import Account from '../entities/account/Account';
import {UseGuards, ValidationPipe} from '@nestjs/common';
import AuthGuard from '../../enhancers/guards/AuthGuard';
import CurrentSession from '../../enhancers/decorators/CurrentSession';
import UserUpdateRequest from '../entities/user/UserUpdateRequest';
import {mapAccountToGQL} from '../entities/Mappers';
import SessionInfo from 'entities/SessionInfo';

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
        email: userInput.email,
        country: userInput.country,
        city: userInput.city,
        dateOfBirth: userInput.dateOfBirth,
        tags: userInput.tags,
        skills: userInput.skills,
        referralCode: userInput.referralCode,
      }),
    );
  }
}
