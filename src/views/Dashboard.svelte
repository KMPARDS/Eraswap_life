<script>
    import Navbar from './NavBar.svelte'
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
        let url = event.srcElement.attributes.data.value;
    	website = await window.open( url, this);
    }
</script>

<Navbar title="Access My Wallet"/>
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
<button class="col-4" data="http://localhost:8000/login" on:click={load_website}>Computeex</button>
</div>
</div>
