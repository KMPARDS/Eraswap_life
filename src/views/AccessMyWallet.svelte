<script>
    import Navbar from './NavBar.svelte'
    import Footer from './Footer.svelte'
    import Logo from './Logo.svelte'
    import { ethers } from 'ethers'

    let mnemonic="";
    let error_message="";
    let keystore="";
    let wallet_password="";
    let load_wallet_message = "Load wallet";
    let private_key ="";
    let gotResponse = '';
    // let provider = new ethers.providers.InfuraProvider("homestead", "v3/3837e5b9f0f143f78f02be3aaf5c74e8");
    let accessWalletButtonText = 'Unlock Wallet Now';
    window.testMetamask = true;
    window.usingMetamask = false;

    // for dev purpose
    // mnemonic = 'zero casino code';
    // mnemonic = 'garment relax intact favorite tragic hunt chapter circle energy debate kid joy';
    // load_wallet()
    // wallet = ethers.Wallet.fromMnemonic('garment relax intact favorite tragic hunt chapter circle energy debate kid joy');
    // wallet = wallet.connect(provider);
    // wallet = new ethers.Wallet('24C4FE6063E62710EAD956611B71825B778B041B18ED53118CE5DA5F02E494BA', provider);
    // setTimeout(() => document.getElementById('user-dashboard').click(), 100);

    function getSubmitOnEnterPress() {
      let enterButtonAllowed = true; // to avoid issue due to user pressing enter twice
      return (loadWalletFunction, event) => {
        enterButtonAllowed = true;
        if (event.keyCode === 13 && enterButtonAllowed) {
          enterButtonAllowed = false;
          unlockWalletButton(loadWalletFunction);
        }
      }
    }

    const submitOnEnterPress = getSubmitOnEnterPress();

    function load_wallet() {
      window.usingMetamask = false;
        try{
            mnemonic = mnemonic.split('\n').join('');
            let wallet = window.ethersV4.Wallet.fromMnemonic(mnemonic); // accepts zero casino code
            window.wallet = new ethers.Wallet(wallet.privateKey)
            // document.getElementById("dashboard").click()

            /// @dev using HDNode for deriving bitcoin wallet
            window.hdNode = window.ethersV4.utils.HDNode.fromMnemonic(mnemonic);

            return true;
        }catch (e) {
            error_message = "Invalid Mnemonic";
            console.log(e);
            return false;
        }
    }

    function send_refer() {
      if(window.usingMetamask) {
        // alert('Please check Metamask in your browser and click on Sign to connect to your introducer.');
        gotResponse = 'Please check Metamask in your browser and click on Sign to connect to your introducer.'
      }
      window.refer = document.getElementById('refer-address').value;
      if(window.refer.length === 42 && window.refer.slice(0,2) === '0x') {
        window.refer = window.refer.toLowerCase();
        submit_refer();
      } else {
        alert('please check the address you are entering: ('+window.refer+')');
      }

    }

    window.referResponse = response => {
      if(response === 'Intoducer not found') {
        setTimeout(() => window.refer = '', 100);
      }
      gotResponse = response;
    }

    function load_keystore(event){
    let uploadedFile = event.target.files[0];

    let filename = uploadedFile.name;

    let readFile = new FileReader();
    readFile.onload = function(e) {
        let contents = e.target.result;
        let json = JSON.parse(contents);
        keystore = json;
    };
    readFile.readAsText(uploadedFile);

    document.getElementById('keystore-password').focus();
}

async function load_by_keystore() {
  let returnValue = false;
  window.usingMetamask = false;
  load_wallet_message = "Loading..."
  try{
    if (keystore,typeof(keystore) != "string"){
        keystore = JSON.stringify(keystore)
    }
    window.wallet  = await ethers.Wallet.fromEncryptedJson(keystore, wallet_password)
    window.wallet = new ethers.Wallet(wallet.privateKey)
    returnValue = true;
    // document.getElementById("dashboard").click()
  } catch (e) {
    console.log(e);
    error_message = "Password and keystore do not match"
  }
  load_wallet_message = "Load Wallet";
  return returnValue;
}

async function load_by_private() {
  window.usingMetamask = false;
  try{
    window.wallet = await new ethers.Wallet(private_key);
    window.wallet = new ethers.Wallet(wallet.privateKey)
    // document.getElementById("dashboard").click()
    return true;
  } catch (e) {
    console.log(e);
    error_message = "Invalid private key";
    return false;
  }
}

async function connectMetamask() {
  try {
    window.usingMetamask = true;
    accessWalletButtonText = 'Please check your Metamask';
    window.ethereum.enable();
    await new Promise(function(resolve, reject) {
      const intervalId = setInterval(async() => {

        const onCorrectNetwork = window.web3.currentProvider.networkVersion == 1;
        if(!onCorrectNetwork) throw new Error('Hey bro/sis, you are on testnet, please switch to mainnet.');

        const metamaskWeb3Provider = new ethers.providers.Web3Provider(window.web3.currentProvider);

        window.wallet = metamaskWeb3Provider.getSigner();
        // console.log('window.wallet', window.wallet);
        window.wallet.address = window.wallet.provider._web3Provider.selectedAddress;
        if(window.wallet.address) {
          clearInterval(intervalId);
          resolve();
        }
      }, 1000);
    });
    // console.log('window.wallet', window.wallet);
    alert(`Metamask connection success! Your address is ${window.wallet.address}, you will be prompted with a sign screen. This is a common Web 3.0 authentication for securely and safely registering as a DaySwapper.`);
    return true;

  } catch (e) {
    console.log(e);
    const emessage = e.message.includes('window.ethereum') ? 'It seems that Metamask is not installed. If you already have it installed, please check if it is allowed for EraSwap.Life website.' : e.message;
    error_message = emessage;
    alert('Error: '+emessage);
  }
}

async function unlockWalletButton(loadWalletFunction) {
  accessWalletButtonText = 'Please wait...';

  // if wallet load failed then return
  if(await loadWalletFunction()) {
    // await new Promise(function(resolve, reject) {
      // const intervalId = setInterval(async() => {
        try {
          // console.log('1 print');
          const response = (await get({ address: window.wallet.address.toLowerCase() }));
          // throw new Error('test error');
          window.firstTime = response === 'True';
          // console.log('2 print');
          console.log('firstTime', window.firstTime);
          // do not show refer modal if url refer is not there
          if(!window.firstTime || window.refer) {
            // console.log('a');
            document.getElementById("refer-modal-close-button").click();
            document.getElementById("dashboard").click();
          } else {
            // console.log('b');
            document.getElementById('modal-button').click();
          }
          // console.log('3 print');
        } catch (e) {
          console.log('catch in loadWallet', e.message);
          // document.getElementById("refer-modal-close-button").click();
          document.getElementById("dashboard").click();
        }
      // }, 500);
    // });

  } else {
    accessWalletButtonText = 'Error, Unlock again';
  }
}

</script>
<div  style="background:linear-gradient(90deg, #6b1111 0%, #170301 100%)">
    <Navbar title="Dashboard"/>
</div><br>
 <div class="container">
                <div class="tm-breadcrumb text-center">
               <span class="blinking" >Through this Single Sign-On, you can access all the platforms of Era Swap Ecosystem.</span><br><br>
                    <h2 style="font-size: 20px; font-weight:800">Sign In / Access <br>
                    With existing Wallet <span style="font-size:14px">(Only Ether Wallet)</span>
                    </h2>Do not have a wallet?
                    <a style="font-size: 15px;" href="create-new-wallet"><b>Create A New Wallet</b></a><br><br>
                </div>
                <div class="container text-center" style="margin: -30px auto 0;">
                    <div style="display:inline-block;">
                      <ul id="myTabs" class="nav nav-pills nav-justified" role="tablist" data-tabs="tabs">
                          <li class="active"><a href="#Commentary" data-toggle="tab"><button class="tm-button tm-button-sm" style="margin: 10px; text-align:center"><span style=" color:#fff">Keystore File</span></button></a></li>
                          <li><a href="#Videos" data-toggle="tab"><button class="tm-button tm-button-sm" style="margin: 10px;"> <span style=" color:#fff; text-align:center">Access through mnemonic</span></button></a></li>
                              <li><a href="#key" data-toggle="tab"><button class="tm-button tm-button-sm" style="margin: 10px;"> <span style=" color:#fff; text-align:center">Private Key</span></button></a></li>

                            {#if window.testMetamask}
                              <li><a href="#Metamask" data-toggle="tab"><button class="tm-button tm-button-sm" style="margin: 10px;"> <span style=" color:#fff; text-align:center">Metamask</span></button></a></li>
                            {/if}
                      </ul>
                    </div>
                             <div class="tab-content" style="margin-top:-30px">
                                 <div role="tabpanel" class="tab-pane fade in active show" id="Commentary">
                                     <div class="row">
                                    <!-- Single Pricebox -->
                                            <div class="col-lg-6 col-sm-12 col-md-12 mt-30 offset-xl-3 offset-lg-3">
                                                <div class="tm-pricebox text-center">
                                                    <div class="tm-pricebox-header">
                                                        <h4>Keystore File</h4>
                                                    </div>
                                                    <div class="tm-pricebox-body"><br>
                                                     <div class="row">
                                                            <div class="col-md-12 col-lg-10 col-sm-12 offset-xl-1 offset-lg-1">
                                                             <span class=""><img src="/images/wallet-dash.png" height="30px" alt="S_LIFE"></span><br>
                                                        <div class="tm-pricebox-price">
                                                          <input style="height: 39px" type="file" accept=".json,application/json,application/JSON"  on:change={load_keystore}>
                                                        </div>

                                                        <div class="tm-pricebox-price">
                                                          <input id="keystore-password" style="height: 39px" type="password" on:keyup={submitOnEnterPress.bind(null, load_by_keystore)} bind:value={wallet_password} placeholder="Enter the Password">
                                                        </div>

                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div class="tm-pricebox-footer">
                                                     <button on:click={() => unlockWalletButton(load_by_keystore)} class="btn btn-primary tm-button tm-button-sm"> <span class="text-white">{accessWalletButtonText}</span></button>

                                                    </div>
                                                    {#if error_message != ""}
                                                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        {error_message}
                                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                        </div>
                                                        {/if}
                                                     </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div role="tabpanel" class="tab-pane fade" id="Videos">
                                            <div class="row">
                                                <div class="col-lg-6 col-sm-12 col-md-12 mt-30 offset-xl-3 offset-lg-3">
                                                    <div class="tm-pricebox text-center">
                                                        <div class="tm-pricebox-header">
                                                            <h4>Access through mnemonic</h4>

                                                        </div>
                                                        <div class="tm-pricebox-body"><br>
                                                         <div class="row">
                                                            <div class="col-md-12 col-lg-10 col-sm-12 offset-xl-1 offset-lg-1">
                                                              <span class=""><img src="/images/wallet-dash.png" height="30px" alt="S_LIFE"></span><br>
                                                             <p>Please type in your mnemonic phrase.</p>
                                                            <div class="tm-pricebox-price">
                                                            <textarea on:keyup={submitOnEnterPress.bind(null, load_wallet)} bind:value={mnemonic}></textarea>

                                                            <a href="/dashboard" id="dashboard" style="display: none">Access</a>
                                                            </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        <div class="tm-pricebox-footer">
                                                         <button class="btn btn-primary tm-button tm-button-sm" on:click={
                                                           () => unlockWalletButton(load_wallet)
                                                          }> <span class="text-white">{accessWalletButtonText}</span></button>
                                                            <!-- <button class="tm-button tm-button-sm" on:click={load_wallet}><span style="color:#fff">Access my wallet</span></button> -->
                                                        </div>
                                                        {#if error_message != ""}
                                                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            {error_message}
                                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                            </div>
                                                            {/if}
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                         <div role="tabpanel" class="tab-pane fade in" id="key">
                                            <div class="row">
                                            <!-- Single Pricebox -->
                                                    <div class="col-lg-6 col-sm-12 col-md-12 mt-30 offset-xl-3 offset-lg-3">
                                                        <div class="tm-pricebox text-center">
                                                            <div class="tm-pricebox-header">
                                                                <h4>Private Key</h4>
                                                            </div>
                                                            <div class="tm-pricebox-body"><br>
                                                            <div class="row">
                                                                <div class="col-md-12 col-lg-10 col-sm-12 offset-xl-1 offset-lg-1">
                                                                 <span class=""><img src="/images/wallet-dash.png" height="30px" alt="S_LIFE"></span><br><br>
                                                                <input  type="text" on:keyup={submitOnEnterPress.bind(null, load_by_private)} bind:value={private_key} placeholder="Enter Private Key">
                                                                <div class="tm-pricebox-price">

                                                                </div>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div class="tm-pricebox-footer">
                                                            <button on:click={() => unlockWalletButton(load_by_private)} class="btn btn-primary tm-button tm-button-sm" > <span class="text-white">{accessWalletButtonText}</span></button>
                                                                <!-- <button class="tm-button tm-button-sm" on:click={load_by_private}><span style="color:#fff">Access Wallet</span></button> -->
                                                            </div>
                                                            {#if error_message != ""}
                                                                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                {error_message}
                                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                                </div>
                                                                {/if}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                      {#if window.testMetamask}
                        <div role="tabpanel" class="tab-pane fade in" id="Metamask">
                          <div class="row">
                          <!-- Single Pricebox -->
                            <div class="col-lg-6 col-sm-12 col-md-12 mt-30 offset-xl-3 offset-lg-3">
                              <div class="tm-pricebox text-center">
                                <div class="tm-pricebox-header">
                                  <h4>Metamask</h4>
                                </div>
                                <div class="tm-pricebox-body"><br>
                                  <div class="row">
                                    <div class="col-md-12 col-lg-10 col-sm-12 offset-xl-1 offset-lg-1">
                                      <span class=""><img src="/images/wallet-dash.png" height="30px" alt="S_LIFE"></span><br><br>
                                      <div class="tm-pricebox-price">
                                        <button disabled={accessWalletButtonText === 'Please check your Metamask'} on:click={() => unlockWalletButton(connectMetamask)} class="btn btn-primary tm-button tm-button-sm" > <span class="text-white">{accessWalletButtonText === 'Unlock Wallet Now' ? 'Connect to Metamask' : accessWalletButtonText}</span></button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {#if error_message != ""}
                                  <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    {error_message}
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                {/if}
                              </div>
                            </div>
                          </div>
                        </div>
                      {/if}



                    </div>

                    <!--// Single Pricebox -->
                </div>
            </div>
            <button id="modal-button" data-toggle="modal" data-target="#myModal" style="display:none">{load_wallet_message}</button>
        <!--// Breadcrumb Area -->
             <div class="modal" id="myModal" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog">
                    <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <button id="refer-modal-close-button" type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                    <div class="container">
                         <div class="row">
                            <div class="col-md-12 col-lg-10 col-sm-12 offset-xl-1 offset-lg-1">
                                <img src="/images/wallet-dash.png" style=" display: block; margin-left: auto; margin-right: auto; width: 50%" alt="S_LIFE"><br>
                                <p style="text-align:center">Please enter your Referral Address</p>
                                    <div class="tm-pricebox-price" style="text-align:center">
                                        <input type="text" id="refer-address" placeholder="Enter ETH address of introducer">
                                        <button class="tm-button tm-button-sm" on:click={send_refer}>
                                        <span style=" color:#fff; text-align:center">Connect to Introducer</span>
                                        </button>
                                        <p style="display:{gotResponse?'block':'none'}">{gotResponse}</p>
                                        <button class="tm-button tm-button-sm" style="display:{gotResponse&&(gotResponse==='Intoducer not found'||gotResponse==='success')?'block':'none'};cursor:pointer;margin:auto" on:click={() => {
                                          refer = '';
                                          document.getElementById("refer-modal-close-button").click();
                                          document.getElementById("dashboard").click();
                                        }}><span style=" color:#fff; text-align:center">Okay</span></button>
                                        <h3 style="text-align:center">Or</h3>
                                        <button class="tm-button tm-button-sm" on:click={() => {
                                            document.getElementById("refer-modal-close-button").click();
                                            document.getElementById("dashboard").click();
                                          }}><span style=" color:#fff; text-align:center">I do not have Referral Address</span></button>
                                        <p style="font-size:12px">Note : Referral ID is entered only once at the time of joining Era Swap Ecosystem. If you donot enter the referral ID now, you won't be able to add it later on.   </p>
                                    </div>

                          </div>
                         </div>
                         </div>
                    </div>

                    <!-- Modal footer -->
                    <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div> -->

                    </div>
             </div>
        </div>
<br><br>

<Footer />
