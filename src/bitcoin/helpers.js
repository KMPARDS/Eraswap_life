const bitcoin = require('bitcoinjs-lib');
const bs58 = require('bs58');
const axios = require('axios');
const ethers = require('ethers');

// window.bitcoin = bitcoin;

// const networkObj = network => network === 'bitcoin'
//   ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;

function isFallbackProvider(provider) {
  if (typeof provider !== 'object') {
    throw new Error('should be object');
  }

  return !!provider.explorers;
}

function getFirstFallback(fallbackProvider) {
  return isFallbackProvider(fallbackProvider)
    ? fallbackProvider.fallback[0]
    : fallbackProvider;
}

function getWifFromPrivateKey(privateKey, fallbackProvider) {
  const provider = getFirstFallback(fallbackProvider);
  console.log({ fallbackProvider, provider });
  const extendedPrivateKey = ethers.utils.hexlify(
    ethers.utils.concat([
      '0x' + provider.network.wif.toString(16),
      privateKey.toString('hex'),
      '0x01',
    ])
  );
  const doubleShaOfExPr = ethers.utils.sha256(
    ethers.utils.sha256(extendedPrivateKey)
  );

  const extendedPrivateKeyWithChecksum = ethers.utils.hexlify(
    ethers.utils.concat([extendedPrivateKey, doubleShaOfExPr.slice(0, 10)])
  );
  // console.log({extendedPrivateKeyWithChecksum});

  const extendedPrivateKeyWithChecksumBs58 = bs58.encode(
    ethers.utils.arrayify(extendedPrivateKeyWithChecksum)
  );

  // console.log({ extendedPrivateKeyWithChecksum, extendedPrivateKeyWithChecksumBs58});
  return extendedPrivateKeyWithChecksumBs58;
}

function getAddressFromWif(wif, fallbackProvider) {
  const provider = getFirstFallback(fallbackProvider);
  const bitcoinWallet = bitcoin.ECPair.fromWIF(wif, provider.network);

  const { address } = bitcoin.payments.p2pkh({
    pubkey: bitcoinWallet.publicKey,
    network: provider.network,
  });

  return address;
}

function getAddressFromPrivateKey(privateKey, fallbackProvider) {
  const provider = getFirstFallback(fallbackProvider);
  return getAddressFromWif(
    getWifFromPrivateKey(privateKey, provider),
    provider
  );
}

async function fetchBalanceFromAddress(address, fallbackProvider) {
  const providerArray = fallbackProvider.fallback;
  for (const provider of providerArray) {
    const url = provider.functions.balance.getBalanceUrl(address);
    try {
      const output = await axios.get(url);
      const balance = provider.functions.balance.parseBalanceFromApiOutput(
        output.data
      );
      if (balance !== null) {
        return balance;
      }
    } catch (error) {
      console.log({ error });
    }
  }
  return null;
}

async function fetchBalanceFromPrivateKey(privateKey, fallbackProvider) {
  const address = getAddressFromPrivateKey(privateKey, fallbackProvider);
  return await fetchBalanceFromAddress(address, fallbackProvider);
}

async function fetchUtxosFromAddress(address, fallbackProvider) {
  const providerArray = fallbackProvider.fallback;
  for (const provider of providerArray) {
    const url = provider.functions.utxos.url(address);
    try {
      const output = await axios.get(url);
      const utxos = await provider.functions.utxos.parse(output);
      return utxos;
    } catch (error) {
      console.log(error);
    }
  }
  return null;
}

function concertToBTCDisplay(btcAmount) {
  const str = typeof btcAmount === 'string' ? btcAmount : String(btcAmount);
  if (isNaN(Number(str))) {
    throw new Error('Invalid btc amount: ' + btcAmount);
  }
  if (!str) {
    throw new Error('Empty btc amount');
  }
  const arr = str.split('.');
  if (arr.length === 1 || arr[1].length < 4) {
    return str;
  }
  if (arr[1].length > 8) {
    throw new Error('BTC amount has more accuracy than possible: ' + str);
  }
  arr[1] += '0'.repeat(8 - arr[1].length);
  return arr.join('.');
}

function btcToSatoshis(btcAmount) {
  const num = typeof btcAmount === 'number' ? btcAmount : Number(btcAmount);
  if (isNaN(num)) {
    throw new Error('Invalid btcAmount: ' + btcAmount);
  }
  const satoshis = Math.round(num * 10 ** 8);
  return satoshis;
}

function toOutputScript(address, fallbackProvider) {
  const provider = getFirstFallback(fallbackProvider);
  return bitcoin.address.toOutputScript(address, provider.network);
}

function signTransaction(inputs, outputs, privateKey, fallbackProvider) {
  const provider = getFirstFallback(fallbackProvider);
  const network = provider.network;
  const psbt = new bitcoin.Psbt({ network });
  window.psbt = psbt;
  let inputCount = 0;

  for (const input of inputs) {
    psbt.addInput({
      hash: input.hash,
      index: input.index,
      // nonWitnessUtxo: ethers.utils.arrayify(input.hex)
      nonWitnessUtxo: Buffer.from(input.hex, 'hex'),
    });
    inputCount++;
  }

  for (const output of outputs) {
    psbt.addOutput({
      address: output.address,
      value: output.value,
    });
  }

  const wif = getWifFromPrivateKey(privateKey, provider);
  const bitcoinWallet = bitcoin.ECPair.fromWIF(wif, network);

  for (let i = 0; i < inputCount; i++) {
    psbt.signInput(i, bitcoinWallet);
  }

  psbt.finalizeAllInputs();
  return psbt.extractTransaction().toHex();
}

async function broadcastTransaction(hex, fallbackProvider) {
  const providerArray = isFallbackProvider(fallbackProvider)
    ? fallbackProvider.fallback
    : [fallbackProvider];

  let apiOutput;

  for (const provider of providerArray) {
    try {
      apiOutput = (
        await axios.post(
          provider.functions.txPush.url(),
          provider.functions.txPush.body(hex)
        )
      ).data;
      return provider.functions.txPush.parse(apiOutput);
    } catch {}
  }

  return null;
}

export {
  getWifFromPrivateKey,
  getAddressFromWif,
  getAddressFromPrivateKey,
  fetchBalanceFromAddress,
  fetchBalanceFromPrivateKey,
  fetchUtxosFromAddress,
  concertToBTCDisplay,
  btcToSatoshis,
  toOutputScript,
  signTransaction,
  broadcastTransaction,
};
