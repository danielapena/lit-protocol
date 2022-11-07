import * as LitJsSdk from '@lit-protocol/sdk-nodejs';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('LIT_CLIENT_CONNECTION') private readonly litClient: any,
  ) {}
  async getHello(): Promise<string> {
    const messageToEncrypt = '🔥🔥🔥🔥🔥 THIS IS A SECRET MESSAGE 🔥🔥🔥🔥🔥 ';
    const accessControlConditions = [
      {
        contractAddress: '',
        standardContractType: '',
        chain: 'ethereum',
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
          comparator: '>=',
          value: '0', // 0 ETH, so anyone can open
        },
      },
    ];

    const chain = 'ethereum';

    const mockedAuthSig = {
      sig: '0x39a3d6f2bedb5ef51442069d3c721596328ef50f81a3a0c0339c2acaade8bd721fea5cce0dc4acb6958cd40fddd680fb35c1fbd07fa95c7e657f5e6f154ed7fc1b',
      derivedVia: 'web3.eth.personal.sign',
      signedMessage:
        'I am creating an account to use Lit Protocol at 2022-01-10T20:47:35.692Z',
      address: '0xfff175c14a299ef7027da0d348f438e154880ccd',
    };

    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
      messageToEncrypt,
    );

    const encryptedSymmetricKey = await this.litClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig: mockedAuthSig,
      chain,
    });
    return 'Hello encrypted message!' + encryptedSymmetricKey;
  }
}
