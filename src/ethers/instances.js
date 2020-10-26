import { ethers } from 'ethers';

import { CustomProvider, addresses } from 'eraswap-sdk';
import {
  KycDappFactory,
  PrepaidEsFactory,
} from 'eraswap-sdk/dist/typechain/ESN';
import { Erc20Factory } from 'eraswap-sdk/dist/typechain/ETH';

const config = addresses['development'];

window.providerESN = new CustomProvider('testnet');

window.providerETH = new ethers.providers.InfuraProvider(
  'rinkeby',
  '3837e5b9f0f143f78f02be3aaf5c74e8'
);

// Temporary wallet;
// TODO: setup env check for this
if (false) {
  window.wallet = new ethers.Wallet(
    '0xC8C32AE192AB75269C4F1BC030C2E97CC32E63B80B0A3CA008752145CF7ACEEA',
    window.providerESN
  );
}

window.esInstanceETH = Erc20Factory.connect(
  config.ETH.esContract,
  window.providerETH
);

window.kycDappInstance = KycDappFactory.connect(
  config.ESN.kycdapp,
  window.providerESN
);

window.prepaidEsInstance = PrepaidEsFactory.connect(
  config.ESN.prepaidEs,
  window.providerESN
);
