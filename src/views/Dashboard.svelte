<script>
    import Navbar from './NavBar.svelte'
    export let wallet;
    let balance = 0;
</script>

<Navbar title="Access My Wallet"/>
<div class="container">
<div class="row">
<div class="col-6">
ETH Balance - {balance}
</div>
</div>
</div>
