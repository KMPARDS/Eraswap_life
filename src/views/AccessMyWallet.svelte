<script>
    import Navbar from './NavBar.svelte'
    let mnemonic="";
    let error_message="";
    function load_wallet() {
        try{
            let provider = new ethers.providers.InfuraProvider("kovan");
            let wallet = ethers.Wallet.fromMnemonic(mnemonic);
            window.wallet = new ethers.Wallet(wallet.privateKey, provider)
            document.getElementById("dashboard").click()
        }catch (e) {
            error_message = "Invalid Mnemonic";
        }
    }
</script>

    <Navbar title="Dashboard"/>

 <div class="container">
                <div class="tm-breadcrumb text-center">
                    <h2 style="font-size: 32px; font-weight:100">Access My Wallet</h2>Do not have a wallet? 
                    <!-- <a href="createmywallet.html" class="tm-button"><span>Create A New Wallet</span></a> -->
                </div>
                <div class="row">
                    <!-- Single Pricebox -->
                    <div class="offset-xl-4 col-lg-4 col-md-6 col-12 mt-30">
                        <div class="tm-pricebox text-center">
                            <div class="tm-pricebox-header">
                                <h4>Access through mnemonic</h4>
                            </div>
                            <div class="tm-pricebox-body"><br>
                                <img src="assets/images/computer.png" alt="">
                                <div class="tm-pricebox-price">
                                   <textarea bind:value={mnemonic}></textarea>
                                    
                                    <!-- <a href="/dashboard" id="dashboard" style="display: none">Access</a> -->
                                </div>
                                
                            </div>
                            <div class="tm-pricebox-footer">
                                <button class="tm-button tm-button-sm tm-button-dark" on:click={load_wallet}>Access my wallet</button>
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
                    <!--// Single Pricebox -->
                </div>
            </div>              
        <!--// Breadcrumb Area -->
<br><br>
