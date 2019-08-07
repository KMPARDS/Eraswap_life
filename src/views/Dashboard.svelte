<script>
    import Navbar from './NavBar.svelte'
    import Footer from './Footer.svelte'
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
                console.log("website not loaded")
            }
        }
    });


    async function load_website(event) {
        console.log(event);
        let url = event.srcElement.attributes.data.value;
    	website = await window.open( url, this);
    }

    // function load_dayswappers() {
    //     console.log("sadf")
    //     document.getElementById("computeex").click();
    // }
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
</style>
<div  style="background:linear-gradient(90deg, #6b1111 0%, #170301 100%)">
    <Navbar title="Access My Wallet"/>
    </div>
    <br><br><br><br>
        <div class="tm-breadcrumb text-center">
            <!-- <h2 style="font-size: 32px; font-weight:100"></h2> -->
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
        <div class="col-lg-8 col-md-6 col-12 mt-30">
            <div class="tm-pricebox text-center">
                <div class="tm-pricebox-header">
                    <h4>Dashboard</h4>
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
            </div>
        </div>
        <!--// Single Pricebox -->
  </div>
  <br><br>

<div class="row">
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
                                    <button id="mc-submit" type="button" class="tm-button" ><span  data="http://dayswappers.org" on:click={load_website}>Now</span></button>
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
        <div id="tm-area-about" class="tm-about-area tm-section tm-padding-section" style="background: #eef2f4">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-12">
                            <div class="tm-sectiontitle text-center">
                                <!-- <h2>About Era Swap Life</h2> -->                               
                                  <h2><b>Era Swap Life is Gateway to</b></h2>
                                   <span class="tm-sectiontitle-divider"><img src="/images/divider-logo-min.png"></span>
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
                                        <img src="/images/1App_web_logos-01-min.png" alt="">
                                    </span>                                                                         
                                </div>
                            </div> 
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/A-min.png" alt=""  data="http://timeswappers.com/wallet-login" on:click={load_website}>
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/b-min.png" alt="">
                                    </span>
                                </div>
                            </div> 
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/c-min.png" alt="" data="http://13.233.92.48/wallet-login" on:click={load_website}>
                                    </span>
                                </div>
                            </div> 
                          
                        </div>
                       
                        <br><br>
                         <div class="row">
                           <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/d-min.png" alt="" data="http://localhost:8080/" on:click={load_website}>
                                    </span>
                                </div>
                            </div> 
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/e-min.png" alt="">
                                    </span>
                                </div>
                            </div> 
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/f-min.png" alt="">
                                    </span>
                                </div>
                            </div> 
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/g-min.png" alt="" data="https://www.timeally.io/" on:click={load_website}>
                                    </span>
                                </div>
                            </div>
                        </div><br><br>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="tm-funfact text-center">
                                    <span class="tm-funfact-icon">
                                        <img src="/images/betdeex-logo-min.png" alt="">
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