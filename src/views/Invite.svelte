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
  let platform = '';

  function get_query(name){
     if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
    }
  try{
    refer = get_query("refer").toLowerCase();
    const platformQuery = get_query('platform');

    console.log('platform', platform);

    switch(platformQuery) {
      case 'sw':
        platform = 'SwappersWall';
        break;
      case 'bz':
        platform = 'BuzCafe';
        break;
      case 'ts':
        platform = 'TimeSwappers';
        break;
    }



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
<div class="container my-2 py-2" style="background-color:#0001;border-radius:1rem; max-width:550px;">
  {#if errorMessage}
    <div>Error: {errorMessage}</div>
  {:else}
    <div class="row">
      <div class="col-auto">
        <img style="border-radius:100%;height:7rem" src={imgUrl} />
      </div>
      <div class="col">
        Hi, your friend <b>{name}</b> has invited you to join them in <b>{platform}</b> of Era Swap Ecosystem.
      </div>
    </div>

    <p class="mt-2">Since, {platform} is a Web 3.0 based website, you will need to have a Ethereum-compatible wallet (just like your friend wallet is <span style="word-break:break-all">{address}</span>). If you don't have one, it's very easy to create a new wallet on your own computer/phone and use it to quickly access {platform} for having your digital identity powered by Blockchain.</p>

    <p>To proceed by creating a new wallet, click on the below button.</p>
    <a href="/create-new-wallet" class="btn btn-primary tm-button tm-button-sm my-4"><span class="text-white">Create New Wallet</span></a>

    <p>If you already have a Ethereum-compatible wallet, i.e. keystore file, private key, mnemonic phrase, Metamask (supports Hardware Wallets), you can click the below button to access SwappersWall using your existing wallet.</p>
    <a href="/access-my-wallet" class="btn btn-primary tm-button tm-button-sm my-4"><span class="text-white">Access My Wallet</span></a>

  {/if}
</div>

<Footer />
