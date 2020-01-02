<script>
    import Navbar from './NavBar.svelte'
    import Footer from './Footer.svelte'
    import Logo from './Logo.svelte'

	import { onMount, onDestroy } from 'svelte';

    onMount(async () => {
        document.getElementById("pop_up").click();
	    });

      onDestroy(() => {
        if(document.getElementById('terms').getAttribute('class').split(' ').filter(className => className === 'show').length) {
          document.getElementById("pop_up").click();
        }
      });

    let size = 128;
    let is_256 = false;
    let clipboard = bip39.generateMnemonic(size);
    let mnemonic = clipboard.split(" ");
    let saved_mnemonic = mnemonic;
    let wallet_password="";
    let wallet = "";
    let status = 1;  // 1=> noted mnemonic 2=> submit mnemonic 3=> generate wallet 4=> Loading 5=> Login
    let noted = false;
    function generate_random() {
        status = 1;
        noted = false;
        let size = is_256? 256: 128;
        clipboard = bip39.generateMnemonic(size)
        mnemonic = clipboard.split(" ");
    }
    let matching = false;
    async function generate_wallet(event) {
        if(noted){
            status = 4;
            window.wallet = await ethers.Wallet.fromMnemonic(saved_mnemonic.join(" "))
            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent((await window.wallet.encrypt(wallet_password)));
            window.wallet = window.wallet.connect(ethers.getDefaultProvider());
            let dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href",     dataStr     );
            dlAnchorElem.setAttribute("download", "UTC-"+window.wallet.address+".json");
            dlAnchorElem.click();
            status = 5
            document.getElementById("password_modal").click()
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
            input_entry += word && word.toLowerCase() + " ";
        }
        // console.log(input_entry, input_entry.substring(0,saved_mnemonic.join(" ").length), saved_mnemonic.join(" "));
        noted = input_entry.substring(0,saved_mnemonic.join(" ").length) == saved_mnemonic.join(" ");
        if(noted){
            status = 3;
            return true;
        }else{
            status = 2;
            return false;
        }
    }


function myFunction() {
  let copyText = document.getElementById("myInput");
  copyText.select();
  document.execCommand("copy");
  alert("Copied the text: " + copyText.value);
}
</script>

<style>
.hide{
    display: none;
}

.form-control{
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border-bottom: 1px solid #ced4da;
    border-radius: 0;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    border-top: none;
    border-right: none;
    border-left: none;
}

.mnemonic_entry{
  border-bottom: 1px solid #ccc;
  /*padding: 10px;*/
  text-align: center;
  /*margin:5px;*/
}
.switch {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 34px;
}

.switch input {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #888;
  -webkit-transition: .4s;
  transition: .4s;
   border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #811515;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(55px);
}

/*------ ADDED CSS ---------*/
.slider:after
{
 content:'12';
 color: white;
 display: block;
 position: absolute;
 transform: translate(-50%,-50%);
 top: 50%;
 left: 50%;
 font-size: 18px;
 font-family: Verdana, sans-serif;
}

input:checked + .slider:after
{
  content:'24';
}


.red_button {
    background: #a00d08 !important;
    display: block;
}

</style>
<div  style="background:linear-gradient(90deg, #6b1111 0%, #170301 100%)">
<Navbar title="Create New Wallet" />
</div><br>

        <a class="nav-link text-white tm-button tm-button-lg tm-button-white tm-button-transparent" id="pop_up" data-toggle="modal" data-target="#terms"  style="display: none">Create New Wallet</a>

    <div id="terms" class="modal" data-easein="bounceIn"  tabindex="-1" role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>
              </div>
              <div class="modal-body" style="text-align: center">
                  <span class=""><img src="/images/S_LIFE.png" height="30px"></span><br><br>
                <h3>What is ES Life Wallet? </h3>
                ES Life Wallet is a free, open-source, client-side interface.  ES Life Wallet allows you to interact directly with the blockchain, while you remain in full control of your keys and funds.<br><br>

Please think about this carefully. YOU are the one who is in control.  ES Life Wallet is not a bank or exchange. We don't hold your keys, your funds, or your information. This means we can't access accounts, recover keys, reset passwords, or reverse transactions.<br><br>

<b class="text-danger">WARNING: You And Only You Are Responsible For Your Security.</b><br><br>

<a class="nav-link text-white tm-button tm-button-lg" data-dismiss="modal" aria-hidden="true"><span style="color:#fff">Proceed</span></a>
              </div>

          </div>
      </div>
</div>



    <div class="container">
        <div class="tm-breadcrumb text-center">
         <span class="blinking">Through this Single Sign-On, you can access all the platforms of Era Swap Ecosystem.</span><br>
            <h2 style="font-size: 20px; font-weight:800">Sign Up / Create<br>
            New Wallet

            </h2 >Already have a wallet?<a href="access-my-wallet"><b> Access My Wallet</b></a>
        </div>
    </div>

<div id="tm-area-pricing" class="tm-pricebox-area tm-section bg-grey ">
    <div class="container center key">
            <div class="nav-center">
                <ul class="nav nav-pills">
                    <li>
                        <button class="btn btn-default active" style="background:linear-gradient(270deg, #811515 0%, #694f4d 100%); color:#fff; padding:3px 19px; margin-right: 3px" data-toggle="tab" on:click={generate_random}>Generate Random</button>
                        <!-- <a  href="#prices" class="btn btn-default active" style="background: #811515; color:#fff; padding:20px; margin-right: 3px" data-toggle="tab">Generate Random</a> -->
                    </li>
                    <li>

                    <!-- <a href="#features" class="btn btn-default"  style="background: #811515; color:#fff; padding:20px"  data-toggle="tab">By Mnemonic Phrase</a> -->
                    </li>
                </ul>
            </div>

       <div class="container">
        <p style="text-align:left;">
            <label class="switch"><input type="checkbox" id="togBtn" bind:checked={is_256} on:change={generate_random} >
                <div class="slider round"></div>
            </label>
            <!-- <span style="float:right;">
                <button on:click={myFunction} style="border:none"><img src="images/clipboard.png"> </button>
            </span> -->
            <input type="text" bind:value={clipboard} id="myInput" style="display: none">
        </p>
        <div class="row offset-xl-2">
            {#each mnemonic as word, i}

              <div class="memonics col-4 my-4">
                <div class="row">
                  <div class="col-auto">
                    {i+1}.
                  </div>
                  <div class="col">
                    {#if word!='-'}
                      <div class="mnemonic_entry" style="padding:7px 0 6px">{word}</div>
                    {:else}
                      <input type="text" style="line-height:0" class="mnemonic_entry form-control" on:keyup={check_noted}>
                    {/if}
                  </div>
                </div>
              </div>


            {/each}

            <p class:hide={status!=1}>Please write down the above mnemonic phrase on a piece of paper and keep it safe such that no one can find it. If you ever forget your keys, this mnemonic phrase can be used to recover your wallet's private key. Hence, because of the same reason it is not recommended to take screenshot of this or copy pasting the mnemonic in a file for security reasons. Once you have wrote it, press the below button to proceed.</p>

            <div style="margin:auto">
              <button  class="btn btn-default"  style="background: #811515; color:#fff; padding:3px 19px"  data-toggle="tab" on:click={noted_down} class:hide={status!=1}>I Wrote down My Mnemonic Phrase</button>
            </div>
        </div>
<br><br>
    <div style="text-align:center">
    {#if status==2 || status==3}
      <button class="btn btn-default text-white offset-xl-5"  data-toggle="modal" data-target="#mnemonics"  style="background: #b3b3b3; color:#fff; padding:3px 19px; display:inline" on:click={check_noted} class:hide={status!=2} class:red_button={status==3}><span style="color:#fff">Submit Mnemonic</span></button>
    {/if}
    {#if status==5}
      <a href={refer?'/dashboard':'/access-my-wallet'} class="btn btn-default text-white tm-button tm-button-lg offset-xl-5"><span style="color:#fff">{refer?'Go to your dashboard':'Load your Wallet now'}</span></a>
    {/if}
    </div>
        </div>
    </div>
</div><br><br><br><br>
        <div id="mnemonics" class="modal" data-easein="bounceIn"  tabindex="-1" role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="password_modal"> × </button>
                        </div>
                        <div class="modal-body" style="text-align: center">
                             <span class=""><img src="/images/S_LIFE.png" height="30px"></span>
                             {#if status === 2}
                                <p>Your mnemonic inputs seem incorrect. You can re-enter the mnemonic else you can <strong>Generate Random</strong> and try again.</p>
                                <a class="nav-link text-white tm-button tm-button-lg" data-dismiss="modal" aria-hidden="true"><span style="color:#fff">Close</span></a>
                             {/if}
                            <input type="password" bind:value={wallet_password} class:hide={status!=3} placeholder="Enter your password"><br><br>

                            <button class="tm-button tm-button-sm " on:click={generate_wallet} class:hide={status!=3}><span style="color:#fff">Generate Wallet</span></button>

                              <div class="spinner-border" role="status" class:hide={status!=4}>
                                    <span class="sr-only">Loading...</span>
                                </div>
                             <a id="downloadAnchorElem" href="/" style="display:none">Download</a>
                            <div class:hide={status!=4}>
                                <h4>Please be patient</h4> It might take 15 - 45 seconds to generate UTC file

                                <h4>Don't Lose It</h4> Be careful, it can not be recovered if you lose it.

                                <h4>Don't Share It</h4> Your funds will be stolen if you use this file on a malicious phishing site.

                                <h4>Make a Backup</h4> Secure it like the millions of dollars it may one day be worth.
                            </div>
                        </div>

                    </div>
                </div>
        </div>
<Footer />
