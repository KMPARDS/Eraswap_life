<script>
    import Navbar from './NavBar.svelte'
    let balance = "-";
    let address = "-";
    let error_message = "";
    let website = "";
    let first_time = "";
    (async () => {
        try{
            balance = String(await ethers.utils.formatEther(String(await wallet.getBalance())));
            address = await wallet.getAddress();
            first_time = await get({address: wallet.address})
            if(first_time==="True")
                document.getElementById("first_time").click()
            if(refer)document.getElementById("refer_model").click()

        }catch (e) {
            error_message = 'Wallet not loaded. Please Load your wallet '
        }
    })();

    window.addEventListener('message', function(event) {
        if(event.origin === "http://localhost:8000"){
            if(website){
                website.postMessage(wallet.privateKey,"*");
            }else{
                console.log("website not loaded")
            }
        }
    });


    async function load_website(event) {
        let url = event.srcElement.attributes.data.value;
    	website = await window.open( url, this);
    }
    function load_dayswappers() {
        console.log("sadf")
        document.getElementById("computeex").click();
    }


</script>

<Navbar title="Access My Wallet"/>
            <div class="tm-breadcrumb text-center">
                <h2 style="font-size: 32px; font-weight:100">Access My Wallet</h2>Do not have a wallet? 
                <!-- <a href="createmywallet.html" class="tm-button"><span>Create A New Wallet</span></a> -->
            </div>
<div class="container">
        {#if error_message != ""}
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        {error_message}
        <a href="/access-my-wallet">Here</a>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
</div>
{/if}
<div class="row">
    <div class="col-6">
        ETH Balance - {balance}
        <br>
        Address - {address}
    </div>
</div>
<div class="row">
<button class="col-4" data="http://localhost:8000/login" on:click={load_website} id="computeex">Computeex</button>

<button class="btn btn-default offset-xl-5"  id="refer_model" data-toggle="modal" data-target="#model"  style="display: none">Submit</button>
<button class="btn btn-default offset-xl-5"  id="first_time" data-toggle="modal" data-target="#model2"  style="display: none">asdf</button>

         <div id="model" class="modal" data-easein="bounceIn"  tabindex="-1" role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>
                        </div>
                        <div class="modal-body" style="text-align: center">
                            <div class="col-lg-12">
                            <div class="tm-subscribe-content text-center">
                                <h3>Are you refered by {refer}</h3>
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


         <div id="model2" class="modal" data-easein="bounceIn"  tabindex="-1" role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>
                        </div>
                        <div class="modal-body" style="text-align: center">
                            <div class="col-lg-12">
                            <div class="tm-subscribe-content text-center">
                                <h3>Join Day Swappers Affiliate Programme</h3>
                                <p>You are requested to complete your KYC to be eligible to avail Day Swappers rewards</p>
                                <form id="tm-mailchimp-form" class="tm-subscribe-form text-center">
                                    <button id="mc-submit" type="button" class="tm-button" data="http://dayswappers.org" on:click={load_website}><span>Now</span></button>
                                    <button id="mc-submit" type="button" class="tm-button" data-dismiss="modal"><span>Later</span></button>
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



    </div>
</div>
