<script>
    import Navbar from './NavBar.svelte'
    import Footer from './Footer.svelte'
    import Logo from './Logo.svelte'
    let mnemonic="";
    let error_message="";
    let keystore="";
    let wallet_password="";
    let load_wallet_message = "Load wallet";
    let private_key ="";
    let provider = new ethers.providers.InfuraProvider("homestead");

    function load_wallet() {
        try{
            let wallet = ethers.Wallet.fromMnemonic(mnemonic);
            window.wallet = new ethers.Wallet(wallet.privateKey, provider)
            document.getElementById("dashboard").click()
        }catch (e) {
            error_message = "Invalid Mnemonic";
        }
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
}

async function load_by_keystore() {
    load_wallet_message = "Loading..."
    try{
    if (keystore,typeof(keystore) != "string"){
        keystore = JSON.stringify(keystore)
    }
    window.wallet  = await ethers.Wallet.fromEncryptedJson(keystore, wallet_password)
    window.wallet = new ethers.Wallet(wallet.privateKey, provider)
    document.getElementById("dashboard").click()
}catch (e) {
  console.log(e);
  error_message = "Password and keystore do not match"
}
    load_wallet_message = "Load Wallet";
}

async function load_by_private() {
    try{
        window.wallet = await new ethers.Wallet(private_key);
            window.wallet = new ethers.Wallet(wallet.privateKey, provider)
        document.getElementById("dashboard").click()
    }catch (e) {
        error_message = "Invalid private key";
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
                <div class="container text-center" style="margin-top: -30px;">
                    <ul id="myTabs" class="nav nav-pills nav-justified offset-xl-2 offset-lg-2" role="tablist" data-tabs="tabs">
                        <li class="active"><a href="#Commentary" data-toggle="tab"><button class="tm-button tm-button-sm" style="margin: 10px; text-align:center"><span style=" color:#fff">Keystore File</span></button></a></li>
                        <li><a href="#Videos" data-toggle="tab"><button class="tm-button tm-button-sm" style="margin: 10px;"> <span style=" color:#fff; text-align:center">Access through mnemonic</span></button></a></li>
                            <li><a href="#key" data-toggle="tab"><button class="tm-button tm-button-sm" style="margin: 10px;"> <span style=" color:#fff; text-align:center">Private Key</span></button></a></li>
                    </ul>
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
                                                             <span class=""><img src="/images/S_LIFE.png" height="30px"></span><br>
                                                        <div class="tm-pricebox-price">
                                                          <input style="height: 39px" type="file"  on:change={load_keystore}>
                                                        </div>

                                                        <div class="tm-pricebox-price">
                                                          <input style="height: 39px" type="password" bind:value={wallet_password} placeholder="Enter the Password">
                                                        </div>

                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div class="tm-pricebox-footer">
                                                     <button class="btn btn-primary tm-button tm-button-sm" data-toggle="modal" data-target="#myModal"> <span class="text-white">{load_wallet_message}</span></button>
                                                        <!-- <button class="tm-button tm-button-sm" on:click={load_by_keystore}><span style="color:#fff">{load_wallet_message}</span></button> -->
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
                                                              <span class=""><img src="/images/S_LIFE.png" height="30px"></span><br>
                                                             <p>Please type in your mnemonic phrase.</p>
                                                            <div class="tm-pricebox-price">
                                                            <textarea bind:value={mnemonic}></textarea>
                                                            
                                                            <a href="/dashboard" id="dashboard" style="display: none">Access</a>
                                                            </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        <div class="tm-pricebox-footer">
                                                         <button class="btn btn-primary tm-button tm-button-sm" data-toggle="modal" data-target="#myModal"> <span class="text-white">Access my wallet</span></button>
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
                                         <div role="tabpanel" class="tab-pane fade in active" id="key">
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
                                                                 <span class=""><img src="/images/S_LIFE.png" height="30px"></span><br><br>
                                                                <input  type="text" bind:value={private_key} placeholder="Enter Private Key">
                                                                <div class="tm-pricebox-price">

                                                                </div>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div class="tm-pricebox-footer">
                                                            <button class="btn btn-primary tm-button tm-button-sm" data-toggle="modal" data-target="#myModal"> <span class="text-white">Access Wallet</span></button>
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
                                        </div>

                    <!--// Single Pricebox -->
                </div>
            </div>
        <!--// Breadcrumb Area -->
             <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                    <div class="container">
                         <div class="row">
                            <div class="col-md-12 col-lg-10 col-sm-12 offset-xl-1 offset-lg-1">
                                <img src="/images/S_LIFE.png" style=" display: block; margin-left: auto; margin-right: auto; width: 50%"><br>
                                <p style="text-align:center">Please enter your Referral ID</p>
                                    <div class="tm-pricebox-price">
                                        <input type="text" > 

                                          <h3 style="text-align:center">Or</h3>
                                        <p style="text-align:center"><a href="#">I do not have Referral ID</a></p>   
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
