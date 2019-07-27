<script>
    import Navbar from './NavBar.svelte'
    let balance = "-";
    let address = "-";
    (async () => {
        balance = String(await ethers.utils.formatEther(String(await wallet.getBalance())));
        address = await wallet.getAddress();
    })()
</script>

<Navbar title="Access My Wallet"/>
<div class="container">
<div class="row">
<div class="col-6">
ETH Balance - {balance}
<br>
Address - {address}
</div>
</div>
</div>
