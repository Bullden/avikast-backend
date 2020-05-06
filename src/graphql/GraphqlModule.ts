import {Module, ValidationPipe} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {StoresModule} from 'database/stores/StoresModule';
import {AccountResolver} from './resolvers/AccountResolver';
import {ManagerModule} from 'managers/ManagerModule';
import {EnhancersModule} from 'enhancers/EnhancersModule';
import {APP_PIPE} from '@nestjs/core';
import {RouterModule} from 'router/RouterModule';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
      tracing: true,
      context: (context) => context,
      useGlobalPrefix: true,
    }),
    ManagerModule,
    EnhancersModule,
    RouterModule,
    StoresModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AccountResolver,
  ],
})
export class GraphqlModule {}
