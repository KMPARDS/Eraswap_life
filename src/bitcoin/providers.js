const providers = {
  btc: [
    {
      name: 'blockcypher',
      network: 'testnet',
      functions: {
        balance: {
          getBalanceUrl: address => `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`,
          parseBalanceFromApiOutput: apiOutput => {
            if(!apiOutput) return null;
            return apiOutput.balance
          }
        }
      }
    }
  ],
  bch: [
    {
      name: 'btc.com',
      network: 'bitcoin',
      functions: {
        balance: {
          getBalanceUrl: address => `https://bch-chain.api.btc.com/v3/address/${address}`,
          parseBalanceFromApiOutput: apiOutput => {
            if(!apiOutput) return null;
            if(!apiOutput.data) return 0;
            return apiOutput.data.balance
          }
        }
      }
    }
  ]
};

module.exports = providers;
