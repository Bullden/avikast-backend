import {Mutation, Resolver} from '@nestjs/graphql';
import ITestManager from '../../managers/test/ITestManager';
import Ignore from '../../enhancers/decorators/Ignore';

@Resolver()
export default class TestResolver {
  constructor(private readonly testManager: ITestManager) {}

  @Mutation(() => Number)
  @Ignore('Authorization', 'AppType', 'Platform')
  async add() {
    return this.testManager.add();
  }
}
