<script>
  import Navbar from './NavBar.svelte'
  import Footer from './Footer.svelte'
  import axios from 'axios'
	import { onMount } from 'svelte';

  const TIMESWAPPERS_SERVER_URL = 'https://apis.timeswappers.com';

  let name = '';
  let address = '';
  let imgUrl = '';
  let errorMessage = '';

  function get_query(name){
     if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
    }
  try{
    refer = get_query("refer").toLowerCase();

    address = ethers.utils.getAddress(refer);
    (async() => {
      const formData = new FormData();
      formData.append('user',address.toLowerCase());
      const response = await axios.post(TIMESWAPPERS_SERVER_URL+'/api/users/by-walletaddress', formData);
      console.log('response',response);
      name = response.data.name;
      imgUrl = response.data.avatar ? TIMESWAPPERS_SERVER_URL + '/' + response.data.avatar.slice(0) : '';
    })()
  } catch(e){
    errorMessage = e.message;
  }
</script>

<div  style="background:linear-gradient(90deg, #6b1111 0%, #170301 100%)">
  <Navbar title="Send ES" />
</div>

{#if errorMessage}
  <div>Error: {errorMessage}</div>
{:else}

  <img src={imgUrl} />
  Hi, your friend {name} has invited you to join SwappersWall.
  <div>Friend address: {address}</div>
  <p>Since, SwappersWall is a Web 3.0 based website, you will need to have a Ethereum-compatible crypto-wallet. If you don't have one, it's very easy to create a new wallet on your own computer and use it to access SwappersWall.</p>

  <p>To proceed by creating a new wallet, click on the below button.</p>
  <a href="/create-new-wallet" class="btn btn-primary tm-button tm-button-sm text-white"><span class="text-white">Create New Wallet</span></a>

  <p>If you already have a Ethereum-compatible crypto-wallet, i.e. keystore file, private key, mnemonic phrase, Metamask (supports Hardware Wallets), you can click the below button to access SwappersWall using your existing wallet.</p>
  <a href="/access-my-wallet" class="btn btn-primary tm-button tm-button-sm"><span class="text-white">Access My Wallet</span></a>

{/if}

<Footer />
