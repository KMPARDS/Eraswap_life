<script>
  function logout() {
    console.log("logout");
    window.wallet = undefined;
    window.hdNode = undefined;
    document.getElementById("home").click();
  }
</script>

<style>
  @media (max-width: 768px) {
    .navbar-collapse {
      background: #461313;
      padding: 15px;
      border-radius: 10px;
    }
  }
  .dropdown-item {
    border-bottom: 1px solid #ccc6 !important;
  }
  .dropdown-menu {
    min-width: 19rem;
  }
  .dropdown-item:active {
    background-color: #661111;
  }
  a:hover {
    color: #661111;
  }
  .sec-menu {
    margin-left: 26px;
    font-size: 13px;
  }
  @media (max-width: 768px) {
    .align-drop {
      left: auto;
      right: 0;
    }
  }
</style>

<nav class="navbar navbar-expand-lg navbar-light">
  <a class="navbar-brand" href="/" id="home">
    <img
      src="/images/es_newlogo-white-min.png"
      style="width: 180px"
      alt="es_newlogo-white-min" />
  </a>
  <div class="dropdown">
    <i
      class="fa fa-th "
      style="color: #fff; font-size:20px"
      data-toggle="dropdown"
      aria-hidden="true" />
    <div class="dropdown-menu align-drop">
      <a class="dropdown-item" href="https://eraswaptoken.io" target="_blank">
        <img src="/images/es-maroon.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">
          Decentralized Utility Token
        </span>
      </a>
      <a class="dropdown-item" href="https://eraswap.info" target="_blank">
        <img src="/images/13.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">
           Era Swap Blockchain Explorer
        </span>
      </a> 
        <a class="dropdown-item" href="https://merkleswap.com/" target="_blank">
        <img src="/images/13.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">
           Merkle Swap
        </span>
      </a>
      <a
        class="dropdown-item"
        href="https://timeswappers.com/swapperswall"
        target="_blank">
        <img src="/images/12-min.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">
          Social Community Platform
        </span>
      </a>

      <a class="dropdown-item" href="https://www.timeally.io/" target="_blank">
        <img src="/images/10-min.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">
          Decentralized Token Vesting
        </span>
      </a>
      <a
        class="dropdown-item"
        href="https://eraswapwallet.com/"
        target="_blank">
        <img src="/images/8-min.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">
          Decentralized Wallet
        </span>
      </a>
      <a class="dropdown-item" href="https://timeswappers.com/" target="_blank">
        <img src="/images/2-min.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">
          P2P Marketplace Platform
        </span>
      </a>
      <a class="dropdown-item" href="https://dayswappers.com/" target="_blank">
        <img src="/images/9-min.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">Affiliate Programme</span>
      </a>
      <a class="dropdown-item" href="https://buzcafe.com/" target="_blank">
        <img src="/images/11-min.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">
          Merchants & Shoppers e-Retail
        </span>
      </a>
      <a class="dropdown-item" href="https://eraswap.academy/" target="_blank">
        <img src="/images/3-min.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">eLearning Platform</span>
      </a>
      <a class="dropdown-item" href="https://www.betdeex.com/" target="_blank">
        <img src="/images/5-min.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">
          Decentralized Prediction Platform
        </span>
      </a>
      <a class="dropdown-item" href="https://computeex.net/" target="_blank">
        <img src="/images/7-min.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">P2P Lend & Borrow</span>
      </a>
      <a class="dropdown-item" href="https://computeex.net/" target="_blank">
        <img src="/images/6-min.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">
          Multi Exchange Solution
        </span>
      </a>
      <a
        class="dropdown-item"
        href="https://valueoffarmers.org/"
        target="_blank">
        <img src="/images/Farmer.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">Farming Community</span>
      </a>
      <a class="dropdown-item" href="https://dateswappers.com/" target="_blank">
        <img src="/images/Dating.png" alt="" height="25px" />
        <span class="sec-menu" style="font-size:13px">
          Next Gen Dating and Match-Making
        </span>
      </a>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>

  </div>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto navbar-right">
      {#if !wallet}
        <li class="nav-item" style="margin-right: 8px; margin-bottom:10px">
          <a class="nav-link text-white tm-button tm-button-lg tm-button-white
            tm-button-transparent svelte-1rnqu60" href="https://play.google.com/store/apps/details?id=com.eraswaponeapp&amp;hl=en_IN" target="_blank">
           <i class="fa fa-mobile" aria-hidden="true" style=" position: relative; top: 3px;"></i> Get the 1DAAP
          </a>
        </li>
        <li class="nav-item" style="margin-right: 8px; margin-bottom:10px">
          <a
            class="nav-link text-white tm-button tm-button-lg tm-button-white
            tm-button-transparent"
            href="/create-new-wallet">
            Create Wallet
            <span style="font-size:10px; ">New Users</span>
          </a>
        </li>
        <li class="nav-item" style="margin-right: 8px; margin-bottom:10px">
          <a
            class="nav-link text-white tm-button tm-button-lg tm-button-white
            tm-button-transparent"
            href="/access-my-wallet">
            Load Wallet
            <span style="font-size:10px; ">Existing Users</span>
          </a>
        </li>
      {/if}
      {#if wallet}
        <li class="nav-item" style="margin-right: 8px; margin-bottom:10px">
          <a
            class="nav-link text-white tm-button tm-button-lg tm-button-white
            tm-button-transparent"
            href="/signature"
            id="user-dashboard">
            Digital Signature
          </a>
        </li>
        <li class="nav-item" style="margin-right: 8px; margin-bottom:10px">
          <a
            class="nav-link text-white tm-button tm-button-lg tm-button-white
            tm-button-transparent"
            href="/dashboard"
            id="user-dashboard">
            Dashboard
          </a>
        </li>
        <if class="nav-item" style="margin-right: 8px; margin-bottom:10px">
          <a
            class="nav-link text-white tm-button tm-button-lg tm-button-white
            tm-button-transparent"
            href="#"
            on:click={logout}>
            Logout
          </a>
        </if>
      {/if}
      <li class="nav-item" style="margin-right: 8px; margin-bottom:10px">
        <a
          class="nav-link text-white tm-button tm-button-lg tm-button-white
          tm-button-transparent"
          href="https://eraswap.info/"
          target="_blank">
          ES Explorer 
        </a>
      </li>
    </ul>
  </div>
</nav>
