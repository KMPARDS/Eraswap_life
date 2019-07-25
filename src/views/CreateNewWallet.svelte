<script>
    import Navbar from './NavBar.svelte'
    let size = 256;
    let is_256 = true;
    let mnemonic = bip39.generateMnemonic(size).split(" ");
    let wallet_password="";
    let wallet = "";
    let noted=false;
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
    function noted_down() {
        let saved_mnemonic = mnemonic;
        for(let i=0;i<5;i++){
            let index = Math.floor(Math.random()*mnemonic.length);
            mnemonic[index] = "-"
        }
    }
    
    function check_noted() {
        // let elements = $(".mnemonic_entry");
        // let input_entry = "";
        // for(let e in elements){
            // input_entry += elements[e].html() + elements[e].val();
        // }
        // console.log(input_entry)
    }

</script>

<Navbar title="Create New Wallet"/>
<input type="checkbox" bind:checked={is_256} on:change={generate_random}>24 words
<button on:click={generate_random}>Generate Random</button>
<div class="container">
<div class="row">
{#each mnemonic as word}
{#if word!='-'}
<div class="col-6 mnemonic_entry" val={word}>{word}</div>
{:else}
<input type="text" class="col-6 mnemonic_entry">
{/if}
{/each}
</div>
<input type="password" bind:value={wallet_password}>
<button on:click={generate_wallet}>Generate Wallet</button>
<button on:click={noted_down}>Noted Mnemonic</button>
<button on:click={check_noted}>Submit Mnemonic</button>
<a id="downloadAnchorElem" href="/" style="display:none"></a>
</div>
