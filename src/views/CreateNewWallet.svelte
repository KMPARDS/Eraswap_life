<script>
    import Navbar from './NavBar.svelte'
    let size = 256;
    let is_256 = true;
    let mnemonic = bip39.generateMnemonic(size).split(" ");
    let saved_mnemonic = mnemonic;
    let wallet_password="";
    let wallet = "";
    let status = 1;  // 1=> noted mnemonic 2=> submit mnemonic 3=> generate wallet 4=> Loading 5=> Login
    let noted = false;
    function generate_random() {
        status = 1;
        noted = false;
        let size = is_256? 256: 128;
        mnemonic = bip39.generateMnemonic(size).split(" ");
    }
    let matching = false;
    async function generate_wallet(event) {
        if(noted){
            status = 4;
            let wallet = await ethers.Wallet.fromMnemonic(saved_mnemonic.join(" "))
            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(await wallet.encrypt(wallet_password)));
            let dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href",     dataStr     );
            dlAnchorElem.setAttribute("download", "UTC-"+wallet.address+".json");
            dlAnchorElem.click();
            status = 5
        }else{
            alert("Invalid Input ")
        }
    }
    function noted_down() {
        saved_mnemonic = mnemonic.slice();
        noted=true;
        let size = is_256? 6: 3;
        for(let i=0;i<size;i++){
            let index = Math.floor(Math.random()*mnemonic.length);
            mnemonic[index] = "-"
        }
        status = 2
    }
    function check_noted() {
        let elements = document.querySelectorAll(".mnemonic_entry");
        let input_entry = "";
        let word = "";
        for(let e in elements){
            word = elements[e].innerText? elements[e].innerText: elements[e].value;
            input_entry += word +" ";
        }
        noted = input_entry.substring(0,saved_mnemonic.join(" ").length) == saved_mnemonic.join(" ");
        if(noted){
            status = 3
        }
    }

</script>
<Navbar title="Create New Wallet"/>
<input type="checkbox" bind:checked={is_256} on:change={generate_random}>24 words
<button on:click={generate_random}>Generate Random</button>
<div class="container">
<div class="row">
{#each mnemonic as word}
{#if word!='-'}
<div class="col-4 mnemonic_entry">{word}</div>
{:else}
<input type="text" class="col-4 mnemonic_entry">
{/if}
{/each}
</div>
<input type="password" bind:value={wallet_password} class:hide={status!=3}>
<button on:click={generate_wallet} class:hide={status!=3}>Generate Wallet</button>
<div class="spinner-border" role="status" class:hide={status!=4}>
  <span class="sr-only">Loading...</span>
</div>
<button on:click={noted_down} class:hide={status!=1}>Noted Mnemonic</button>
<button on:click={check_noted} class:hide={status!=2}>Submit Mnemonic</button>
<a id="downloadAnchorElem" href="/" style="display:none">Download</a>
<div class:hide={status!=4}>
<h4>Please be patient</h4>
It might take 15 - 45 seconds to generate UTC file

<h4>Don't Lose It</h4>
Be careful, it can not be recovered if you lose it.


<h4>Don't Share It</h4>
Your funds will be stolen if you use this file on a malicious phishing site.


<h4>Make a Backup</h4>
Secure it like the millions of dollars it may one day be worth.
<a href="/dashboard" class:hide={status!=5}>Access your dashboard</a>
</div>
</div>

    <!-- Wrapper -->
    <div id="wrapper" class="wrapper">

        <!-- Header Area -->
        <div class="tm-header tm-header-fixed tm-sticky-header">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-3 col-md-9 col-9">
                        <a class="tm-header-logo" href="index.html">
                            <img src="assets/images/es_newlogo.png" alt="appmyil logo">
                        </a>
                    </div>
                    <div class="col-lg-9 col-md-3 col-3">
                        <nav class="tm-navigation tm-header-navigation">
                            <ul>
                                <li class="current"><a href="index.html">Home</a></li>
                                <li><a href="#tm-area-features">Feature</a></li>
                                <li><a href="#tm-area-screenshots">Screenshot</a></li>
                                <li><a href="#tm-area-team">Team</a></li>
                                <li><a href="#tm-area-pricing">Price</a></li>
                                <li class="tm-navigation-dropdown"><a href="#tm-area-blog">Blog</a>
                                    <ul>
                                        <li><a href="blog.html">Blog Grid</a></li>
                                        <li><a href="blog-without-sidebar.html">Blog Grid Without Sidebar</a></li>
                                        <li><a href="blog-details.html">Blog Details</a></li>
                                        <li><a href="blog-details-without-sidebar.html">Blog Details Without Sidebar</a></li>
                                    </ul>
                                </li>
                                <li><a href="#tm-area-contact">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="tm-mobilenav"></div>
            </div>
        </div>
        <!--// Header Area -->

        <!-- Breadcrumb Area -->

        <div class="container">
            <div class="tm-breadcrumb text-center">
                <h2>Create a new wallet</h2>Already have a wallet?<a href="accessmywallet.html"><u>Access My Wallet</u></a>
            </div>
        </div>
    </div>
    <!--// Breadcrumb Area -->

    <div id="tm-area-pricing" class="tm-pricebox-area tm-section bg-grey ">
        <div class="container center key">
             <div class="nav-center">
                        <ul class="nav nav-pills">
                          <li><a  href="#prices" class="btn btn-default active" style="background: #811515; color:#fff; padding:20px; margin-right: 3px" data-toggle="tab">By Keystore File</a></li>
                          <li><a href="#features" class="btn btn-default"  style="background: #811515; color:#fff; padding:20px"  data-toggle="tab">By Mnemonic Phrase</a></li>

                        </ul>
                      </div>
                <div class="tabbg">
                    <div class="span12 ">
                        <div class="tab-content">
                            <div class="tab-pane active" id="prices">
                                    <div class="center"><h2>Your Password</h2></div>

                                    <form id="tm-mailchimp-form" class="tm-subscribe-form text-center">
                                        <input id="mc-email" type="password                                                                 " placeholder="Please enter At least 9 Characters" required="required">
                                        <p style="text-align: left">Password Strength : Good</p>
                                        <button id="show" type="submit" class="tm-button show"><span style="font-size: 13px; font-weight: 100">Next</span></button>
                                    </form>

                            </div>
                            <div class="tab-pane" id="features">
                                <div class="center"><h2>Your Password</h2></div>
                                <p style="text-align:left; background: whitesmoke; padding: 12px; border-radius: 10px;">
                                        <b>Value</b>
                                        <span style="float:right; color: #811515;">
                                                <i class="fa fa-exchange" aria-hidden="true"></i> Random
                                        </span>
                                    </p>
                                <table id="customers" border="0">
                                    <tr>
                                      <td>1. </td>
                                      <td>2. </td>
                                      <td>3. </td>
                                    </tr>
                                    <tr>
                                      <td>4. </td>
                                      <td>5.</td>
                                      <td>6.</td>
                                    </tr>
                                    <tr>
                                      <td>7.</td>
                                      <td>8.</td>
                                      <td>9.</td>
                                    </tr>
                                    <tr>
                                      <td>10.</td>
                                      <td>11.</td>
                                      <td>12.</td>
                                    </tr>

                                  </table>
                                     <p style="text-align:left; background: whitesmoke; padding: 12px; border-radius: 10px;">
                                        <b>Password</b>
                                         <span style="float:right; color: #811515;">
                                                 <label  class="switch">
                                                    <input id="optional" type="checkbox">
                                                    <span class="slider round"></span>
                                                </label>
                                         </span>
                                     </p>
                                     <div class="opt" style="display: none">
                                         <form id="tm-mailchimp-form" class="tm-subscribe-form text-center">
                                            <input id="mc-email" type="password                                                                 " placeholder="Please enter At least 9 Characters" required="required"><br><br>
                                            <p style="text-align: left; font-weight: 100; font-size: 14px">If you choose to include a password, understand you will ALWAYS need this password with your mnemonic phrase. You can not change it. It becomes a permanent part of your phrase. Read more about the password option here.</p>

                                        </form>
                                    </div>

                                    <a href="#mnemonics" class="tm-button tm-button-sm " data-toggle="modal"><span style="font-size: 13px; font-weight: 100">I Wrote Down My Mnemonic Phrase</span></a>
                                    <br><br>
                                    <p><b>DO NOT FORGET </b>to save your password. You will need this</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center next" style="display:none">
                    <!-- Single Pricebox -->
                    <div class="col-lg-4 col-md-6 col-12 mt-30">
                        <div class="tm-pricebox text-center is-active">
                            <div class="tm-pricebox-header">
                                <h4>By Keystore File</h4>
                            </div>
                            <div class="tm-pricebox-body">
                                <div class="tm-pricebox-price">
                                    <h5>
                                        <span class="tm-pricebox-price-unit">Save My Keystore FIle</span>
                                    </h5>
                                </div>
                                <ul style="text-align: left">
                                    <li>
                                        <h4 style="line-height: 5px; font-size:18px">Don't Lose It </h4>
                                        <span>Be careful, it can not be recovered if you lose it.</span>
                                    </li>
                                    <hr>
                                    <li>
                                        <h4 style="line-height: 5px;font-size:18px"> Don't Share It </h4>
                                        <span>Your funds will be stolen if you use this file on a malicious phishing site.</span>
                                    </li>
                                    <hr>
                                    <li>
                                        <h4 style="line-height: 5px; font-size:18px">  Make a Backup</h4>
                                        <span>Secure it like the millions of dollars it may one day be worth.</span>
                                    </li>
                                    <hr>

                                </ul>
                            </div>
                            <div class="tm-pricebox-footer">
                                <a href="#costumModal10" class="tm-button tm-button-sm tm-button-dark" data-toggle="modal"><span>Download Keystore File</span></a>
                            </div>
                        </div>
                    </div>
                    <!--// Single Pricebox -->

                </div><br>


        </div>
    <!--// Pricing Area -->
    <div id="costumModal10" class="modal" data-easein="bounceIn"  tabindex="-1" role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>
                    </div>
                    <div class="modal-body" style="text-align: center">
                        <img src="assets/images/success.png" alt="" height="100"><br><br>
                        <h1>Succeed</h1>
                        <p>
                            You have created a wallet successfully
                        </p>
                    </div>
                    <div class="modal-footer">
                       <a href="access-my-wallet.html" ><button class="btn btn-primary">
                            Access My Wallet
                        </button></a>
                    </div>
                </div>
            </div>
        </div>
        <div id="mnemonics" class="modal" data-easein="bounceIn"  tabindex="-1" role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>
                        </div>
                        <div class="modal-body" style="text-align: center">
                            <h4>Verification</h4>
                            <p>
                                Please enter and fill out the empty boxes below to verify your mnemonic phrase key.
                            </p>
                            <table id="customers" border="0">
                                    <tr>
                                      <td>1. </td>
                                      <td>2. </td>
                                      <td>3. </td>
                                    </tr>
                                    <tr>
                                      <td>4. </td>
                                      <td>5.</td>
                                      <td>6.</td>
                                    </tr>
                                    <tr>
                                      <td>7.</td>
                                      <td>8.</td>
                                      <td>9.</td>
                                    </tr>
                                    <tr>
                                      <td>10.</td>
                                      <td>11.</td>
                                      <td>12.</td>
                                    </tr>

                                  </table>
                        </div>
                        <div class="modal-footer">
                           <a href="access-my-wallet.html" ><button class="btn btn-primary">
                                Verify
                            </button></a>
                        </div>
                    </div>
                </div>
            </div>
    <!-- Footer Area -->
    <div class="tm-footer bg-gradient">
        <div class="tm-footer-bgshape">
            <img src="assets/images/download-bgshape.png" alt="footer background shape">
        </div>
        <div class="container">
            <div class="tm-footer-toparea tm-padding-section">
                <div class="row widgets tm-footer-widgets">
                    <div class="col-xl-5 col-lg-4 col-md-6 col-12">
                        <div class="single-widget widget-info">
                            <a href="index.html" class="widget-info-logo">
                                <img src="assets/images/es_newlogo.png" alt="appmyil logo">
                            </a>
                            <p>Dolor enim sit et perferendis quia in. Sed perferendis aliquid quo vel necessitatibus commodi similique et. Veniam ducimus sed rerum cumque ipsum eos omnis eos blanditiis.</p>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-md-6 col-12">
                        <div class="single-widget widget-quicklinks">
                            <h5 class="widget-title">Services</h5>
                            <ul>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">FAQs</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-md-6 col-12">
                        <div class="single-widget widget-quicklinks">
                            <h5 class="widget-title">Support</h5>
                            <ul>
                                <li><a href="#">Help center</a></li>
                                <li><a href="#">How it work</a></li>
                                <li><a href="#">Terms of use</a></li>
                                <li><a href="#">Forum</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div class="single-widget widget-recentpost">
                            <h5 class="widget-title">Recent Posts</h5>
                            <ul>
                                <li>
                                    <div class="widget-recentpost-content">
                                        <h6><a href="blog-details.html">Fundamental analysis
                                                    services</a></h6>
                                        <span>August 01, 2019</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="widget-recentpost-content">
                                        <h6><a href="blog-details.html">Steps to a successful
                                                    Business</a></h6>
                                        <span>August 01, 2019</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tm-footer-bottomarea">
                <div class="row align-items-center">
                    <div class="col-md-7">
                        <!-- <p class="tm-footer-copyright">Copyright 2019 <a href="#">appmyil</a>. Designed by <a href="#">thememarch</a></p> -->
                    </div>
                    <div class="col-md-5">
                        <ul class="tm-footer-social">
                            <li>
                                <a href="#">
                                    <i class="zmdi zmdi-facebook"></i>
                                    <i class="zmdi zmdi-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="zmdi zmdi-dribbble"></i>
                                    <i class="zmdi zmdi-dribbble"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="zmdi zmdi-behance"></i>
                                    <i class="zmdi zmdi-behance"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="zmdi zmdi-twitter"></i>
                                    <i class="zmdi zmdi-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="zmdi zmdi-pinterest"></i>
                                    <i class="zmdi zmdi-pinterest"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--// Footer Area -->

    </div>
    <!--// Wrapper -->






<style>
.hide{
    display: none;
}
</style>

