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
<div class:hide={status!=5}>
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
<style>
.hide{
    display: none;
}
</style>
