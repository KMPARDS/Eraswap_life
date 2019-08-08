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
    let provider = new ethers.providers.InfuraProvider("kovan");

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
</div><br><br><br><br>
 <div class="container">
                <div class="tm-breadcrumb text-center">
                    <h2 style="font-size: 32px; font-weight:100">Access My Wallet</h2>Do not have a wallet?
                    <a href="create-new-wallet"><b>Create A New Wallet</b></a><br><br>
                </div>
                <div class="container text-center ">
                    <ul id="myTabs" class="nav nav-pills nav-justified offset-xl-2" role="tablist" data-tabs="tabs">
                        <li class="active"><a href="#Commentary" data-toggle="tab"><button class="tm-button tm-button-sm" style="margin-left: 10px;"><span style=" color:#fff">Keystore File</span></button></a></li>
                        <li><a href="#Videos" data-toggle="tab"><button class="tm-button tm-button-sm" style="margin-left: 10px;"> <span style=" color:#fff">Access through mnemonic</span></button></a></li>
                            <li><a href="#key" data-toggle="tab"><button class="tm-button tm-button-sm" style="margin-left: 10px;"> <span style=" color:#fff">Private Key</span></button></a></li>
                    </ul>
                             <div class="tab-content">
                                 <div role="tabpanel" class="tab-pane fade in active show" id="Commentary">
                                     <div class="row">
                                    <!-- Single Pricebox -->
                                            <div class="col-lg-12 col-md-12 col-12 mt-30">
                                                <div class="tm-pricebox text-center">
                                                    <div class="tm-pricebox-header">
                                                        <h4>Keystore File</h4>
                                                    </div>
                                                    <div class="tm-pricebox-body"><br>
                                                     <div class="row">
                                                            <div class="offset-xl-3 col-md-6">
                                                            <Logo />


                                                        <div class="tm-pricebox-price">
                                                          <input type="file"  on:change={load_keystore}>
                                                        </div>

                                                        <div class="tm-pricebox-price">
                                                          <input type="password" bind:value={wallet_password} placeholder="Enter the Password">
                                                        </div>

                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div class="tm-pricebox-footer">
                                                        <button class="tm-button tm-button-sm" on:click={load_by_keystore}><span style="color:#fff">{load_wallet_message}</span></button>
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
                                                <div class="col-lg-12 col-md-12 col-12 mt-30">
                                                    <div class="tm-pricebox text-center">
                                                        <div class="tm-pricebox-header">
                                                            <h4>Access through mnemonic</h4>

                                                        </div>
                                                        <div class="tm-pricebox-body"><br>
                                                         <div class="row">
                                                            <div class="offset-xl-2 col-md-8">
                                                            <Logo />
                                                             <p>Please type in your mnemonic phrase.</p>
                                                            <div class="tm-pricebox-price">
                                                            <textarea bind:value={mnemonic}></textarea>
                                                            <a href="/dashboard" id="dashboard" style="display: none">Access</a>
                                                            </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        <div class="tm-pricebox-footer">
                                                            <button class="tm-button tm-button-sm" on:click={load_wallet}><span style="color:#fff">Access my wallet</span></button>
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
                                                    <div class="col-lg-12 col-md-12 col-12 mt-30">
                                                        <div class="tm-pricebox text-center">
                                                            <div class="tm-pricebox-header">
                                                                <h4>Private Key</h4>
                                                            </div>
                                                            <div class="tm-pricebox-body"><br>
                                                            <div class="row">
                                                                <div class="offset-xl-3 col-md-6">
                                                                <Logo />
                                                                <input type="text" bind:value={private_key} placeholder="Enter Private Key">
                                                                <div class="tm-pricebox-price">

                                                                </div>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div class="tm-pricebox-footer">
                                                                <button class="tm-button tm-button-sm" on:click={load_by_private}><span style="color:#fff">Access Wallet</span></button>
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
<br><br>

<Footer />
