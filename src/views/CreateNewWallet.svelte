<script>
    import Navbar from './NavBar.svelte'
    let size = 256;
    let is_256 = true;
    let mnemonic = bip39.generateMnemonic(size).split(" ");
    let wallet_password="";
    let wallet = "";
    function generate_random() {
        let size = is_256? 256: 128
        mnemonic = bip39.generateMnemonic(size).split(" ");
    }
    async function generate_wallet(event) {
        let wallet = await ethers.Wallet.fromMnemonic(mnemonic.join(" "))
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(await wallet.encrypt(wallet_password)));
        let dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href",     dataStr     );
        dlAnchorElem.setAttribute("download", "UTC-"+wallet.address+".json");
        dlAnchorElem.click();
    }

</script>

<Navbar title="Create New Wallet"/>
<input type="checkbox" bind:checked={is_256} on:change={generate_random}>24 words
<button on:click={generate_random}>Generate Random</button>
<div class="container">
<div class="row">
{#each mnemonic as word}
<div class="col-6">{word}</div>
{/each}
</div>
<input type="password" bind:value={wallet_password}>
<button on:click={generate_wallet}>Generate Wallet</button>
<a id="downloadAnchorElem" href="/" style="display:none"></a>
</div>
