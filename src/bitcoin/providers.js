const bitcoin = require('bitcoinjs-lib');
const explorers = require('./explorers.js');
const providers = {
  btc: {
    mainnet: {
      explorers: explorers.btc.mainnet,
      fallback: [
        {
          name: 'blockcypher',
          network: bitcoin.networks.bitcoin,
          functions: {
            balance: {
              getBalanceUrl: address => `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`,
              parseBalanceFromApiOutput: apiOutput => {
                if(!apiOutput) return null;
                return apiOutput.balance
              }
            }
          }
        }
      ]
    },
    test3: {
      explorers: explorers.btc.test3,
      fallback: [
        {
          name: 'blockcypher',
          network: bitcoin.networks.testnet,
          functions: {
            balance: {
              getBalanceUrl: address => `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`,
              parseBalanceFromApiOutput: apiOutput => {
                if(!apiOutput) return null;
                return apiOutput.balance
              }
            },
            utxos: {
              url: address => `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full?token=c29426c605e541bea307de3a54d94fcf&unspentOnly=true&includeHex=true`,
              parse: (apiOutput, userAddress) => {
                const address = apiOutput.data.address || userAddress;
                const unspent = [];
                apiOutput.data.txs.forEach(tx => {
                  const hash = tx.hash;
                  let hex = tx.hex;
                  // if(hex.length > 2 && hex.slice(0,2) !== '0x') {
                  //   hex = '0x' + hex;
                  // }
                  const confirmed = tx.confirmed;
                  tx.outputs.forEach((out, index) => {
                    if(out.addresses.includes(address)) {
                      unspent.push({
                        value: out.value,
                        hash,
                        hex,
                        confirmed,
                        index
                      })
                    }
                  });
                });
                return unspent;
              }
            },
            txPush: {
              url: () => 'https://api.blockcypher.com/v1/btc/test3/txs/push?token=c29426c605e541bea307de3a54d94fcf',
              body: hex => {tx: hex},
              parse: (apiOutput) => {
                return apiOutput
              }
            }
          }
        },
        {
          name: 'blockstream',
          network: bitcoin.networks.testnet,
          functions: {
            txPush: {
              url: () => 'https://blockstream.info/testnet/api/tx',
              body: hex => hex,
              parse: (apiOutput) => {
                return apiOutput
              }
            }
          }
        }
      ]
    }
  },
  bch: {
    mainnet: {
      explorers: explorers.bch.mainnet,
      fallback: [
        {
          name: 'btc.com',
          network: bitcoin.networks.bitcoin,
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
    }
  }
};

module.exports = providers;
