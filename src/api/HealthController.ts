import {Controller, Get, Inject} from '@nestjs/common';
import Ignore from 'enhancers/decorators/Ignore';
import {ClientProxy} from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  constructor(@Inject('MATH_SERVICE') private readonly client: ClientProxy) {}

  @Get()
  @Ignore('Authorization', 'AppType', 'Platform')
  // eslint-disable-next-line
  async health(): Promise<void> {}

  @Get('test')
  @Ignore('Authorization', 'AppType', 'Platform')
  async test() {
    const pattern = {cmd: 'sum'};
    const payload = [1, 2, 3];
    const result = await this.client.send<number>(pattern, payload);
    const value = result.toPromise();
    return value;
  }
}
