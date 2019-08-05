<script>
    import Navbar from './NavBar.svelte'
    import Footer from './Footer.svelte'
    let balance = "-";
    let address = "-";
    let error_message = "";
    let website = "";
    (async () => {
        try{
            balance = String(await ethers.utils.formatEther(String(await wallet.getBalance())));
            address = await wallet.getAddress();
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
        console.log(event);
        let url = event.srcElement.attributes.data.value;
    	website = await window.open( url, this);
    }

</script>
<style>
.tm-funfact{padding:0px}
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
</style>
<div  style="background:linear-gradient(90deg, #6b1111 0%, #170301 100%)">
    <Navbar title="Access My Wallet"/>
    </div>
    <br><br><br><br>
        <div class="tm-breadcrumb text-center">
            <h2 style="font-size: 32px; font-weight:100">Dashboard</h2>
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
  <div class="row justify-content-center">

                        <!-- Single Pricebox -->
                        <div class="col-lg-4 col-md-6 col-12 mt-30">
                            <div class="tm-pricebox text-center">
                                <div class="tm-pricebox-header">
                                    <h4>Basic</h4>
                                </div>
                                <div class="tm-pricebox-body">                                  
                                    <ul>
                                        <li>ETH Balance - {balance}</li>
                                        <li> Address - {address}</li>
                                        <!-- <li>Webmail Access</li> -->
                                        <!-- <li class="disabled">Unlimited attachment</li> -->
                                        <!-- <li class="disabled">SSL Security</li> -->
                                    </ul>
                                </div>
                                <div class="tm-pricebox-footer">
                                    <button class="col-6" data="http://localhost:8000/login" on:click={load_website}>Computeex</button>
                                </div>
                            </div>
                        </div>
                        <!--// Single Pricebox -->

  </div>
<div class="row">
    <div class="col-6">
        ETH Balance - {balance}
        <br>
        Address - {address}
    </div>
</div>
<div class="row">
<button class="btn btn-default offset-xl-5"  data-toggle="modal" data-target="#mnemonics"  style="display: none">Submit Mnemonic</button>
<br><br><br><br>
  
         <div id="mnemonics" class="modal" data-easein="bounceIn"  tabindex="-1" role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>
                        </div>
                        <div class="modal-body" style="text-align: center">
                            <div class="col-lg-12">
                            <div class="tm-subscribe-content text-center">
                                <h3>Join Daswappers Affiliate Programme</h3>
                                <p>Subscribe our newsletter and get notifications to stay update</p>
                                <form id="tm-mailchimp-form" class="tm-subscribe-form text-center">                                    
                                    <button id="mc-submit" type="button" class="tm-button"><span>Accept</span></button>
                                    <button id="mc-submit" type="button" class="tm-button"><span>Reject</span></button>
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
<div id="tm-area-about" class="tm-about-area tm-section tm-padding-section" style="background: #eef2f4">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-12">
                            <div class="tm-sectiontitle text-center">
                                <!-- <h2>About Era Swap Life</h2> -->                               
                                  <h2><b>Why One App Era Swap Life</b></h2>
                                   <span class="tm-sectiontitle-divider"><img src="/images/divider-logo.png"></span>
                                   <br><br>                               
                            </div>
                            
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-lg-12">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/1App_web_logos-01.png" alt="">
                                    </span>                                                                         
                                </div>
                            </div> 
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/A.png" alt=""  data="http://timeswappers.com/wallet-login" on:click={load_website}>
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/b.png" alt="">
                                    </span>
                                </div>
                            </div> 
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/c.png" alt="">
                                    </span>
                                </div>
                            </div> 
                          
                        </div>
                       
                        <br><br>
                         <div class="row">
                           <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/d.png" alt="">
                                    </span>
                                </div>
                            </div> 
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/e.png" alt="">
                                    </span>
                                </div>
                            </div> 
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/f.png" alt="">
                                    </span>
                                </div>
                            </div> 
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/g.png" alt="">
                                    </span>
                                </div>
                            </div> 
                             
                        </div>
                         <br><br>                        
                    </div>
                </div>
                </div>
  </div>
<Footer />