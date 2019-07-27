<script>
    import Navbar from './NavBar.svelte'
    let mnemonic="";
    function load_wallet() {
        window.wallet = ethers.Wallet.fromMnemonic(mnemonic)
    }
</script>

<Navbar title="Dashboard"/>
<div class="container">
<div class="row">
<div class="col">
<h4>Access through mnemonic</h4>
<textarea bind:value={mnemonic}></textarea>
<a href="/dashboard" on:click={load_wallet}>Access</a>
</div>
</div>
</div>