<script>
    function logout(){
        console.log("logout")
        wallet=undefined;
        document.getElementById("home").click()
    }
</script>

<nav class="navbar navbar-expand-lg navbar-light">
  <a class="navbar-brand" href="/" id="home"><img src="/images/es_newlogo-white-min.png"></a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto navbar-right">
      <li class="nav-item" style="margin-right: 8px; margin-bottom:10px">
        <a class="nav-link text-white tm-button tm-button-lg tm-button-white tm-button-transparent" href="/create-new-wallet" >Create New Wallet</a>
      </li>
      <li class="nav-item" style="margin-right: 8px; margin-bottom:10px">
        <a class="nav-link text-white tm-button tm-button-lg tm-button-white tm-button-transparent" href="/access-my-wallet" >Access My Wallet</a>
      </li>
      {#if wallet}
      <if class="nav-item" style="margin-right: 8px; margin-bottom:10px">
        <a class="nav-link text-white tm-button tm-button-lg tm-button-white tm-button-transparent" href="#" on:click={logout}>Logout</a>
      </if>
      {/if}
      <li class="nav-item" style="margin-right: 8px; margin-bottom:10px">
        <a class="nav-link text-white tm-button tm-button-lg tm-button-white tm-button-transparent" href="https://eraswaptoken.io/dash/" >ESE Dashboard</a>
      </li>
    </ul>
  </div>
</nav>
