<script>
  import Navbar from './NavBar.svelte'
  import Footer from './Footer.svelte'
  import axios from 'axios'
	import { onMount } from 'svelte';

  let balance = "-";
  let es_balance = "-";
  let error_message = "";
  let website = "";
  let receiverAddress = "";
  let receiverMutable = true;
  let esAmount = "";
  let esAmountBN;
  let estimating = false;
  let gasEstimated = null;
  let userGasPrice = null;
  let showCustomGasScreen = false;
  let signing = false;
  let txHash = '';

  const erc20abi = [{"constant":!1,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":!1,"stateMutability":"nonpayable","type":"function"},{"constant":!1,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":!1,"stateMutability":"nonpayable","type":"function"},{"constant":!0,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":!1,"stateMutability":"view","type":"function"},{"constant":!1,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":!1,"stateMutability":"nonpayable","type":"function"}];

  let contract;

  (async() => {
    try {
      contract = new ethers.Contract("0xef1344bdf80bef3ff4428d8becec3eea4a2cf574", erc20abi, wallet);

      balance = String(ethers.utils.formatEther(String(await wallet.getBalance())));
      es_balance = ethers.utils.formatEther(await contract.functions.balanceOf(wallet.address));

    } catch (e) {
      console.log(e);
      error_message = 'Wallet not loaded. Please Load your wallet '
    }
  })();

  async function estimateGas() {
    try {
      receiverAddress = ethers.utils.getAddress(receiverAddress);
    } catch (error) {
      return alert('Invalid Address');
    }
    try {
      esAmountBN = ethers.utils.parseEther(esAmount);
    } catch (error) {
      return alert('Invalid ES Amount');
    }

    if(es_balance && ethers.utils.parseEther(es_balance).lt(esAmountBN)) {
      return alert('Insufficient balance');
    }

    try {
      gasEstimated = await contract.estimate.transfer(receiverAddress, esAmountBN);
    } catch (error) {
      return alert('Error while estimating:'+error.message);
    }
    estimating = false;
  }

  async function sendES() {
    signing = true;
    try {
      const tx = await contract.functions.transfer(receiverAddress, esAmountBN, {
        gasPrice: ethers.utils.parseUnits(userGasPrice, 'gwei')
      });
      console.log('tx', tx);
      txHash = tx.hash;
    } catch (error) {
      alert(error.message);
    }
    signing = false;
  }
</script>

<style>
.tm-funfact{padding:0px; margin-bottom:10px;}
.tm-funfact-icon{margin-bottom:0px}
    .coin {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 50px auto;
  transform-style: preserve-3d;
  animation: rotate3d 8s linear infinite;
  transition: all 0.3s;
}

@media(max-width:768px){
    .pcaddress{
        display:none;
    }
}
@media(min-width:769px){
    .maddress{
        display:none;
    }
}
.send-address {
  margin: .5rem;
  padding: .1rem;
  border: 1px #0004 solid;
  cursor: pointer;
}

.send-address:hover {
  box-shadow: 0 0 1px #0009;
}
</style>

<div  style="background:linear-gradient(90deg, #6b1111 0%, #170301 100%)">
  <Navbar title="Send ES" />
</div>
<div class="container mb-4">
  {#if error_message != ""}
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      {error_message}
      <a href="/access-my-wallet">Here</a>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  {/if}
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-6 col-12 mt-30">
      <div class="tm-pricebox text-center" style="padding-bottom: .1rem; background-color: #eee">
        <div class="tm-pricebox-header">
          <h4>Send ES</h4>
        </div>
        <div class="tm-pricebox-body">
          <ul>
            <li>
              ES Balance - {es_balance}
            </li>
            <li>
              ETH Balance - {balance}
            </li>
          </ul>
          <div class="m-2">
            <span class="send-address" on:click={() => {
                receiverMutable = false;
                gasEstimated = null
                receiverAddress = '0x63410b1170A89Ba76c46005a6717669f99dF7b7c';
              }}>Timeswappers Address</span>
            <span class="send-address" on:click={() => {
                receiverMutable = false;
                gasEstimated = null
                receiverAddress = '0x8e2C3c90f83FF5a93324a7eb0B55B995E1340681';
              }}>BuzCafe Address</span>
            <span class="send-address" on:click={() => {
                receiverMutable = true;
                gasEstimated = null
                receiverAddress = '';
              }}>Custom Address</span>
            <input
              type="text"
              disabled={!receiverMutable}
              bind:value="{receiverAddress}"
              on:keyup={() => {
                  gasEstimated = null
                }}
              placeholder="Enter receiver's ETH address" />
            <input
              type="text"
              bind:value="{esAmount}"
              on:keyup={() => {
                  gasEstimated = null
                }}
              placeholder="Enter amount of EraSwaps to transfer" />

            {#if gasEstimated === null}
              <button on:click={async() => {
                  estimating = true;
                  txHash = '';
                  await estimateGas();
                  estimating = false;
                }}>{estimating ? 'Estimating...' : 'Estimate Gas'}</button>
            {:else}
              <div class="my-2 p-2" style="background-color: #ddd; text-align:left; border-radius: .25rem">
                <h4>Configure Gas Settings</h4>
                Gas estimated: {gasEstimated} units
                <select on:change={event => {
                    if(event.target.value === 'custom') {
                      showCustomGasScreen = true;
                    } else {
                      showCustomGasScreen = false;
                      userGasPrice = event.target.value;
                    }
                  }}>
                  <option selected disabled>Select gas price per unit that you are willing to pay to miners</option>
                  <option value="1">Slow (1 GWEI per unit gas)</option>
                  <option value="5">Medium (5 GWEI per unit gas)</option>
                  <option value="10">Fast (10 GWEI per unit gas)</option>
                  <option value="20">Faster (20 GWEI per unit gas)</option>
                  <option value="custom">Custom</option>
                </select>
                {#if showCustomGasScreen}
                  <input on:keyup={event => { userGasPrice = event.target.value }} placeholder="Enter custom gas price per unit gas in GWEI" />
                {/if}

                {#if userGasPrice !== 'custom' && gasEstimated && userGasPrice}
                  Estimated Gas Fee: {(() => {
                      try {
                        return ethers.utils.formatEther(ethers.utils.bigNumberify(gasEstimated).mul(
                          ethers.utils.parseUnits(userGasPrice, 'gwei')));
                      } catch (error) {
                        alert(error.message);
                      }
                    })()} ETH
                  <button disabled={txHash} on:click={sendES}>{!txHash ? (signing ? 'Signing tx...' : 'Sign Tx and Send it') : 'Tx sent'}</button>
                  {#if txHash}
                    <a href={`https://etherscan.io/tx/${txHash}`}>View on EtherScan</a>
                  {/if}
                {/if}
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<Footer />
