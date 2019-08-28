<script>
    function logout(){
        console.log("logout")
        wallet=undefined;
        document.getElementById("home").click()
    }
</script>
<style>
@media(max-width:768px){
  .navbar-collapse{
    background:#461313; padding:15px; border-radius:10px;
  }
}
.dropdown-item{
  border-bottom: 1px solid #ccc6 !important;
}
.dropdown-menu{
  min-width: 19rem;
  
}
.dropdown-item:active{
  background-color: #661111
}
a:hover{
  color: #661111;
}
.sec-menu {
    margin-left: 26px;
    font-size: 13px;
}
@media(max-width:768px){
  .align-drop{
      left: auto;
      right: 0;
    }  
}


</style>
<nav class="navbar navbar-expand-lg navbar-light">
  <a class="navbar-brand" href="/" id="home"><img src="/images/es_newlogo-white-min.png"></a>
  <div class="dropdown">
     <i class="fa fa-th " style="color: #fff; font-size:20px" data-toggle="dropdown" aria-hidden="true"></i>     
    <div class="dropdown-menu align-drop">
     <a class="dropdown-item" href="https://timeswappers.com/swapperswall"  target="_blank"><img src="/images/12-min.png" alt=""  height="25px"> <span class="sec-menu" style="font-size:13px">Social Community Platform</span></a> 
 
      <a class="dropdown-item" href="https://www.timeally.io/"  target="_blank"><img src="/images/10-min.png" alt=""  height="25px"> <span class="sec-menu" style="font-size:13px">Decentralized Token Vesting</span></a>
      <a class="dropdown-item" href="https://eraswapwallet.com/"  target="_blank" ><img src="/images/8-min.png" alt=""  height="25px"> <span class="sec-menu" style="font-size:13px">Decentralized Wallet</span></a>
      <a class="dropdown-item" href="https://timeswappers.com/"  target="_blank"><img src="/images/2-min.png" alt=""  height="25px"> <span class="sec-menu" style="font-size:13px">P2P Marketplace Platform</span></a> 
      <a class="dropdown-item" href="http://dayswappers.com/" target="_blank"><img src="/images/9-min.png" alt="" height="25px"> <span class="sec-menu" style="font-size:13px">Affiliate Programme</span></a>          
      <a class="dropdown-item" href="https://buzcafe.com/"  target="_blank"><img src="/images/11-min.png" alt=""  height="25px"> <span class="sec-menu" style="font-size:13px">Merchants & Shoppers e-Retail</span></a> 
      <a class="dropdown-item" href="https://eraswap.academy/"  target="_blank"><img src="/images/3-min.png" alt=""  height="25px"> <span class="sec-menu" style="font-size:13px">eLearning Platform</span></a> 
      <a class="dropdown-item" href="https://www.betdeex.com/"  target="_blank"><img src="/images/5-min.png" alt=""  height="25px"> <span class="sec-menu" style="font-size:13px">Decentralized Prediction Platform</span></a>       
      <a class="dropdown-item" href="https://computeex.net/"  target="_blank"><img src="/images/7-min.png" alt=""  height="25px"> <span class="sec-menu" style="font-size:13px">P2P Lend & Borrow</span></a>
      <a class="dropdown-item" href="https://computeex.net/"  target="_blank"><img src="/images/6-min.png" alt=""  height="25px"> <span class="sec-menu" style="font-size:13px">Multi Exchange Solution</span></a>  
      <a class="dropdown-item" href="http://valueoffarmers.org/"  target="_blank"><img src="/images/Farmer.png" alt=""  height="25px"> <span class="sec-menu" style="font-size:13px">Farming Community</span></a> 
      <a class="dropdown-item" href="http://dateswappers.com/"  target="_blank"><img src="/images/Dating.png" alt=""  height="25px"> <span class="sec-menu" style="font-size:13px">Next Gen Dating and Match-Making</span></a> 
    </div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  </div>
  <div class="collapse navbar-collapse" id="navbarSupportedContent" >
    <ul class="navbar-nav ml-auto navbar-right">
      <li class="nav-item" style="margin-right: 8px; margin-bottom:10px">
        <a class="nav-link text-white tm-button tm-button-lg tm-button-white tm-button-transparent" href="/create-new-wallet" >Sign Up <span style="font-size:10px; ">New Users</span></a>
      </li>
      <li class="nav-item" style="margin-right: 8px; margin-bottom:10px">
        <a class="nav-link text-white tm-button tm-button-lg tm-button-white tm-button-transparent" href="/access-my-wallet" >Sign In <span style="font-size:10px; ">Existing Users</span></a>
      </li>
      {#if wallet}
      <if class="nav-item" style="margin-right: 8px; margin-bottom:10px">
        <a class="nav-link text-white tm-button tm-button-lg tm-button-white tm-button-transparent" href="#" on:click={logout}>Logout</a>
      </if>
      {/if}
      <li class="nav-item" style="margin-right: 8px; margin-bottom:10px">
        <a class="nav-link text-white tm-button tm-button-lg tm-button-white tm-button-transparent" href="/dist/ecosystem" >ESE Dashboard</a>
      </li>
    </ul>
  </div>
</nav>
