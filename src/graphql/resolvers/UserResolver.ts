import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import AuthGuard from 'enhancers/guards/AuthGuard';
import Client from 'graphql/entities/user/Client';
import Roles from 'enhancers/decorators/Roles';
import IUserManager from '../../managers/user/IUserManager';
import { mapClientsToGQL, mapClientToGQL } from 'graphql/entities/Mappers';
import { ID } from 'type-graphql';
import ErrorHandler from '../../ErrorHandler';

@Resolver()
@UseGuards(AuthGuard)
export default class UserResolver {
  constructor(private readonly userManager: IUserManager) {}

  @Mutation(() => Boolean)
  @Roles('Admin')
  async updateClientInformation(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('name') name: string,
    @Args('birthday') birthday: Date,
    @Args('email') email: string,
  ) {
    await this.userManager.updateClientInformation(id, name, birthday, email);

    return true;
  }

  @Query(() => [Client], { name: 'clients' })
  @Roles('Admin')
  async getClients() {
    return mapClientsToGQL(await this.userManager.getClients());
  }

  @Query(() => Client, { name: 'clientById' })
  @Roles('Admin')
  async getClientById(
    @Args({ name: 'clientId', type: () => ID }) clientId: string,
  ) {
    const client = await this.userManager.getClientById(clientId);
    if (!client) throw new ErrorHandler('Client not found');
    return mapClientToGQL(client);
  }
}
