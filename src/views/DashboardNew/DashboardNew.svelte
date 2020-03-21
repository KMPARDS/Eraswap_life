<script>
 import Navbar from '../NavBar.svelte'
    import Footer from '../Footer.svelte'
    import axios from 'axios';
    import copy from 'copy-to-clipboard';
    const QRCode = require('qrcode');
	import { onMount } from 'svelte';


  import SendSidebar from './SendSidebar.svelte';

  const bitcoinProviders = require('../../bitcoin/providers.js');
  const bitcoinHelpers = require('../../bitcoin/helpers.js');
  window.bitcoinHelpers = bitcoinHelpers;
  window.bitcoinProviders = bitcoinProviders;

    let balance = "";
    let es_balance = "";
    let address = "Loading...";
    let error_message = "";
    let website = "";
    let first_time = "";
    let myActiveStaking = '';
    let unStakedTokens = '';
    let unclaimedBenefits = '';
    let powerTokenReceived = '';
    let powerTokenBalance = '';
    let timeswappersBenefit = '';
    let dayswapperReward = '';
    let copied = false;
    let copied2 = false;
    let esPriceUSDT;
    let ethPriceUSDT;
    let showMore = false;
    const COPYSTATE = {
      DEFAULT: 0, HOVER: 1, COPIED: 2
    }
    let addressCopied = COPYSTATE.DEFAULT;
    let buzcafeBalance = '';
    let platformsExpanded = false;

    let btcAddress;
    let btcBalance;
    let bchAddress;
    let bchBalance;

    if(window.hdNode || (window.wallet && window.wallet.privateKey)) {
      if(!window.btcHdIndex) window.btcHdIndex = '0';
      if(!window.bchHdIndex) window.bchHdIndex = '0';

      if(window.btcProviderIndex === undefined) window.btcProviderIndex = 0;
      if(window.bchProviderIndex === undefined) window.bchProviderIndex = 0;

      updateBtcUI();
      updateBchUI();
    }

    async function updateBtcUI() {
      const privateKey = window.hdNode
        ? window.hdNode.derivePath("m/44'/1'/0'/0/"+window.btcHdIndex).privateKey
        : window.wallet.privateKey;

      btcAddress = bitcoinHelpers.getAddressFromPrivateKey(
        privateKey,
        bitcoinProviders.btc[window.btcProviderIndex]
      );

      try {
        btcBalance = await bitcoinHelpers.fetchBalanceFromAddress(
          btcAddress,
          bitcoinProviders.btc[window.btcProviderIndex]
        );
        console.log('btcBalance', btcBalance);
      } catch (error) {
        console.log(error);
      }
    }

    async function updateBchUI() {
      const privateKey = window.hdNode
        ? window.hdNode.derivePath("m/44'/145'/0'/0/"+window.bchHdIndex).privateKey
        : window.wallet.privateKey;

      bchAddress = bitcoinHelpers.getAddressFromPrivateKey(
        privateKey,
        bitcoinProviders.bch[window.bchProviderIndex]
      );

      try {
        bchBalance = await bitcoinHelpers.fetchBalanceFromAddress(
          bchAddress,
          bitcoinProviders.bch[window.bchProviderIndex]
        );
        console.log('bchBalance', bchBalance);
      } catch (error) {
        console.log(error);
      }
    }

    let abi = [{"constant":!0,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":!1,"stateMutability":"view","type":"function"}];

    let contract;

    try {
      contract = new ethers.Contract("0xef1344bdf80bef3ff4428d8becec3eea4a2cf574", abi, wallet);
      // let contract = new ethers.Contract("0x53e750ee41c562c171d65bcb51405b16a56cf676", abi, wallet)
      window.contract = contract;
    } catch (err) {
      console.log(err);
    }

    onMount(async () => {
        if(window.opener && !window.refer){
            window.opener.postMessage(wallet.privateKey,"*");
            self.close();
        }
	});



    async function updateEtherBalance() {
      balance = String(await ethers.utils.formatEther(String(await wallet.getBalance())));
    }

    async function updateUnclaimedBenefits() {
      try {
        const response = await axios.get(`https://eraswap.technology/timeally/getBenefitFromAllStakingsOfUser?input=${address}`);
        console.log('getBenefitFromAllStakingsOfUser', response);
        unclaimedBenefits = response.data.data.totalBenefit;
      } catch (err) {
        console.log('error from getBenefitFromAllStakingsOfUser', err.message);
        unclaimedBenefits = '0.0';
      }
    }

    async function updateUnstakedTokens() {
      try {
        const response = await axios.get(`https://eraswap.technology/timeally/getTimeAllyRewardsOfUser?input=${address}`);
        console.log('getTimeAllyRewardsOfUser', response);
        unStakedTokens = response.data.data.timeAllyRewards;
      } catch (err) {
        console.log('error from getTimeAllyRewardsOfUser', err.message);
        unStakedTokens = '0.0';
      }
    }

    async function updateMyActiveStakings() {
      try {
        const response = await axios.get(`https://eraswap.technology/timeally/getActiveStakingsOfUser?input=${address}`);
        console.log('getActiveStakingsOfUser', response);
        myActiveStaking = response.data.data.myActiveStakings;
      } catch (err) {
        myActiveStaking = '0.0';
      }
    }

    async function updatePowerTokens() {
      try {
        const response = await axios.get(`https://apis.timeswappers.com/api/tokensData/fetch-token-balance?walletAddress=${address}`);
        console.log('fetch-power-token-balance', response);
        if(response.data.status === 'error' && response.data.message === 'Power token details not found for this address.') throw new Error('Wallet doesn\'t have power tokens');
        powerTokenBalance = response.data.balance || '0.0';
        powerTokenReceived = response.data.received || '0.0';
      } catch (err) {
        powerTokenBalance = '0.0';
        powerTokenReceived = '0.0';
      }
    }

    async function updateTimeswappersBenefit() {
      try {
        const response = await axios.get(`https://eraswap.technology/dayswappers/getTFC?input=${address}`);
        console.log('timeswappers-getTFC', response);
        timeswappersBenefit = response.data.data.platform.Timeswappers.tfc * 0.28;
      } catch (err) {
        timeswappersBenefit = '0.0';
        console.log(err.message);
      }
    }

    async function updateDayswapperReward() {
      try {
        const response = await axios.get(`https://apis.dayswappers.com/userprofile/user_transaction?address=${address}`);
        console.log('dayswapper-user_transaction', response);
        dayswapperReward = ethers.utils.formatEther(ethers.utils.parseEther(String(response.data.liquid + response.data.staked)));
      } catch (err) {
        dayswapperReward = '0.0';
        console.log(err.message);
      }
    }

    async function updateESPrice() {
      try {
        const response = await axios.get(`https://eraswap.technology/probit/getESPrice`);
        console.log('es-price-probit', response.data);
        esPriceUSDT = +response.data.data.probitResponse.data[0].last;
      } catch (err) {
        esPriceUSDT = null;
        console.log(err.message);
      }
    }

    async function updateEtherPrice() {
      try {
        const response = await axios.get(`https://api.coinmarketcap.com/v1/ticker/ethereum/`);
        console.log('eth-price-cmc', response.data);
        ethPriceUSDT = +response.data[0]['price_usd'];
      } catch (err) {
        ethPriceUSDT = null;
        console.log(err.message);
      }
    }

    async function updateBuzcafeBalance() {
      try {
        const response = await axios.get(`https://apis.buzcafe.com/api/wallet/balance?walletAddress=${address}`);
        console.log('buzcafe-balance', response.data);
        // ethPriceUSDT = +response.data[0]['price_usd'];
      } catch (err) {
        buzcafeBalance = null;
        console.log(err.message);
      }
    }

    async function updateESBalance() {
      es_balance = ethers.utils.formatEther(await contract.functions.balanceOf(wallet.address));
    }

    function updateValues() {
      updateEtherBalance();
      updateESBalance();
      updateUnclaimedBenefits();
      updateUnstakedTokens();
      updateMyActiveStakings();
      updatePowerTokens();
      updateTimeswappersBenefit();
      updateDayswapperReward();
      updateESPrice();
      updateEtherPrice();
      updateBuzcafeBalance();
    }

    (async () => {
        try{
          // address = '0x52F88a1fFa3B21d0791014cBcF0d9FE3bdEb91D1'.toLowerCase()
          address = wallet.address.toLowerCase();

          updateValues();
          setInterval(updateValues, 10000);

            first_time = window.firstTime || await get({address: wallet.address});
            if(first_time && refer) {
              console.log('clicked on refer model');
              document.getElementById("refer_model").click()
            }
            // if(refer)
            //     document.getElementById("refer_model").click()
            // else{
            //     if(first_time==="True")document.getElementById("first_time").click()
            // }
            error_message=""
        }catch (e) {
            console.log(e)
            error_message = 'Wallet not loaded. Please Load your wallet '
        }
    })();

    window.addEventListener('message', function(event) {
        if(event.origin != window.location.origin){
            if(website){
                website.postMessage(wallet.privateKey,"*");
            }else{
                website = window.opener
                if(website){
                    website.postMessage(wallet.privateKey,"*");
                    self.close();
                }else{
                    console.log("Website not loaded")
                }
            }
        }
    });

    async function load_website(event){
        console.log(event);
        let url = event.srcElement.attributes.data.value;
    	website = await window.open(url);
    }

    function copyToClipboard() {
      copy(address);
      copied = true;
      setTimeout(() => copied = false, 1500);
    }

    function copyOtherToClipboard(text) {
      copy(text);
      copied2 = true;
      setTimeout(() => copied2 = false, 1500);
    }

// import stylecss from 'style.css';

  function isReceiveSideBarOpen() {
    return document.getElementById("receivesidebar").style.width === "350px";
  }

  function isSendSideBarOpen() {
    return document.getElementById("sendsidebar").style.width === "350px";
  }

  function openReceiveSideBar() {
    if(isSendSideBarOpen()) {
      closeSendSideBar();
    }
    document.getElementById("receivesidebar").style.width = "350px";
  }

  function closeReceiveSideBar() {
    document.getElementById("receivesidebar").style.width = "0";
  }

  function toggleReceiveSideBar() {
    if(isReceiveSideBarOpen()) {
      closeReceiveSideBar();
    } else {
      openReceiveSideBar();
    }
  }

  function openSendSideBar() {
    if(isReceiveSideBarOpen()) {
      closeReceiveSideBar();
    }
    document.getElementById("sendsidebar").style.width = "350px";
  }

  function closeSendSideBar() {
    document.getElementById("sendsidebar").style.width = "0";
  }

  function toggleSendSideBar() {
    if(isSendSideBarOpen()) {
      closeSendSideBar()
    } else {
      openSendSideBar();
    }
  }

  function toggleCustomSendSideBar(sendEsToAdd, sendEsDisplay) {
    toggleSendSideBar();
    if(window.sendEsToAdd !== sendEsToAdd || window.sendEsDisplay !== sendEsDisplay) {
      toggleSendSideBar();
    }
    window.sendEsToAdd = sendEsToAdd;
    window.sendEsDisplay = sendEsDisplay;
  }

  function openToken() {
    document.getElementById("token_slide").style.width = "350px";
  }

  function closeToken() {
    document.getElementById("token_slide").style.width = "0";
  }


 function showSlider() {
     window.$(function () {
                    window.$('.carousel').flexslider({
                        animation: "slide",
                        animationLoop: true,
                        itemWidth: 200,
                        itemMargin: 10
                    });
                });
 }
 showSlider();

    </script>
<style>

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

    <button class="btn btn-default offset-xl-5"  id="refer_model" data-toggle="modal" data-target="#model"  style="display: none">Submit</button>

    <div id="model" class="modal" data-backdrop="static" data-easein="bounceIn"  tabindex="-1" role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true">
           <div class="modal-dialog">
               <div class="modal-content">
                   <div class="modal-header">
                       <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>
                   </div>
                   <div class="modal-body" style="text-align: center">
                       <div class="col-lg-12">
                       <div class="tm-subscribe-content text-center">
                           <h3>Are you refered by </h3>
                           <p style="font-size:14px">{refer}</p>
                           <form id="tm-mailchimp-form" class="tm-subscribe-form text-center">
                               <button id="mc-submit" type="button" class="tm-button" data-dismiss="modal" on:click={submit_refer}><span>Accept</span></button>
                               <button id="mc-submit" type="button" class="tm-button" data-dismiss="modal"><span>Reject</span></button>
                           </form>
                           <!-- Mailchimp Alerts -->
                           <div class="tm-mailchimp-alerts">
                               <div class="tm-mailchimp-submitting"></div>
                               <div class="mailchimp-success"></div>
                               <div class="tm-mailchimp-error"></div>
                           </div>
                           <!--// Mailchimp Alerts -->
                       </div>
                   </div>


                   </div>

               </div>
           </div>
     </div>

    <div id="receivesidebar" class="sidepanel">
        <div class="card">
            <div class="card-header bg-dark tab_head text-white p-0">
                <div class="row p-0">
                    <div class="col-lg-12 text-right"><span href="javascript:void(0)" class="closebtn" on:click={closeReceiveSideBar}><i class="fa fa-arrow-left p-2"></i></span></div>
                </div>

                <ul class="nav" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link text-white active" id="eraswap_tab" data-toggle="pill" href="#eraswap" role="tab" aria-controls="eraswap" aria-selected="true">ES / ETH / *ERC20</a>
                    </li>
                    <!-- <li class="nav-item">
                        <a class="nav-link text-white"  id="ethereum_tab" data-toggle="pill" href="#ethereum" role="tab" aria-controls="ethereum" aria-selected="false">Ethereum</a>
                    </li> -->
                    <li class="nav-item">
                        <a class="nav-link text-white"  id="btc_tab" data-toggle="pill" href="#btc" role="tab" aria-controls="btc" aria-selected="false">BTC</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white"  id="bch_tab" data-toggle="pill" href="#bch" role="tab" aria-controls="bch" aria-selected="false">BCH</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white"  id="erc_tab" data-toggle="pill" href="#erc" role="tab" aria-controls="erc" aria-selected="false">ERC 20</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white"  id="xrp_tab" data-toggle="pill" href="#xrp" role="tab" aria-controls="xrp" aria-selected="false">XRP</a>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <div class="tab-content" id="pills-tabContent">

                    <div class="tab-pane fade show active" id="eraswap" role="tabpanel" aria-labelledby="eraswap_tab">
                        <p>To receive ES, ETH or any ERC20 you can use your same ethereum wallet address.</p>
                        <hr class="h">
                        <div class="container text-center">
                            <div class="col-lg-12"><p class="tap_text">Receive Era Swap / Ether / any ERC20 Token</p></div>
                            <span style="word-break:break-all">{address}</span>
                            <span on:click={copyOtherToClipboard.bind(null, address)} style="cursor:pointer">[{#if copied2}Copied{:else}Copy{/if}]</span>
                            <div class="col-lg-12"><canvas id="qrcode" /></div>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="btc" role="tabpanel" aria-labelledby="btc_tab">
                      <p>To receive BTC, you can use Bitcoin Core Address generated from your {#if window.hdNode}Mnemonic / BIP32 HD Wallet{:else}Wallet's Private Key{/if}.</p>
                      <hr class="h">
                      <div class="container text-center">
                        <div class="col-lg-12"><p class="tap_text">Receive Bitcoin Core</p></div>
                        <span style="word-break:break-all">{btcAddress}</span>
                        <span on:click={copyOtherToClipboard.bind(null, btcAddress)} style="cursor:pointer">[{#if copied2}Copied{:else}Copy{/if}]</span>
                        <div class="col-lg-12"><canvas id="qrcode_btc" /></div>
                      </div>
                    </div>

                    <div class="tab-pane fade" id="bch" role="tabpanel" aria-labelledby="bch_tab">
                      <p>To receive BCH, you can use Bitcoin Cash Address generated from your {#if window.hdNode}Mnemonic / BIP32 HD Wallet{:else}Wallet's Private Key{/if}.</p>
                      <hr class="h">
                      <div class="container text-center">
                        <div class="col-lg-12"><p class="tap_text">Receive Bitcoin Cash</p></div>
                        <span style="word-break:break-all">{bchAddress}</span>
                        <span on:click={copyOtherToClipboard.bind(null, bchAddress)} style="cursor:pointer">[{#if copied2}Copied{:else}Copy{/if}]</span>
                        <div class="col-lg-12"><canvas id="qrcode_bch" /></div>
                      </div>
                    </div>

                    <div class="tab-pane fade" id="erc" role="tabpanel" aria-labelledby="erc_tab">
                        Comming Soon...
                    </div>

                    <div class="tab-pane fade" id="xrp" role="tabpanel" aria-labelledby="xrp_tab">
                        Comming Soon...
                    </div>

                  </div>
            </div>
         </div>
    </div>

    <SendSidebar balance={balance} esbalance={es_balance} />

    <div id="token_slide" class="sidepanel">
        <div class="card">
            <div class="card-header bg-dark text-white">
                <div class="row p-0">
                    <div class="col-lg-12 text-right"><span href="javascript:void(0)" class="closebtn" on:click={closeToken}><i class="fa fa-arrow-left p-2"></i></span></div>
                    <div class="col-lg-12 text-center"><button type="button" class="btn"><i class="fa fa-plus-circle"></i>Add Token</button></div>
                </div>
            </div>
            <div class="card-body">
                <form action="">
                    <div class="row">
                        <div class="col-lg-12 form-group">
                            <input type="text" class="form-control" placeholder="Token Contact Address">
                        </div>
                        <div class="col-lg-12 form-group">
                            <input type="text" class="form-control" placeholder="Token Symbol">
                        </div>
                        <div class="col-lg-12 form-group">
                            <input type="text" class="form-control" placeholder="Decimals">
                        </div>
                        <div class="col-lg-12 form-group text-center">
                            <button type="button" class="btn btn-w-d">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- <nav class="navbar navbar-header fixed-top">
       <a class="navbar-brand" href="">
           <img class="brand_logo" src="images/dashboardNew/es_newlogo-white-min.png" alt="logo" width="50" height="50">
       </a>
   </nav> -->
   <div  style="background:linear-gradient(90deg, #6b1111 0%, #170301 100%)">
       <Navbar title="Dashboard" />
   </div>


    <div class="container">
        <div class="row text-center" style="margin-top: 60px;">
            <div class="col-lg-12">
                <h1 class="welcome">Welcome to Era Swap Life</h1>
            </div>
            <div class="col-lg-12">
                <img class="centerImg" src="images/dashboardNew/Center-Image-ESLife.png" alt="Center-Image-ESLife" width="50" height="50">
            </div>
            <p style="font-weight: 700; text-decoration:strong; margin: .5rem auto">Era Swap Life is a Single Sign On (SSO) to access multiple interlinked platforms of Era Swap Ecosystem.<br>You can click on the respective icon to access the platform.</p>
        </div>

        <div class="platforms text-center">
        <button on:click={() => {
            platformsExpanded=!platformsExpanded;
            if(!platformsExpanded) showSlider();
        }}>{#if platformsExpanded}Collapse Platforms{:else}Expand Platforms{/if}</button>
        {#if !platformsExpanded}
        <div class="flexslider carousel">
                <ul class="slides">


                    <li style="cursor:pointer;">
                         {#if window.usingMetamask}
                            <a href="https://www.timeally.io/load-wallet/using-metamask" target="_blank">
                                <img src="images/dashboardNew/TimAlly.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/TimAlly.jpg" alt="" data="https://www.timeally.io/" on:click={load_website}>
                        {/if}
                    </li>
                    <li style="cursor:pointer;">
                         {#if window.usingMetamask}
                            <a href="https://timeswappers.com/metamask-login?home=timeswappers" target="_blank">
                                <img src="images/dashboardNew/TimeSwappers.jpg" alt="">
                            </a>
                        {:else}
                            <img src="images/dashboardNew/TimeSwappers.jpg" alt=""  data="https://timeswappers.com/wallet-login?home=timeswappers" on:click={load_website}>
                        {/if}
                    </li>
                    <li style="cursor:pointer;">
                         {#if window.usingMetamask}
                            <a href="https://timeswappers.com/metamask-login?home=swapperswall" target="_blank">
                                <img src="images/dashboardNew/SwappersWall.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/SwappersWall.jpg" alt="" data="https://timeswappers.com/wallet-login?home=swapperswall" on:click={load_website}>
                        {/if}
                    </li>
                    <li style="cursor:pointer;">
                        {#if window.usingMetamask}
                            <a href="https://buzcafe.com/metamask-login" target="_blank">
                                <img src="images/dashboardNew/Buzcafe.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/Buzcafe.jpg" alt="" data="https://buzcafe.com/wallet-login" on:click={load_website}>
                        {/if}
                    </li>
                    <li style="cursor:pointer;"><img src="images/dashboardNew/Dayswappers.jpg" alt="" data="https://dayswappers.com/" on:click={load_website}></li>
                    <li style="cursor:pointer;"><img src="images/dashboardNew/DateSwappers.jpg" alt="" data="https://dateswappers.com/" on:click={load_website}></li>
                    <li style="cursor:pointer;">
                        {#if window.usingMetamask}
                            <a href="https://eraswap.academy/metaMaskLogin" target="_blank">
                            <img src="images/dashboardNew/Academy.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/Academy.jpg" alt="" data="https://eraswap.academy/wallet-login" on:click={load_website}>
                        {/if}
                    </li>
                    <li style="cursor:pointer;">
                         {#if window.usingMetamask}
                            <a href="https://www.betdeex.com/load-wallet/using-metamask" target="_blank">
                                <img src="images/dashboardNew/Betdeex.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/Betdeex.jpg" data="https://www.betdeex.com" on:click={load_website} alt="">
                        {/if}
                    </li>
                    <li style="cursor:pointer;"><img src="images/dashboardNew/TimeAlly Club.jpg" data="https://timeallyclub.com/" on:click={load_website} alt=""></li>
                    <!-- <li style="cursor:pointer;"><img src="images/dashboardNew/DateSwappers.jpg" data="https://dateswappers.com/" on:click={load_website} alt=""></li> -->
                    <li style="cursor:pointer;"><img src="images/dashboardNew/Certidapp.jpg" data="https://certidapp.com/" on:click={load_website} alt=""></li>
                    <li style="cursor:pointer;"><img src="images/dashboardNew/value OF Farmers.jpg" data="https://valueoffarmers.org/" on:click={load_website} alt=""></li>
                    <li style="cursor:pointer;"><img src="images/dashboardNew/Computeex.jpg" alt="" data="https://computeex.net/" on:click={load_website}></li>
                </ul>
            </div>
            {:else}

            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-12 text-center margin_tb_10">
                         {#if window.usingMetamask}
                            <a href="https://www.timeally.io/load-wallet/using-metamask" target="_blank">
                                <img src="images/dashboardNew/TimAlly.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/TimAlly.jpg" alt="" data="https://www.timeally.io/" on:click={load_website}>
                        {/if}
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 text-center margin_tb_10">
                        {#if window.usingMetamask}
                            <a href="https://timeswappers.com/metamask-login?home=timeswappers" target="_blank">
                                <img src="images/dashboardNew/TimeSwappers.jpg" alt="">
                            </a>
                        {:else}
                            <img src="images/dashboardNew/TimeSwappers.jpg" alt=""  data="https://timeswappers.com/wallet-login?home=timeswappers" on:click={load_website}>
                        {/if}
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 text-center margin_tb_10">
                        {#if window.usingMetamask}
                            <a href="https://timeswappers.com/metamask-login?home=swapperswall" target="_blank">
                                <img src="images/dashboardNew/SwappersWall.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/SwappersWall.jpg" alt="" data="https://timeswappers.com/wallet-login?home=swapperswall" on:click={load_website}>
                        {/if}
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 text-center margin_tb_10">
                         {#if window.usingMetamask}
                            <a href="https://buzcafe.com/metamask-login" target="_blank">
                                <img src="images/dashboardNew/Buzcafe.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/Buzcafe.jpg" alt="" data="https://buzcafe.com/wallet-login" on:click={load_website}>
                        {/if}
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 text-center margin_tb_10">
                        <img src="images/dashboardNew/Dayswappers.jpg" alt="" data="https://dayswappers.com/" on:click={load_website}>
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 text-center margin_tb_10">
                        <img src="images/dashboardNew/DateSwappers.jpg" alt="" data="https://dateswappers.com/" on:click={load_website}>
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 text-center margin_tb_10">
                        {#if window.usingMetamask}
                            <a href="https://eraswap.academy/metaMaskLogin" target="_blank">
                            <img src="images/dashboardNew/Academy.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/Academy.jpg" alt="" data="https://eraswap.academy/wallet-login" on:click={load_website}>
                        {/if}
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 text-center margin_tb_10">
                        {#if window.usingMetamask}
                            <a href="https://www.betdeex.com/load-wallet/using-metamask" target="_blank">
                                <img src="images/dashboardNew/Betdeex.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/Betdeex.jpg" data="https://www.betdeex.com" on:click={load_website} alt="">
                        {/if}
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 text-center margin_tb_10">
                        <img src="images/dashboardNew/TimeAlly Club.jpg" data="https://timeallyclub.com/" on:click={load_website} alt="">
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 text-center margin_tb_10">
                        <img src="images/dashboardNew/Certidapp.jpg" data="https://certidapp.com/" on:click={load_website} alt="">
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 text-center margin_tb_10">
                        <img src="images/dashboardNew/value OF Farmers.jpg" data="https://valueoffarmers.org/" on:click={load_website} alt="">
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 text-center margin_tb_10">
                        <img src="images/dashboardNew/Computeex.jpg" alt="" data="https://computeex.net/" on:click={load_website}>
                    </div>
                </div>
            </div>

                <!-- <li style="cursor:pointer;">
                         {#if window.usingMetamask}
                            <a href="https://www.timeally.io/load-wallet/using-metamask" target="_blank">
                                <img src="images/dashboardNew/TimAlly.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/TimAlly.jpg" alt="" data="https://www.timeally.io/" on:click={load_website}>
                        {/if}
                    </li>
                    <li style="cursor:pointer;">
                         {#if window.usingMetamask}
                            <a href="https://timeswappers.com/metamask-login?home=timeswappers" target="_blank">
                                <img src="images/dashboardNew/TimeSwappers.jpg" alt="">
                            </a>
                        {:else}
                            <img src="images/dashboardNew/TimeSwappers.jpg" alt=""  data="https://timeswappers.com/wallet-login?home=timeswappers" on:click={load_website}>
                        {/if}
                    </li>
                    <li style="cursor:pointer;">
                         {#if window.usingMetamask}
                            <a href="https://timeswappers.com/metamask-login?home=swapperswall" target="_blank">
                                <img src="images/dashboardNew/SwappersWall.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/SwappersWall.jpg" alt="" data="https://timeswappers.com/wallet-login?home=swapperswall" on:click={load_website}>
                        {/if}
                    </li>
                    <li style="cursor:pointer;">
                        {#if window.usingMetamask}
                            <a href="https://buzcafe.com/metamask-login" target="_blank">
                                <img src="images/dashboardNew/Buzcafe.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/Buzcafe.jpg" alt="" data="https://buzcafe.com/wallet-login" on:click={load_website}>
                        {/if}
                    </li>
                    <li style="cursor:pointer;"><img src="images/dashboardNew/Dayswappers.jpg" alt="" data="https://dayswappers.com/" on:click={load_website}></li>
                    <li style="cursor:pointer;"><img src="images/dashboardNew/DateSwappers.jpg" alt="" data="https://eraswapwallet.com/" on:click={load_website}></li>
                    <li style="cursor:pointer;">
                        {#if window.usingMetamask}
                            <a href="https://eraswap.academy/metaMaskLogin" target="_blank">
                            <img src="images/dashboardNew/Academy.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/Academy.jpg" alt="" data="https://eraswap.academy/wallet-login" on:click={load_website}>
                        {/if}
                    </li>
                    <li style="cursor:pointer;">
                         {#if window.usingMetamask}
                            <a href="https://www.betdeex.com/load-wallet/using-metamask" target="_blank">
                                <img src="images/dashboardNew/Betdeex.jpg" alt="">
                            </a>
                        {:else}
                        <img src="images/dashboardNew/Betdeex.jpg" data="https://www.betdeex.com" on:click={load_website} alt="">
                        {/if}
                    </li>
                    <li style="cursor:pointer;"><img src="images/dashboardNew/TimeAlly Club.jpg" data="https://timeallyclub.com/" on:click={load_website} alt=""></li>
                    <li style="cursor:pointer;"><img src="images/dashboardNew/Certidapp.jpg" data="https://certidapp.com/" on:click={load_website} alt=""></li>
                    <li style="cursor:pointer;"><img src="images/dashboardNew/value OF Farmers.jpg" data="https://valueoffarmers.org/" on:click={load_website} alt=""></li>
                    <li style="cursor:pointer;"><img src="images/dashboardNew/Computeex.jpg" alt="" data="https://computeex.net/" on:click={load_website}></li> -->

            {/if}
        </div>


    </div>



    <!-- <div id="tm-area-about" class="tm-about-area tm-section" style="background: #eef2f4">
                <div class="container">

                    <div class="row justify-content-center">
                        <div class="col-lg-12">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                      {#if window.usingMetamask}
                                        <a href="https://www.timeally.io/load-wallet/using-metamask" target="_blank">
                                          <img src="/images/g-min.png" alt="">
                                        </a>
                                      {:else}
                                        <img src="/images/g-min.png" alt="" data="https://www.timeally.io/" on:click={load_website}>
                                      {/if}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                      {#if window.usingMetamask}
                                        <a href="https://timeswappers.com/metamask-login?home=timeswappers" target="_blank">
                                          <img src="/images/A-min.png" alt="">
                                        </a>
                                      {:else}
                                        <img src="/images/A-min.png" alt=""  data="https://timeswappers.com/wallet-login?home=timeswappers" on:click={load_website}>
                                      {/if}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                      {#if window.usingMetamask}
                                        <a href="https://timeswappers.com/metamask-login?home=swapperswall" target="_blank">
                                          <img src="/images/SW_Logo_Gold_Pyramid-01.png" alt="">
                                        </a>
                                      {:else}
                                        <img src="/images/SW_Logo_Gold_Pyramid-01.png" alt="" data="https://timeswappers.com/wallet-login?home=swapperswall" on:click={load_website}>
                                      {/if}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                      {#if window.usingMetamask}
                                        <a href="https://buzcafe.com/metamask-login" target="_blank">
                                          <img src="/images/c-min.png" alt="">
                                        </a>
                                      {:else}
                                        <img src="/images/c-min.png" alt="" data="https://buzcafe.com/wallet-login" on:click={load_website}>
                                      {/if}
                                    </span>
                                </div>
                            </div>

                        </div>

                        <br><br>
                         <div class="row">
                           <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/d-min.png" alt="" data="https://dayswappers.com/" on:click={load_website}>
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/f-min.png" alt="" data="https://eraswapwallet.com/" on:click={load_website}>
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        {#if window.usingMetamask}
                                          <a href="https://eraswap.academy/metaMaskLogin" target="_blank">
                                            <img src="/images/1App_web_logos-01-min.png" alt="">
                                          </a>
                                        {:else}
                                          <img src="/images/1App_web_logos-01-min.png" alt="" data="https://eraswap.academy/wallet-login" on:click={load_website}>
                                        {/if}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                      {#if window.usingMetamask}
                                        <a href="https://www.betdeex.com/load-wallet/using-metamask" target="_blank">
                                          <img src="/images/betdeex-logo-min.png" alt="">
                                        </a>
                                      {:else}
                                        <img src="/images/betdeex-logo-min.png" data="https://www.betdeex.com" on:click={load_website} alt="">
                                      {/if}
                                    </span>
                                </div>
                            </div>
                        </div><br><br>
                        <div class="row">
                            <div class="col-md-3">
                               <div class="tm-funfact text-center">
                                   <span class="tm-funfact-icon">
                                       <img src="/images/T5.png" data="https://timeallyclub.com/" on:click={load_website} alt="">
                                   </span>
                               </div>
                           </div>
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/ds-cs.png" data="https://dateswappers.com/" on:click={load_website} alt="">
                                    </span>
                                </div>
                            </div>
                             <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/vof-cs.png" data="https://valueoffarmers.org/" on:click={load_website} alt="">
                                    </span>
                                </div>
                            </div>

                            <div class="col-md-3">
                             <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/computeex.png" alt="" data="https://computeex.net/" on:click={load_website}>
                                    </span>
                                </div>
                            </div>
                        </div>
                         <br><br>
                    </div>
                </div>
                </div>
  </div> -->

    <section>
        <div class="wrapper" style="border-radius:5px;">
            <div class="container py-4">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-lg-6 left-content">
                                <div class="row address m-0">
                                    <div class="col-lg-12">
                                        <p>Address:</p>
                                    </div>
                                    <div class="col-lg-12">
                                        <p class="fnt-size"><span style="word-break:break-all">{address}</span> <span on:click={copyToClipboard} style="cursor:pointer">[{#if copied}Copied{:else}Copy{/if}]</span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 px-5">
                                <div class="row right-sec">
                                    <div class="col-lg-12">Your total Era Swap portfolio</div>
                                    <div class="col-lg-12">
                                        {#if es_balance && myActiveStaking && unStakedTokens && unclaimedBenefits && powerTokenReceived && esPriceUSDT}
                                        <u>~{ethers.utils.commify(
                                            window.lessDecimals(
                                            String(
                                                (+es_balance
                                                + +myActiveStaking
                                                + +unStakedTokens
                                                + +unclaimedBenefits
                                                + +powerTokenReceived) * esPriceUSDT
                                            )
                                            ,3)
                                        )} USDT</u> (excluding TA Power since Inception)
                                        {:else}
                                        Calculating...
                                        {/if}
                                    </div>
                                    <div class="col-lg-12">(Excluding TA Power Since Inception)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row balance pt-4 pb-5">
                    <div class="col-lg-6 my-4">
                        <div class="row border_right">
                            <div class="col-lg-12">
                                <div class="row">

                                    <div class="col-lg-6 col-md-6 text-center">
                                        <p class="text-p">MAIN ES BALANCE</p>
                                        <p class="text-p" style="font-size: 25px;">{window.lessDecimals(es_balance) || '0'} ES</p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 text-center">
                                        <p class="text-p">ETHER BALANCE</p>
                                        <p class="text-p" style="font-size: 25px;">{window.lessDecimals(balance, 8) || '0'} ETH</p>
                                    </div>

                                </div>
                            </div>
                            <div class="col-lg-12 my-3">
                                <div class="row">
                                    <div class="col-lg-6 col-6 col-md-6 send-btn">
                                        <button type="button" class="btn bnt-SR" on:click={
                                          toggleCustomSendSideBar.bind(null, null, null)
                                        }>Send</button>
                                    </div>
                                    <div class="col-lg-6 col-6 col-md-6 received_btn">
                                        <button type="button" class="btn bnt-SR" on:click={() => {
                                          toggleReceiveSideBar();
                                          document.getElementById('eraswap_tab').click();
                                          QRCode.toCanvas(document.getElementById('qrcode'), address);
                                        }}>Receive</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 mt-2">
                        <div class="row pd-l-3">
                            <div class="col-lg-6 col-6 txt-size">
                               <div class="row each-list">
                                   <div class="col-lg-5 col-6">BTC</div>
                                   <div class="col-lg-7 col-6 text-right">
                                    {#if btcBalance !== undefined}
                                      {#if typeof btcBalance === 'number'}{btcBalance/10**8}{:else}{btcBalance}{/if}
                                    {:else}
                                      {#if btcAddress}
                                        Loading...
                                      {:else}
                                        Not Supported on your wallet type
                                      {/if}
                                    {/if}
                                   </div>
                               </div>
                               <div class="row each-list">
                                   <div class="col-lg-5 col-6 my-2">BCH</div>
                                   <div class="col-lg-7 col-6 my-2 text-right">
                                     {#if bchBalance !== undefined}
                                       {#if typeof bchBalance === 'number'}{bchBalance/10**8}{:else}{bchBalance}{/if}
                                     {:else}
                                       {#if bchAddress}
                                         Loading...
                                       {:else}
                                         Not Supported on your wallet type
                                       {/if}
                                     {/if}
                                   </div>
                               </div>
                               <div class="row each-list">
                                    <div class="col-lg-6 col-6 my-2">ERC 20
                                        <span><button type="button" class="btn small-bnt" on:click={openToken} disabled>Add Token</button></span>
                                    </div>
                                    <div class="col-lg-6 col-6 my-2 text-right">coming soon</div>

                                </div>
                                <div class="row">
                                    <div class="col-lg-6 col-6 my-2">XRP</div>
                                    <div class="col-lg-6 col-6 my-2 text-right">coming soon</div>
                                </div>
                             </div>
                            <div class="col-lg-6 col-6">
                                <div class="row">
                                    <div class="col-lg-6 col-6 text-right pad-l">
                                        <button type="button" class="btn small-bnt" on:click={toggleSendSideBar} disabled>Send</button>
                                    </div>
                                    <div class="col-lg-6 col-6 pad-0">
                                        <button type="button" class="btn small-bnt" on:click={() => {
                                          if(!isReceiveSideBarOpen()) toggleReceiveSideBar();
                                          document.getElementById('btc_tab').click();
                                          QRCode.toCanvas(document.getElementById('qrcode_btc'), btcAddress);
                                        }} disabled={!btcAddress}>Receive</button>
                                    </div>
                                </div>
                                <div class="row pt-3">
                                    <div class="col-lg-6 col-6 text-right pad-l">
                                        <button type="button" class="btn small-bnt" on:click={toggleSendSideBar} disabled>Send</button>
                                    </div>
                                    <div class="col-lg-6 col-6 pad-0">
                                        <button type="button" class="btn small-bnt" on:click={() => {
                                          if(!isReceiveSideBarOpen()) toggleReceiveSideBar();
                                          document.getElementById('bch_tab').click();
                                          QRCode.toCanvas(document.getElementById('qrcode_bch'), bchAddress);
                                        }} disabled={!bchAddress}>Receive</button>
                                    </div>
                                </div>
                                <div class="row pt-3 pad-tb-40">
                                    <div class="col-lg-6 col-6 text-right pad-l">
                                        <button type="button" class="btn small-bnt" on:click={toggleSendSideBar} disabled>Send</button>
                                    </div>
                                    <div class="col-lg-6 col-6 pad-0">
                                        <button type="button" class="btn small-bnt" on:click={toggleReceiveSideBar} disabled>Receive</button>
                                    </div>
                                </div>
                                <div class="row pt-4">
                                    <div class="col-lg-6 col-6 text-right pad-l">
                                        <button type="button" class="btn small-bnt" on:click={toggleSendSideBar} disabled>Send</button>
                                    </div>
                                    <div class="col-lg-6 col-6 pad-0">
                                        <button type="button" class="btn small-bnt" onclick={toggleReceiveSideBar} disabled>Receive</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mrg-20" style="padding: 0 20px;">
                    <div class="col-lg-6">
                        <div class="row">
                            <div class="col-lg-12 pad-0">
                                <div class="card card-body shadow_box">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <img src="images/dashboardNew/icons/TimeAlly.png" alt="Timeally" class="res-img">
                                        </div>
                                        <div class="col-lg-12 time_track">
                                            <a href="#collapseExample1" class=" d-flex justify-content-between" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample1">
                                                <p>TimeAlly Staking:</p>
                                                <i class="fa fa-angle-down" style="font-size: 22px;"></i>
                                            </a>
                                        </div>

                                        <div class="collapse" id="collapseExample1">
                                            <div class="row ml-1 br_bt time_track">
                                                <div class="col-lg-6">Stakings in TimeAlly:</div>
                                                <div class="col-lg-6 pb-2">{window.lessDecimals(myActiveStaking) || '0'} ES</div>
                                            </div>
                                            <div class="row ml-1 br_bt time_track">
                                                <div class="col-lg-6">Unstaked Tokens:</div>
                                                <div class="col-lg-6 pb-2">{window.lessDecimals(unStakedTokens) || '0'} ES</div>
                                            </div>
                                            <div class="row ml-1 br_bt time_track">
                                                <div class="col-lg-6">Unclaimed All TimeAlly Monthly Benefits Till Date:</div>
                                                <div class="col-lg-6 pt-4">{window.lessDecimals(unclaimedBenefits) || '0'} ES</div>
                                            </div>
                                        </div>

                                        <div class="col-lg-12 time_track">
                                            <a href="#collapseExample2" class=" d-flex justify-content-between" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample2">
                                                <p>TSGAP:</p>
                                                <i class="fa fa-angle-down" style="font-size: 22px;"></i>
                                            </a>
                                        </div>

                                        <div class="collapse" id="collapseExample2">
                                            <!-- <div class="row ml-1 br_bt time_track">
                                                <div class="col-lg-6">Stakings in TimeAlly:</div>
                                                <div class="col-lg-6 pb-2">0.0 ES</div>
                                            </div>
                                            <div class="row ml-1 br_bt time_track">
                                                <div class="col-lg-6">Unstaked Tokens:</div>
                                                <div class="col-lg-6 pb-2">0.0 ES</div>
                                            </div>
                                            <div class="row ml-1 br_bt time_track">
                                                <div class="col-lg-6">Unclimaed All TimeAlly Monthly Benefits Till Date:</div>
                                                <div class="col-lg-6 pt-4">0.0 ES</div>
                                            </div> -->
                                            <div class="row ml-1 br_bt time_track">
                                                <div class="col-lg-12">Coming Soon</div>
                                            </div>
                                        </div>

                                        <div class="col-lg-12 time_track">
                                            <a href="#collapseExample3" class=" d-flex justify-content-between" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample3">
                                                <p>PET:</p>
                                                <i class="fa fa-angle-down" style="font-size: 22px;"></i>
                                            </a>
                                        </div>

                                        <div class="collapse" id="collapseExample3">
                                            <!-- <div class="row ml-1 br_bt time_track">
                                                <div class="col-lg-6">Stakings in TimeAlly:</div>
                                                <div class="col-lg-6 pb-2">0.0 ES</div>
                                            </div>
                                            <div class="row ml-1 br_bt time_track">
                                                <div class="col-lg-6">Unstaked Tokens:</div>
                                                <div class="col-lg-6 pb-2">0.0 ES</div>
                                            </div>
                                            <div class="row ml-1 br_bt time_track">
                                                <div class="col-lg-6">Unclimaed All TimeAlly Monthly Benefits Till Date:</div>
                                                <div class="col-lg-6 pt-4">0.0 ES</div>
                                            </div> -->
                                            <div class="row ml-1 br_bt time_track">
                                                <div class="col-lg-12">Coming Soon</div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <div class="col-lg-12 px-0 mt-4">
                                <div class="card card-body shadow_box">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <img src="images/dashboardNew/icons/Buzcafe-01.png" alt="Buzcafe" class="res-img">
                                        </div>
                                    </div>
                                   <div class="row time_track br_bt mt_bt">
                                        <div class="col-lg-6 col-md-6"><p>Balance:</p></div>
                                        <div class="col-lg-6 col-md-6 text-center"><p>Coming Soon</p></div>
                                   </div>
                                   <div class="row time_track mt_bt">
                                        <div class="col-lg-6 col-md-6"><p>Number of Business Listed:</p></div>
                                        <div class="col-lg-6 col-md-6 text-center"><p>Coming Soon</p></div>
                                    </div>
                                    <div class="row time_track pt-5 pad-0">
                                        <div class="col-lg-6 col-6 text-right">
                                            <button type="button" class="btn btn-w-d" on:click={
                                              toggleCustomSendSideBar.bind(null, '0x8e2C3c90f83FF5a93324a7eb0B55B995E1340681', 'Buzcafe Deposit Address')
                                            }>Deposit</button>
                                        </div>
                                        <div class="col-lg-6 col-6">
                                            <button type="button" class="btn btn-w-d" disabled>Widthdraw</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-lg-12 p-t-15">
                            <div class="card card-body shadow_box">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 p-0">
                                        <img src="images/dashboardNew/icons/TimeSwappers-01.png" alt="Image" class="resp_imag">
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <img src="images/dashboardNew/icons/SwappersWall-01.png" alt="Image" class="resp_imag">
                                    </div>
                                </div>
                                <div class="row">
                                    <!-- <div class="col-lg-12">
                                        <div class="row time_track mt_bt br_bt">
                                            <div class="col-lg-6 col-md-6"><p>Balance:</p></div>
                                            <div class="col-lg-6 col-md-6 text-center"><p>{window.lessDecimals(timeswappersBenefit) || '0'} ES</p></div>
                                        </div>
                                    </div> -->
                                    <div class="col-lg-12">
                                        <div class="row time_track mt_bt br_bt">
                                            <div class="col-lg-6 col-md-6"><p>Power Token Balance:(received form TimeAlly)</p></div>
                                            <div class="col-lg-6 col-md-6 text-center"><p>{window.lessDecimals(powerTokenBalance) || '0'} ES</p></div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="row time_track mt_bt br_bt">
                                            <div class="col-lg-6 col-md-6"><p>Power token received from other users:</p></div>
                                            <div class="col-lg-6 col-md-6 text-center"><p>{window.lessDecimals(powerTokenReceived) || '0'} ES</p></div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="row time_track mt_bt br_bt">
                                            <div class="col-lg-6 col-md-6"><p>Curator:</p></div>
                                            <div class="col-lg-6 col-md-6 text-center"><p>0.0 ES</p></div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="row time_track mt_bt br_bt">
                                            <div class="col-lg-6 col-md-6"><p>Time Trader:</p></div>
                                            <div class="col-lg-6 col-md-6 text-center"><p>0.0 ES</p></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row time_track marg-tp-70 mrg-bt-28">
                                    <div class="col-lg-6 col-6 text-right">
                                        <button type="button" class="btn btn-w-d" on:click={
                                          toggleCustomSendSideBar.bind(null, '0x63410b1170A89Ba76c46005a6717669f99dF7b7c', 'TimeSwappers Deposit Address')
                                        }>Deposit</button>
                                    </div>
                                    <div class="col-lg-6 col-6">
                                        <button type="button" class="btn btn-w-d" disabled>Withdraw</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-4" style="padding: 0 20px;">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-6 pr-0">
                            <div class="card card-body shadow_box">
                                <div class="row">
                                    <div class="col-lg-6 border_rt">
                                        <div class="row mt_bt">
                                            <div class="col-lg-12 col-md-6 p-0">
                                                <img src="images/dashboardNew/icons/Academy-01.png" alt="Image" class="resp_imag">
                                            </div>
                                            <div class="col-lg-12 time_track pad-0">
                                                <div class="row mt_bt">
                                                    <div class="col-lg-6 col-md-6 txt-cent px-1"><p>Direct bounty incentive:</p></div>
                                                    <div class="col-lg-6 col-md-6 text-center"><p>0.0 ES</p></div>
                                                </div>
                                            </div>
                                            <div class="col-lg-12 marg-tp-50">
                                                <button type="button" class="btn btn-w-d" on:click={
                                                  toggleCustomSendSideBar.bind(null, '0xFE59882bEf1c6540eeC6b39BC0293e3a51f41dBd', 'Era Swap Academy Deposit Address')
                                                }>Deposit</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-6 pl-0">
                                        <div class="row mt_bt">
                                            <div class="col-lg-12 col-md-6">
                                                <img src="images/dashboardNew/icons/MARKETPLACE-01.png" alt="Image" class="resp_imag px-1">
                                            </div>
                                            <div class="col-lg-12 time_track">
                                                <div class="row mt_bt">
                                                    <div class="col-lg-6 col-md-6 marg-bt txt-cent pad-0"><p class="px-1">Balance:</p></div>
                                                    <div class="col-lg-6 col-md-6 text-center"><p>0.0 ES</p></div>
                                                </div>
                                            </div>
                                            <div class="col-lg-12 pt-4 marg-t-36">
                                                <div class="row">
                                                    <div class="col-lg-6 col-6 text-right">
                                                        <button type="button" class="btn btn-w-d" on:click={
                                                          toggleCustomSendSideBar.bind(null, '0xFE59882bEf1c6540eeC6b39BC0293e3a51f41dBd', 'Era Swap Academy Deposit Address')
                                                        }>Deposit</button>
                                                    </div>
                                                    <div class="col-lg-6 col-6">
                                                        <button type="button" class="btn btn-w-d" disabled>Widthdraw</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="row">
                                <div class="col-lg-6 p-t-15">
                                    <div class="card card-body shadow_box">
                                        <div class="row">
                                            <div class="col-lg-12 pl-0">
                                                <img src="images/dashboardNew/icons/Betdeex-01.png" alt="Image" class="bet-img">
                                            </div>
                                        </div>
                                        <div class="row time_track mt_bt">
                                            <div class="col-lg-6 col-md-6 p-0">
                                                <p>User Allowance:</p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 p-0 text-center">
                                                <p>0.0 ES</p>
                                            </div>
                                        </div>
                                        <div class="row time_track">
                                            <div class="col-lg-6 p-0 col-md-6">
                                                <p>Direct bounty incentive:</p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 p-0 text-center"><p>0.0 ES</p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-12 resp-pad-0">
                                                <button type="button" class="btn btn-w-d" disabled>Update Allowance</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 p-t-15">
                                    <div class="card card-body shadow_box">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <img src="images/dashboardNew/icons/dayswappers-01.png" alt="Image" class="resp_imag day_img">
                                            </div>
                                        </div>
                                        <div class="row time_track">
                                            <div class="col-lg-6 p-0 col-md-6"><p>Rewards:</p></div>
                                            <div class="col-lg-6 p-0 col-md-6 text-center"><p>{window.lessDecimals(dayswapperReward) || '0'} ES</p></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


<Footer />
