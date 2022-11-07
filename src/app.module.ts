import * as LitJsSdk from '@lit-protocol/sdk-nodejs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'LIT_CLIENT_CONNECTION',
      useFactory: async () => {
        const litNodeClient = new LitJsSdk.LitNodeClient({
          alertWhenUnauthorized: false,
        });
        await litNodeClient.connect();
        return litNodeClient;
      },
    },
  ],
})
export class AppModule {}
