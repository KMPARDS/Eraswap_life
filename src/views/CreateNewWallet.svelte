<script>
    import Navbar from './NavBar.svelte'
    let size = 256;
    let is_256 = true;
    let mnemonic = bip39.generateMnemonic(size).split(" ");
    let wallet_password=""
    function generate_random() {
        let size = is_256? 256: 128
        mnemonic = bip39.generateMnemonic(size).split(" ");
    }
    
    function generate_wallet(event) {
        console.log(wallet_password)
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
</div>
