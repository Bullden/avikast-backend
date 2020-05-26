import {Mutation, Resolver} from '@nestjs/graphql';
import ITestManager from '../../managers/test/ITestManager';
import Ignore from '../../enhancers/decorators/Ignore';

@Resolver()
export default class TestResolver {
  constructor(private readonly testManager: ITestManager) {}

  @Mutation(() => Boolean)
  @Ignore('Authorization', 'AppType', 'Platform')
  async add() {
    await this.testManager.createRouter();
    return true;
  }
}
