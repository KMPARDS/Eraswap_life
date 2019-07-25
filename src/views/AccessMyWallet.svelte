<script>
    import Navbar from './NavBar.svelte'
    let size = 128;
    let menmonic = bip39.generateMnemonic(size);
</script>

<Navbar title="Access My Wallet"/>
