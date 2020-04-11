<script>
import { onDestroy } from 'svelte';
import axios from 'axios';

let balance;
let esbalance;
let sendEsToAdd;

let error_message = "";
let receiverAddress = "";
let receiverDisplay = "";
let receiverMutable = true;
let esAmount = "";
let esAmountBN;
let estimating = false;
let gasEstimated = null;
let userGasPrice = null;
let showCustomGasScreen = false;
let signing = false;
let txHash = '';

const intervalId = setInterval(() => {
  if(receiverMutable !== !window.sendEsDisplay) {
    receiverAddress = '';
    esAmount = '';
    receiverMutable = !window.sendEsDisplay;

    esAmountBN = null;
    estimating = false;
    gasEstimated = null;
    userGasPrice = null;
    showCustomGasScreen = false;
    signing = false;
    txHash = '';
  }

  if(window.sendEsDisplay) {
    receiverAddress = window.sendEsToAdd;
  }

  receiverDisplay = window.sendEsDisplay;
}, 500);

onDestroy(() => clearInterval(intervalId));

const erc20abi = [{"constant":!1,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":!1,"stateMutability":"nonpayable","type":"function"},{"constant":!1,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":!1,"stateMutability":"nonpayable","type":"function"},{"constant":!0,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":!1,"stateMutability":"view","type":"function"},{"constant":!1,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":!1,"stateMutability":"nonpayable","type":"function"}];

let contract;

try {
  contract = new ethers.Contract("0xef1344bdf80bef3ff4428d8becec3eea4a2cf574", erc20abi, wallet);
  // contract = new ethers.Contract("0x53e750ee41c562c171d65bcb51405b16a56cf676", erc20abi, wallet);
} catch (e) {
  console.log(e);
  error_message = 'Wallet not loaded. Please Load your wallet '
}




/// bitcoin send
let btcAddress;
let bchAddress;
let utxoFetching = false;
let utxos = [];
let selectedUtxoIds = [];
let currentScreen = 0;
let outputs = [];
let address;
let btcValue;
let error;
let hex;
let feeRecommend;
let btcHash;

function hideNav() {
    document.getElementById("sendsidebar").style.width = "0";
    currentScreen = 0;
}


try {
  (() => {
    const privateKey = window.hdNode
      ? window.hdNode.derivePath("m/44'/1'/0'/0/"+window.btcHdIndex).privateKey
      : window.wallet.privateKey;

    btcAddress = bitcoinHelpers.getAddressFromPrivateKey(
      privateKey,
      window.btcFallbackProvider
    );
  })();

  (() => {
    const privateKey = window.hdNode
      ? window.hdNode.derivePath("m/44'/145'/0'/0/"+window.bchHdIndex).privateKey
      : window.wallet.privateKey;

    bchAddress = bitcoinHelpers.getAddressFromPrivateKey(
      privateKey,
      window.bchFallbackProvider
    );
  })();
} catch {}

(async() => {
  try {
    const response = await axios.get(`https://bitcoinfees.earn.com/api/v1/fees/recommended`);
    // console.log('feeRecommend', response.data);
    feeRecommend = response.data;
    if(!feeRecommend.fastestFee) feeRecommend.fastestFee = 80;
    if(!feeRecommend.halfHourFee) feeRecommend.halfHourFee = 60;
    if(!feeRecommend.hourFee) feeRecommend.hourFee = 40;

  } catch (err) {
    feeRecommend = {
      fastestFee:80,
      halfHourFee:60,
      hourFee:40
    };
  }
})()

function guessTransactionLength(options = {}) {
  const {inputLength, outputLength} = options;
  const extraInputs = (inputLength || selectedUtxoIds.length) - 1;
  const extraOutputs = (outputLength || outputs.length) - 1;
  // console.log({extraInputs, extraOutputs});
  return 192 + 150 * extraInputs + 36 * extraOutputs;
}

function getTotalInputValue() {
  return selectedUtxoIds.reduce((total,utxoId) => total += utxos[utxoId].value, 0);
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

    .tm-funfact {
        padding: 0px !important;
    }

        .sidepanel  {
            width: 0px;
            position: fixed;
            z-index: 100;
            height: 100%;
            top: 58;
            left: 0;
            background-color: #c1c1c1;
            overflow-x: hidden;
            transition: 0.5s;
            /* padding-top: 10px; */
            }

            .card .card-header li a {
                padding: 15px 8px 8px 8px;
            }

            .sidepanel .card  {
                height: 100%;
            }

.platforms img {
    border-radius: 5px;
    width: 180px;
}

.margin_tb_10 {
    margin: 10px auto;
}

   .flexslider{
                max-width: 1055px;
                margin: 0 auto 25px;
            }
            #carousel .slides li{
                cursor: pointer;
            }
            #carousel .slides li.flex-active-slide{
                cursor: default;
            }

/* responsive start */
@media only screen and (min-width: 320px) and (max-width: 768px) {

    .left-content{
        margin: 10px auto !important;
    }

    .px-5 {
      padding: 0px auto !important;
    }

    .centerImg {
        width: 50%;
        height: 22px;
        margin: 5px auto;
    }

    /* .send-btn {
        margin: 0 20px !important;
    } */

    .received_btn {
        margin: 0 30px;
    }

    .pd-l-3 {
        padding: 0px;
    }

    .pad-l {
        padding-left: 0px;
    }

    .pad-0 {
        padding: 0px !important;
    }

    .pad-tb-40 {
        padding: 40px 0px;
    }

    .p-t-15 {
        padding: 20px 0px 0px 0px !important ;
    }

    .pr-0 {
        padding: 0px !important;
    }

    .resp-pad-0 {
        padding-top: 0px !important;
        text-align: center;
    }

    .marg-bt {
        margin-bottom: 0px;
    }

    .res-img {
        width: 60%;
        height: 100%;
    }

    .owl-nav .owl-next, .owl-prev {
        display: none !important;
    }

    .border_rt  {
        border-right: none;
    }

    .border_right{
        border: none !important;
    }

    .brand_logo {
        width: 70%;
        height: 30px;
    }

    .fnt-size {
        font-size: 12px;
    }

    .wrapper {
        width: 90%;
    }

    .marg-tp-50 {
        margin-top: 20px;
    }

    .wrapper {
      width: 90% !important;
    }

    .wrapper .right-sec {
      margin: 0px;
    }

}


@media only screen and (max-width: 1024px) {

    .send-btn {
        margin: 0px;
    }

    .received_btn {
        margin: 0px;
        /* text-align: right; */
    }

    .pad-tb-40 {
        padding: 35px 0px;
    }

    .res-img {
        width: 30%;
        height: 100%;
    }

    .resp_imag {
        width: 60%;
        height: 100%;
    }

    .bet-img {
        width: 30%;
        height: 100%;
    }

    .marg-tp-50 {
        text-align: center;
    }

    .centerImg {
        width: 50%;
        height: 22px;
        margin: 5px auto;
    }

    .txt-cent {
        text-align: center;
    }

    .day_img {
        width: 30%;
        height: 100%;
    }

}
/*/ responsive end */

/* style start */


.navbar-header-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

.navbar {
    height: 60px;
    display: flex;
    flex-wrap: wrap;
}

.navbar-header {
    align-items: stretch;
    padding: 0;
    justify-content: flex-start;
    background: linear-gradient(90deg, rgb(107, 17, 17) 0%, rgb(23, 3, 1) 100%);
    border-bottom: 1px solid rgba(72, 94, 144, 0.16);
}

.navbar-brand {
    width: 240px;
    padding: 0 0 0 20px;
    margin-top: -3px;
}

.brand_logo {
    width: 95%;
    height: 36px;
}

.welcome {
    font-size: 24px;
    font-weight: 700;
    color: #000;
    margin: 5px auto;
}

.centerImg {
    width: 20%;
    height: 28px;
    margin: 5px auto;
}

.shadow {
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.1); */
    /* -webkit-box-shadow: 0 10px 6px -6px #000;
       -moz-box-shadow: 0 10px 6px -6px #000;
            box-shadow: 0 10px 6px -6px #000; */
            box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.4);
}

.wrapper {
    width: 75%;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    background-color: #c9c9c9;

}

.address {
    margin: 5px;
    background-color: #232b2d;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    /* margin: 0px 30px !important; */
    font-weight: 600;
}

.left-content {
    margin: 50px auto;
}

.right-sec {
    background-color: #fff;
    color: #000;
    text-align: center;
    border-radius: 4px;
    padding: 10px 0px;
    margin: 40px 40px 10px 40px;
    font-weight: 600;
    color: #691111;
}

.send-btn {
    text-align: right;
}

.received_btn {
    text-align: left;
}

.balance {
    background-color: #5f0f10;
    border-radius: 5px;
    margin: 0px 5px !important;
}

.text-p {
    color: #fff;
    padding: 10px 0px 0px 0px;
    margin: 0px;
    font-weight: 600;
    font-size: 16px;
}

.bnt-SR {
    border-radius: 5px;
    background-color: #fff;
    color:#5f0f10;
    height: 30px;
    width: 80px;
    padding: 0px !important;
}

.bd-r-white {
    border-right: 2px solid #fff;
}
.border_right{border-right: 1px solid #fff;}

.txt-size {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
}

.each-list {
    border-bottom: 1px solid #fff;
}

.small-bnt {
    padding: 0px 12px;
    border-radius: 5px;
    background-color: #fff;
    color: #5f0f10;
    font-size: 12px;
    padding: 0px 5px !important;
}

.shadow_box {
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.2);
}

.time_track a {
    color:#5f0f10;
    text-decoration: none;
    font-weight: 600;
}

/* .time_track p {
    margin-bottom: 5px;
} */

.mt_bt {
    margin: 8px 0px;
}

.time_track {
    color:#5f0f10;
    font-weight: 600;
}
.br_bt  {
    border-bottom:1px solid #ccc ;
}

.time_track a:hover {
    color:#5f0f10;
    text-decoration: none;
}

.btn-w-d {
    border-radius: 2px;
    background-color: #e1e1e1;
    color: #5f0f10;
    padding: 2px 14px;
}

.btn.btn-w-d:hover {
    background-color: #5f0f10 !important;
    color: #fff !important;
}

.marg-bt {
    margin-bottom: 48px;
}

.pd-l-3 {
    padding: 10px;
}

.mrg-20 {
    margin: 20px 0px;
}

.pad-0 {
    padding: 0px;
}

/* .resp-pad-0 {
    padding-top: 50px;
} */

.res-img {
    height: 40px;
    width: 30%;
}

.mrg-bt-28 {
    margin-bottom: 5px;
}

.resp_imag {
    width: 90%;
    height: 100%;
}

.bet-img {
    width: 60%;
    height: 100%;
}

.marg-tp-50 {
    margin-top: 60px;
    margin-bottom: 2px;
}

.border_rt {
    border-right: 1px solid #5f0f10;
}

.card-header .nav-item a {
    font-size: 14px;
}

.tap_text {
    font-size: 18px;
    color: #5f0f10;
    font-weight: 600;
}

.h {
    display: block;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-left: auto;
    margin-right: auto;
    border-style: inset;
    border-width: 1px;
    color: #5f0f10;
}

.marg-t-36 {
    margin-top: 36px;
}

.resp-pad-0 {
    margin-bottom: 10px;
}

.p-t-15 {
    padding-right: 0px;
}

.marg-tp-70 {
    margin-top: 48px;
}

#qrcode {
    width:160px;
    height:160px;
    margin-top:15px;
  }


.tab_head .nav-pills .nav-link.active, .nav-link:hover
{
    box-shadow:inset 0 -2px 0 #f7972F;
    border-radius: 0 !important;
}
.tab_head .nav-pills .nav-link.active.show {
    box-shadow:inset 0 -2px 0 #f7972F !important;
}



/* .overlay {
    display: none;
    position: fixed;
    background: rgba(0, 0, 0, 0.7);
    z-index: 998;
    opacity: 0;
    transition: all 0.5s ease-in-out;
}

.overlay.active {
    display: block;
    opacity: 1;
}
   */

/* style css end */





    </style>

<div id="sendsidebar" class="sidepanel" style="background-color:#fff">
    <div class="card" style="border: 0">
        <div class="card-header bg-dark tab_head text-white p-0">
            <div class="row p-0">
                <div class="col-lg-12 text-right" style="cursor:pointer"><span href="javascript:void(0)" class="closebtn" on:click={hideNav}><i class="fa fa-arrow-left p-2"></i></span></div>
            </div>

            <ul class="nav" id="pills-tab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link text-white active" id="senderaswap_tab" data-toggle="pill" href="#senderaswap" role="tab" aria-controls="eraswap" aria-selected="true">Era Swap</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white"  id="sendethereum_tab" data-toggle="pill" href="#sendethereum" role="tab" aria-controls="ethereum" aria-selected="false">Ethereum</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white"  id="sendbtc_tab" data-toggle="pill" href="#sendbtc" role="tab" aria-controls="btc" aria-selected="false">BTC</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white"  id="sendbch_tab" data-toggle="pill" href="#sendbch" role="tab" aria-controls="bch" aria-selected="false">BCH</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white"  id="senderc_tab" data-toggle="pill" href="#senderc" role="tab" aria-controls="erc" aria-selected="false">ERC 20</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white"  id="sendxrp_tab" data-toggle="pill" href="#sendxrp" role="tab" aria-controls="xrp" aria-selected="false">XRP</a>
                </li>
            </ul>
        </div>
        <div class="card-body">
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="senderaswap" role="tabpanel" aria-labelledby="senderaswap_tab">
                    <!-- <div class="row pt-2">
                        <div class="col-lg-5 col-6 p-0 text-right"><img src="images/dashboardNew/ES.png" alt="es" width="30" height="30"></div>
                        <div class="col-lg-7 col-6"><p class="tap_text">ES Balance</p></div>

                    </div>
                    <div class="row text-center">
                        <div class="col-lg-12"><p class="tap_text">{esbalance || '0'} ES</p></div>
                    </div> -->
                    <hr class="h">
                    <div class="row text-center">
                        <div class="col-lg-12 time_track text-left">
                            <p>Send Era Swap {receiverDisplay ? `to ${receiverDisplay}` : 'to Custom Address'}</p>
                        </div>
                        <div class="col-lg-12">
                            <form action="">
                                <div class="">
                                    <div class="m-2">
                                      <!-- <span class="send-address" on:click={() => {
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
                                          }}>Custom Address</span> -->

                                      {#if error_message != ""}
                                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                          {error_message}
                                          <a href="/access-my-wallet">Here</a>
                                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                      {/if}

                                      <div class="col-lg-12 form-group">
                                          <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Enter Receiver's ES address"
                                            disabled={!receiverMutable}
                                            bind:value="{receiverAddress}"
                                            on:keyup={() => {
                                              gasEstimated = null
                                            }}>
                                      </div>
                                      <div class="col-lg-12 form-group">
                                          <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Enter Amount of ES transfer"
                                            bind:value="{esAmount}"
                                            on:keyup={() => {
                                              gasEstimated = null
                                            }}>
                                      </div>
                                      <!-- <input
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
                                        placeholder="Enter amount of EraSwaps to transfer" /> -->

                                      {#if gasEstimated === null}
                                        <button on:click={async event => {
                                            event.preventDefault();
                                            estimating = true;
                                            txHash = '';
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

                                            if(esbalance && ethers.utils.parseEther(esbalance).lt(esAmountBN)) {
                                              return alert('Insufficient balance');
                                            }

                                            try {
                                              gasEstimated = await contract.estimate.transfer(receiverAddress, esAmountBN);
                                            } catch (error) {
                                              return alert('Error while estimating:'+error.message);
                                            }
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
                                            <br />
                                            More you pay the gas fee, more quickly your transaction will be confirmed, as it'd be preferred by miners to include in the next block they're mining.
                                            <button disabled={txHash} on:click={async event => {
                                              event.preventDefault();
                                              signing = true;
                                              try {
                                                const tx = await contract.functions.transfer(receiverAddress, esAmountBN, {
                                                  gasPrice: ethers.utils.parseUnits(userGasPrice, 'gwei')
                                                });
                                                // console.log('tx', tx);
                                                txHash = tx.hash;
                                              } catch (error) {
                                                alert(error.message);
                                              }
                                              signing = false;
                                            }}>{!txHash ? (signing ? 'Signing tx...' : 'Sign Tx and Send it') : 'Tx sent'}</button>
                                            {#if txHash}
                                              <a target="_blank" rel="noopenner noreferrer" href={`https://etherscan.io/tx/${txHash}`}>View on EtherScan</a>
                                            {/if}
                                          {/if}
                                        </div>
                                      {/if}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="sendethereum" role="tabpanel" aria-labelledby="sendethereum_tab">
                  Coming soon...
                    <!-- <div class="row pt-2">
                        <div class="col-lg-5 col-6 pl-1 text-right"><img src="images/dashboardNew/Etherum.png" alt="es" width="30" height="30"></div>
                        <div class="col-lg-7 col-6 p-0"><p class="tap_text">Ethereum Balance</p></div>

                    </div>
                    <div class="row text-center">
                        <div class="col-lg-12"><p class="tap_text">{balance || '0'} ETH</p></div>
                    </div>
                    <hr class="h">
                    <div class="row text-center">
                        <div class="col-lg-12 time_track text-left">
                            <p>Send Ethereum</p>
                        </div>
                        <div class="col-lg-12">
                            <form action="">
                                <div class="row">
                                    <div class="col-lg-12 form-group">
                                        <input type="text" class="form-control" placeholder="Enter Receiver's Ethereum address">
                                    </div>
                                    <div class="col-lg-12 form-group">
                                        <input type="text" class="form-control" placeholder="Enter Amount of Ethereum transfer">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div> -->
                </div>
                <div class="tab-pane fade" id="sendbtc" role="tabpanel" aria-labelledby="sendbtc_tab">

                  {#if currentScreen === 0}
                    There is actually no such concept like Bitcoin balance on the Bitcoin blockchain. But to make it intuitive, balance can be said as sum of all the UTXOs for the address. These UTXOs are like Notes / Dollar bills in your physical wallet that you carry. UTXOs contain amount of Bitcoin which you can use to transfer to others just like you give notes from your wallet to others.
                    <div class="container text-center">
                      <button on:click={async() => {
                        utxoFetching = true;
                        utxos = await bitcoinHelpers.fetchUtxosFromAddress(
                          btcAddress,
                          window.btcFallbackProvider
                        );
                        currentScreen = 1;
                        utxoFetching = false;
                        // console.log({ utxos, btcAddress });
                      }}>{utxoFetching ? 'Fetching...' : 'Fetch UTXOs'}</button>
                    </div>
                  {:else if currentScreen === 1}
                    <style>
                      .utxo-card {
                        border: 1px solid #0006;
                        border-radius: 4px;
                        padding: .5em;
                        cursor: pointer;
                        margin: 10px 0;
                      }

                      .utxo-card.selected {
                        background-color: #0004;
                      }

                      .utxo-card .utxo-entry {
                        color: #0004;
                        display: block;
                      }

                      .utxo-card .utxo-entry.utxo-hash {
                        font-family: monospace;
                      }

                      .btc-amount {
                        font-size: 2rem;
                      }
                    </style>

                    <p>Below are the UTXOs, UTXOs are unspent transaction outputs that you can spend by sending them to other address. Click on any UTXOs that you want to include as <strong>inputs</strong> in this new transaction and after that click on <u>Proceed button below</u>.</p>

                    {#each utxos as utxo, index}
                      <div class={selectedUtxoIds.includes(index) ? 'utxo-card selected' : 'utxo-card'} on:click={() => {
                        const i = selectedUtxoIds.indexOf(index);
                        if(i === -1) {
                          selectedUtxoIds.push(index);
                        } else {
                          selectedUtxoIds[i] = selectedUtxoIds[selectedUtxoIds.length - 1];
                          selectedUtxoIds.pop();
                        }
                        selectedUtxoIds = [...selectedUtxoIds];
                      }}>
                        <span class="utxo-entry utxo-hash">
                          {utxo.hash.slice(0,8)}...{utxo.hash.slice(utxo.hash.length - 4,utxo.hash.length)}
                        </span>
                        <span class="utxo-entry">[TX Output Index: {utxo.index}]</span>
                        <span class="utxo-entry btc-amount">
                          {window.bitcoinHelpers.concertToBTCDisplay(utxo.value/10**8)} BTC
                        </span>
                        <span class="utxo-entry">Time: {utxo.confirmed}</span>
                      </div>
                    {/each}

                    BTC value of selected UTXOs:<br />
                    <span class="btc-amount">{window.bitcoinHelpers.concertToBTCDisplay(
                      selectedUtxoIds.reduce((total,utxoId) => total += utxos[utxoId].value, 0) / 10**8
                    )} BTC</span>

                    <button
                      on:click={() => {
                        currentScreen = 2;
                      }}
                      disabled={selectedUtxoIds.length === 0}
                    >Proceed to entering outputs</button>
                  {:else if currentScreen === 2}
                    <style>
                      .output-card {
                        border: 1px solid #0006;
                        border-radius: 4px;
                        padding: .5em;
                        cursor: pointer;
                        margin: 10px 0;
                      }

                      .output-card .output-entry {
                        color: #0004;
                        display: block;
                      }

                      .btc-amount {
                        font-size: 2rem;
                      }

                      .gas-recommend-box {
                        border: 1px solid #0004;
                        border-radius: 2px;
                        cursor: pointer;
                      }
                    </style>

                    <span style="cursor:pointer" on:click={() => currentScreen = 1}> {'<<'}Back to Selecting Inputs</span>

                    <div class="output-card mb-0">
                      Total Input Amount:<br />
                      <span class="btc-amount">{window.bitcoinHelpers.concertToBTCDisplay(
                        getTotalInputValue() / 10**8
                      )} BTC</span>
                    </div>

                    <div class="container mb-2">
                      <div class="row">
                        <div class="col-4 gas-recommend-box" on:click={() => {
                          const txSizeGuess = guessTransactionLength({outputLength: 1});
                          const fee = feeRecommend.fastestFee * txSizeGuess;
                          btcValue = String((getTotalInputValue() - fee)/10**8);
                        }}>
                          Slow
                        </div>
                        <div class="col-4 gas-recommend-box" on:click={() => {
                          const txSizeGuess = guessTransactionLength({outputLength: 1});
                          const fee = feeRecommend.halfHourFee * txSizeGuess;
                          btcValue = String((getTotalInputValue() - fee)/10**8);
                        }}>
                          Medium
                        </div>
                        <div class="col-4 gas-recommend-box" on:click={() => {
                          const txSizeGuess = guessTransactionLength({outputLength: 1});
                          const fee = feeRecommend.hourFee * txSizeGuess;
                          btcValue = String((getTotalInputValue() - fee)/10**8);
                        }}>
                          Fast
                        </div>
                      </div>
                    </div>

                    <input type="text" placeholder="Enter Address" bind:value={address} />
                    <input type="text" placeholder="Enter BTC value" bind:value={btcValue} />
                    <button on:click={() => {
                      error = '';
                      try {
                        window.bitcoinHelpers.toOutputScript(
                          address,
                          window.btcFallbackProvider
                        );

                        try {
                          const newOutputs = [...outputs];
                          newOutputs.push({ address, value: window.bitcoinHelpers.btcToSatoshis(btcValue) });
                          outputs = newOutputs;
                          address = '';
                          btcValue = '';
                        } catch (err) {
                          // console.log({err});
                          error = 'Invalid Amount';
                        }
                      } catch (err) {
                        // console.log({err});
                        error = 'Invalid Address';
                      }
                    }}>Add Output</button>

                    {#if error}
                      <div class="alert alert-danger">
                        {error}
                      </div>
                    {/if}

                    {#each outputs as output, index}
                      <div class="output-card">
                        <span class="output-entry">Address: {output.address}</span>
                        <span class="output-entry">Value: <br /><span class="btc-amount">{window.bitcoinHelpers.concertToBTCDisplay(output.value / 10**8)} BTC</span></span>
                        <button on:click={() => {
                          const newOutputs = [...outputs];
                          newOutputs.splice(index, 1);
                          outputs = newOutputs;
                        }}>Remove this Output</button>
                      </div>
                    {/each}

                    {#if outputs.length > 0}
                      Change remaining:<br />
                      <span class="btc-amount">{window.bitcoinHelpers.concertToBTCDisplay(
                        ((getTotalInputValue()) - (outputs.reduce((total,output) => total += output.value, 0)))
                        / 10**8
                      )} BTC</span><br/>
                      The change remaining is kept by miner as transaction fee.<br />

                      <div class="output-card">
                        Since your transaction consist of <strong>{selectedUtxoIds.length}</strong> inputs and <strong>{outputs.length}</strong> outputs, from statistics, you should leave following change:<br />
                        10 mins: {window.bitcoinHelpers.concertToBTCDisplay(feeRecommend.fastestFee * guessTransactionLength() / 10**8)} BTC<br />
                        30 mins: {window.bitcoinHelpers.concertToBTCDisplay(feeRecommend.halfHourFee * guessTransactionLength() / 10**8)} BTC<br />
                        1 hour: {window.bitcoinHelpers.concertToBTCDisplay(feeRecommend.hourFee * guessTransactionLength() / 10**8)} BTC<br />
                      </div>

                      <button on:click={() => {
                        const privateKey = window.hdNode
                          ? window.hdNode.derivePath("m/44'/1'/0'/0/"+window.btcHdIndex).privateKey
                          : window.wallet.privateKey;

                        const tx = window.bitcoinHelpers.signTransaction(
                          selectedUtxoIds.map(id => utxos[id]),
                          outputs,
                          privateKey,
                          window.btcFallbackProvider
                        );

                        // console.log({ tx });

                        hex = tx;
                        currentScreen = 3;
                      }}>
                        Sign Transaction
                      </button>
                    {/if}
                  {:else if currentScreen === 3}
                    Your transaction is:
                    <textarea value={hex} readonly />

                    <div class="container text-center">
                      <button on:click={async() => {
                        btcHash = await window.bitcoinHelpers.broadcastTransaction(
                          hex,
                          window.btcFallbackProvider
                        );
                        console.log({btcHash});
                      }}>Broadcast to Bitcoin Nodes</button>

                      <br/>

                      {#if btcHash}
                        {#each window.btcFallbackProvider.explorers as explorer}
                          <a href={explorer.urls.tx(btcHash)}>View on {explorer.name}</a><br />
                        {/each}
                      {/if}
                    </div>
                  {/if}
                </div>
                <div class="tab-pane fade" id="sendbch" role="tabpanel" aria-labelledby="sendbch_tab">
                  Coming soon...
                    <!-- <div class="row pt-2">
                        <div class="col-lg-5 col-6 p-0 text-right"><img src="images/dashboardNew/Etherum.png" alt="es" width="30" height="30"></div>
                        <div class="col-lg-7 col-6"><p class="tap_text">BCH Balance</p></div>

                    </div>
                    <div class="row text-center">
                        <div class="col-lg-12"><p class="tap_text">6466.3654646496</p></div>
                    </div>
                    <hr class="h">
                    <div class="row text-center">
                        <div class="col-lg-12 time_track text-left">
                            <p>Send BCH</p>
                        </div>
                        <div class="col-lg-12">
                            <form action="">
                                <div class="row">
                                    <div class="col-lg-12 form-group">
                                        <input type="text" class="form-control" placeholder="Enter Receiver's BCH address">
                                    </div>
                                    <div class="col-lg-12 form-group">
                                        <input type="text" class="form-control" placeholder="Enter Amount of BCH transfer">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div> -->
                </div>
                <div class="tab-pane fade" id="senderc" role="tabpanel" aria-labelledby="senderc_tab">
                  Coming soon...
                    <!-- <div class="row pt-2">
                        <div class="col-lg-5 col-6 p-0 text-right"><img src="images/dashboardNew/Etherum.png" alt="es" width="30" height="30"></div>
                        <div class="col-lg-7 col-6"><p class="tap_text">ERC 20 Balance</p></div>

                    </div>
                    <div class="row text-center">
                        <div class="col-lg-12"><p class="tap_text">6466.3654646496</p></div>
                    </div>
                    <hr class="h">
                    <div class="row text-center">
                        <div class="col-lg-12 time_track text-left">
                            <p>Send ERC 20</p>
                        </div>
                        <div class="col-lg-12">
                            <form action="">
                                <div class="row">
                                    <div class="col-lg-12 form-group">
                                        <input type="text" class="form-control" placeholder="Enter Receiver's ERC 20 address">
                                    </div>
                                    <div class="col-lg-12 form-group">
                                        <input type="text" class="form-control" placeholder="Enter Amount of ERC 20 transfer">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div> -->
                </div>
                <div class="tab-pane fade" id="sendxrp" role="tabpanel" aria-labelledby="sendxrp_tab">
                  Coming soon...
                    <!-- <div class="row pt-2">
                        <div class="col-lg-5 col-6 p-0 text-right"><img src="images/dashboardNew/Etherum.png" alt="es" width="30" height="30"></div>
                        <div class="col-lg-7 col-6"><p class="tap_text">XRP Balance</p></div>

                    </div>
                    <div class="row text-center">
                        <div class="col-lg-12"><p class="tap_text">6466.3654646496</p></div>
                    </div>
                    <hr class="h">
                    <div class="row text-center">
                        <div class="col-lg-12 time_track text-left">
                            <p>Send XRP</p>
                        </div>
                        <div class="col-lg-12">
                            <form action="">
                                <div class="row">
                                    <div class="col-lg-12 form-group">
                                        <input type="text" class="form-control" placeholder="Enter Receiver's XRP address">
                                    </div>
                                    <div class="col-lg-12 form-group">
                                        <input type="text" class="form-control" placeholder="Enter Amount of XRP transfer">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div> -->
                </div>
              </div>
        </div>
     </div>
</div>
