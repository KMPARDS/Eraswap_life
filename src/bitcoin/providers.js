const bitcoin = require('bitcoinjs-lib');
const explorers = require('./explorers.js');
const axios = require('axios');
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
              parse: async(apiOutput, userAddress) => {
                const address = apiOutput.data.address || userAddress;
                const unspent = [];
                for(const tx of apiOutput.data.txs) {
                  const hash = tx.hash;
                  let hex = tx.hex;
                  // if(hex.length > 2 && hex.slice(0,2) !== '0x') {
                  //   hex = '0x' + hex;
                  // }
                  const confirmed = tx.confirmed;
                  console.log(tx.outputs);
                  let outputs = tx.outputs;
                  if(tx.next_outputs) {
                    let longTx;
                    let limit = 200;
                    do {
                      longTx = (await axios.get(`https://api.blockcypher.com/v1/btc/test3/txs/${tx.hash}?limit=${limit}`)).data;
                      console.log({longTx});
                      limit *= 10;
                    } while(longTx && longTx.next_outputs)
                    outputs = longTx.outputs;
                  }
                  outputs.forEach((out, index) => {
                    // console.log(out.addresses.includes(address));
                    if(out.addresses.includes(address) && !out.spent_by) {
                      unspent.push({
                        value: out.value,
                        hash,
                        hex,
                        confirmed,
                        index
                      })
                    }
                  });
                };
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
