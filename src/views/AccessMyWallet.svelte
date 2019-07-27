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
{#if error_message != ""}
<div class="alert alert-danger alert-dismissible fade show" role="alert">
  {error_message}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
{/if}
<div class="row">
<div class="col">
<h4>Access through mnemonic</h4>
<textarea bind:value={mnemonic}></textarea>
<button on:click={load_wallet}>Access my wallet</button>
<a href="/dashboard" id="dashboard" style="display: none">Access</a>
</div>
</div>
</div>