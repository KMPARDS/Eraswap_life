import { ethers } from 'ethers';
import { CustomProvider } from './custom-provider';

import { IKycDappFactory } from './typechain/IKycDappFactory';
import { IPrepaidEsFactory } from './typechain/IPrepaidEsFactory';

const config = {
  ESN: {
    nrtManager: 'NRT_MANAGER',
    timeallyManager: 'TIMEALLY_MANAGER',
    timeallyStakingTarget: 'TIMEALLY_STAKING_TARGET',
    validatorSet: 'VALIDATOR_SET',
    validatorManager: 'VALIDATOR_MANAGER',
    randomnessManager: 'RANDOMNESS_MANAGER',
    blockRewardManager: 'BLOCK_REWARD',
    prepaidEs: 'PREPAID_ES',
    dayswappers: 'DAYSWAPPERS',
    kycdapp: '0xC4336494606203e3907539d5b462A5cb7853B3C6',
    timeallyclub: 'TIMEALLY_CLUB',
    timeAllyPromotionalBucket: 'TIMEALLY_PROMOTIONAL_BUCKET',
  },
};

window.providerESN = new CustomProvider(
  'https://node0.testnet.eraswap.network',
  {
    name: 'EraSwapNetwork',
    chainId: 5196,
    ensAddress: config.ESN.kycdapp,
  }
);

// Temporary wallet
if (true) {
  window.wallet = new ethers.Wallet(
    '0xC8C32AE192AB75269C4F1BC030C2E97CC32E63B80B0A3CA008752145CF7ACEEA',
    window.providerESN
  );
}

window.kycDappInstance = IKycDappFactory.connect(
  config.ESN.kycdapp,
  window.providerESN
);

window.prepaidEsInstance = IPrepaidEsFactory.connect(
  config.ESN.prepaidEs,
  window.providerESN
);
