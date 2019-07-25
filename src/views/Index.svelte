<script>
    import Navbar from './NavBar.svelte'
    let size = 128;
    let menmonic = bip39.generateMnemonic(size);
</script>

<Navbar title="EraSwap"/>

<div class="container-fluid">
<div class="row">
<a class="col-sm" href="/create-new-wallet">Create new wallet</a>
<a class="col-sm" href="/access-my-wallet">Access my wallet</a>
</div>
</div>
