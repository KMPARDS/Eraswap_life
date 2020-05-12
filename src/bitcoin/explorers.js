const explorers = {
  btc: {
    mainnet: [],
    test3: [
      {
        name: 'blockcypher',
        urls: {
          tx: hash => `https://live.blockcypher.com/btc-testnet/tx/${hash}/`
        }
      },
      {
        name: 'bitaps',
        urls: {
          tx: hash => `https://tbtc.bitaps.com/${hash}`
        }
      },
    ]
  },
  bch: {
    mainnet: []
  }
};

module.exports = explorers;
