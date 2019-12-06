<script>
    import Navbar from './NavBar.svelte'
    import Footer from './Footer.svelte'
    let size = 128;
    function get_query(name){
       if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
          return decodeURIComponent(name[1]);
      }
    try{
    refer = get_query("refer").toLowerCase();}catch(e){
    }
    
</script>
<style>
    .tm-funfact{padding:0px; margin-bottom:10px}
    .tm-funfact-icon{margin-bottom:0px}
        .coin {
      position: relative;
      width: 300px;
      height: 300px;
      margin: 50px auto;
      transform-style: preserve-3d;
      animation: rotate3d 8s linear infinite;
      transition: all 0.3s;
    }
    .coin__front, .coin__back {
      position: absolute;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      overflow: hidden;
      background-color: gold;
    }
    .coin__front:after, .coin__back:after {
      content: "";
      position: absolute;
      left: -150px;
      bottom: 100%;
      display: block;
      height: 200px;
      width: 600px;
      background: #fff;
      opacity: 0.3;
      animation: shine linear 4s infinite;
    }
    .coin__front {
      background-image: url("/images/Era-Swap-Coin-min.png");
      background-size: cover;
      transform: translateZ(10px);
    }
    .coin__back {
      background-image: url("/images/Era-Swap-Coin-min.png");
      background-size: cover;
      transform: translateZ(-10px) rotateY(180deg);
    }
    .coin__edge div:nth-child(1) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(94.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(94.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(2) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(99deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(99deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(3) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(103.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(103.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(4) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(108deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(108deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(5) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(112.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(112.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(6) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(117deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(117deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(7) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(121.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(121.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(8) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(126deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(126deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(9) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(130.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(130.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(10) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(135deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(135deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(11) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(139.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(139.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(12) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(144deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(144deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(13) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(148.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(148.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(14) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(153deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(153deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(15) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(157.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(157.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(16) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(162deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(162deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(17) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(166.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(166.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(18) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(171deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(171deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(19) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(175.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(175.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(20) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(180deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(180deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(21) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(184.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(184.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(22) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(189deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(189deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(23) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(193.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(193.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(24) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(198deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(198deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(25) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(202.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(202.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(26) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(207deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(207deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(27) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(211.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(211.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(28) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(216deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(216deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(29) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(220.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(220.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(30) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(225deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(225deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(31) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(229.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(229.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(32) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(234deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(234deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(33) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(238.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(238.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(34) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(243deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(243deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(35) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(247.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(247.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(36) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(252deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(252deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(37) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(256.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(256.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(38) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(261deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(261deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(39) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(265.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(265.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(40) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(270deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(270deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(41) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(274.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(274.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(42) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(279deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(279deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(43) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(283.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(283.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(44) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(288deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(288deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(45) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(292.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(292.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(46) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(297deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(297deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(47) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(301.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(301.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(48) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(306deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(306deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(49) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(310.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(310.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(50) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(315deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(315deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(51) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(319.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(319.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(52) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(324deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(324deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(53) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(328.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(328.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(54) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(333deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(333deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(55) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(337.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(337.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(56) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(342deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(342deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(57) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(346.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(346.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(58) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(351deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(351deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(59) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(355.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(355.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(60) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(360deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(360deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(61) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(364.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(364.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(62) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(369deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(369deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(63) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(373.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(373.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(64) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(378deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(378deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(65) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(382.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(382.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(66) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(387deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(387deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(67) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(391.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(391.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(68) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(396deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(396deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(69) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background:gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(400.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(400.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(70) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(405deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(405deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(71) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(409.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(409.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(72) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(414deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(414deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(73) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(418.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(418.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(74) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(423deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(423deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(75) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(427.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(427.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(76) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(432deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(432deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(77) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(436.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(436.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(78) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(441deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(441deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(79) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(445.5deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(445.5deg) translateX(150px) rotateY(90deg);
    }
    .coin__edge div:nth-child(80) {
      position: absolute;
      height: 11.775px;
      width: 20px;
      background: gold;
      transform: translateY(144.1125px) translateX(140px) rotateZ(450deg) translateX(150px) rotateY(90deg);
      -ms-transform: translateY(144.1125px) translateX(140px) rotateZ(450deg) translateX(150px) rotateY(90deg);
    }
    .coin__shadow {
      position: absolute;
      width: 300px;
      height: 20px;
      border-radius: 50%;
      background: #000;
      box-shadow: 0 0 100px 100px #000;
      opacity: 0.125;
      transform: rotateX(90deg) translateZ(-330px) scale(0.5);
    }
    @keyframes rotate3d {
      0% {
        transform: perspective(1000px) rotateY(0deg);
      }
      100% {
        transform: perspective(1000px) rotateY(360deg);
      }
    }
    @keyframes shine {
      0%, 15% {
        transform: translateY(600px) rotate(-40deg);
      }
      50% {
        transform: translateY(-300px) rotate(-40deg);
      }
    }

    .custom-height {
      height: 250px;
    }

</style>
    <!-- Wrapper -->
    <div id="wrapper" class="wrapper">
          <div class="tm-header tm-header-fixed tm-sticky-header">
            <div class="container-fluid">
                     <Navbar title="EraSwap"/>
                <div class="tm-mobilenav"></div>
            </div>
        </div>

        <!-- Heroslider Area -->
        <div id="tm-area-heroslider" class="tm-heroslider">
            <div class="tm-heroslider-inner">
                <img src="images/heroslider-overlay-shape-min.png" alt="heroslider ovelay" class="tm-heroslider-ovelayshape">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-xl-8 col-lg-7 order-2 order-lg-1">
                            <div class="tm-heroslider-content">
                                <h1>Era Swap Life</h1>
                                <p>Era Swap Life is the gateway to the one world of Era Swap Ecosystem. <br>Let’s Swap to Next Era, together!!</p>
                                <!-- <div class="tm-buttongroup">
                                    <a href="/create-new-wallet"class="tm-button tm-button-lg tm-button-white tm-button-transparent" data-toggle="modal" data-target="#terms" ><span>Create New Wallet</span></a>
                                    <a href="/access-my-wallet" class="tm-button tm-button-lg tm-button-white tm-button-transparent"><span>Access My Wallet</span></a>
                                </div> -->
                                <a href="#tm-area-features" class="tm-heroslider-scrolldown">
                                    <i class="zmdi zmdi-square-down"></i>
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-5 order-1 order-lg-2">
                            <div class="tm-heroslider-mobileshow">
                                <!-- <img src="https://www.myetherwallet.com/img/spaceman.95f84509-min.png" alt="appmyil mobile"> -->
                                <div class="coin">
                                    <div class="coin__front"></div>
                                    <div class="coin__edge">
                                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    </div>
                                    <div class="coin__back"></div>
                                    <div class="coin__shadow"></div>
                                </div>
                                <div class="tm-heroslider-mobileshowanim">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--// Heroslider Area -->

        <!-- Page Content -->
        <main class="page-content">
            <!-- Features Area -->
            <div id="tm-area-features" class="tm-features-area tm-section tm-padding-section bg-white" >
                <div class="container">
                        <div class="tm-sectiontitle text-center">
                        <!-- <h2>About Era Swap Life</h2> -->
                            <h4>Era Swap Life is Gateway to</h4>
                              <span class=""><img src="/images/S_LIFE.png" height="30px"></span>
                              <br>
                        </div>
                    <div class="row justify-content-center mt-30-reverse">
                        <!-- Single Features -->
                        <div class="col-lg-4 col-md-6 col-12 mt-30">
                            <div class="tm-feature">
                                <span class="tm-feature-icon">
                                    <i class="flaticon-keyword"></i>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="70px" height="72px">
                                        <path fill-rule="evenodd" d="M52.556,54.307 C64.348,37.302 73.747,12.982 68.512,4.877 C60.795,-7.064 13.848,4.659 2.850,20.520 C2.466,21.074 2.124,21.636 1.831,22.199 C-6.854,38.889 17.104,75.968 33.774,71.638 C39.513,70.148 46.364,63.237 52.556,54.307 " />
                                    </svg>
                                </span>
                                <div class="tm-feature-content">
                                    <h5>Era Swap Token (ES)</h5>
                                    <p>is a decentralized utility token currently based on Ethereum blockchain (ERC20) used on multiple platforms for exchange of services (P2P), avail discounts, rewards and more utility.</p>
                                </div>
                            </div>
                        </div>
                        <!--// Single Features -->

                        <!-- Single Features -->
                        <div class="col-lg-4 col-md-6 col-12 mt-30">
                            <div class="tm-feature">
                                <span class="tm-feature-icon">
                                    <i class="flaticon-document"></i>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="70px" height="72px">
                                        <path fill-rule="evenodd" d="M52.556,54.307 C64.348,37.302 73.747,12.982 68.512,4.877 C60.795,-7.064 13.848,4.659 2.850,20.520 C2.466,21.074 2.124,21.636 1.831,22.199 C-6.854,38.889 17.104,75.968 33.774,71.638 C39.513,70.148 46.364,63.237 52.556,54.307 " />
                                    </svg>
                                </span>
                                <div class="tm-feature-content">
                                    <h5>Era Swap Ecosystem (ESE)</h5>
                                    <p>includes all inter-linked platforms where ES can be utilized for multiple utilities. The ecosystem consists of platforms offering P2P services and usage to community members.</p>
                                </div>
                            </div>
                        </div>
                        <!--// Single Features -->
                        <!-- Single Features -->
                        <div class="col-lg-4 col-md-6 col-12 mt-30">
                            <div class="tm-feature">
                                <span class="tm-feature-icon">
                                    <i class="flaticon-cover"></i>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="70px" height="72px">
                                        <path fill-rule="evenodd" d="M52.556,54.307 C64.348,37.302 73.747,12.982 68.512,4.877 C60.795,-7.064 13.848,4.659 2.850,20.520 C2.466,21.074 2.124,21.636 1.831,22.199 C-6.854,38.889 17.104,75.968 33.774,71.638 C39.513,70.148 46.364,63.237 52.556,54.307 " />
                                    </svg>
                                </span>
                                <div class="tm-feature-content">
                                    <h5>Total Fuel Collected (TFC)</h5>
                                    <p>is the total fuel collected from all the platforms of the Era Swap Ecosystem. ES rewards will be distributed to the community members in 50% liquid and 50% TA locked through TimeAlly DApp (TA).</p>
                                </div>
                            </div>
                        </div>
                        <!--// Single Features -->
                    </div>
                </div>
            </div>
            <!--// Features Area -->
            <style>
            @media(min-width: 768px){
              .pcvid{
                width: 560px;
                height:315px;
              }
            }
            </style>

                 <div id="tm-area-services" class="tm-services-area tm-section bg-white" >
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="tm-sectiontitle text-center">
                                <h4>Era Swap Life - One World</h4>
                              <span class=""><img src="/images/S_LIFE.png" height="30px"></span>
                                <br><br>
                                <h6>Watch this exclusive teaser to see multiple platforms under Era Swap Ecosystem where Era Swap (ES) will be utilized as a decentralized utility token</h6>

                            </div>
                        </div>
                    </div>
                    <div class="row ">
                        <div class="col-lg-12 col-md-12 col-xl-12 col-xs-12" style="margin-bottom: -108px;">
                            <div class="tm-service-image offset-md-3">
                                <div class="tm-service-image-1 is-visible" style="margin-top: -92px; margin-bottom: -130px;">
                                 <iframe  class="pcvid" src="https://www.youtube.com/embed/CHfxYfYnKpE?rel=0&amp;showinfo=0" frameborder="0"  allowFullScreen />

                                 <!-- <iframe class="pcvid" src="https://www.youtube.com/embed/BABmKitmkic" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
                                </div>
                                <div class="tm-service-image-2">
                                </div>
                                <!-- <div class="tm-service-mobileshowanim">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
<style>
  .flip-card {
    /* background-color: white; */
    /* width: 260px; */
    height: 125px;
    perspective: 1000px;
  }
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
    -mo-z-transform: rotateY(180deg);
  }
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }
  .flip-card-front{background: #fff;}
  .flip-card-back {
    background-color: #2980b9;
    /* color: white; */
    transform: rotateY(180deg);
    /* -mo-z-transform: rotateY(0deg); */
  }
  .flip-card:hover .flip-card-back {
    backface-visibility: visible;
    -mo-z-transform: rotateY(180deg);
  }

</style>


            <!-- About Us Area -->
            <div id="tm-area-about" class="tm-about-area tm-section tm-padding-section" style="background: #eef2f4">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-12">
                            <div class="tm-sectiontitle text-center">
                                <!-- <h2>About Era Swap Life</h2> -->
                                  <h4>Why Era Swap Life</h4>
                                   <span class=""><img src="/images/S_LIFE.png" height="30px"></span>
                                   <br><br>
                                <h6>Era Swap Life offers the advantage of one access to multiple utility platforms accepting Era Swap (ES) Utility token. </h6>
                                <p>The user can add his / her wallet to access these platforms which offers multiple solutions to community members like:</p>
                                <p> Access Era Swap Platforms, please <a href="/create-new-wallet"><b>Create wallet</b></a> or <a href="/access-my-wallet"><b>Access Wallet </b></a></p>
                            </div>

                        </div>
                    </div>

                      <div class="row justify-content-center">
                        <div class="col-lg-12">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="flip-card">
                                  <div class="flip-card-inner">
                                 <div class="flip-card-front">
                                      <span class="tm-funfact-icon">
                                      <img src="/images/12-min.png" alt="">

                                      </span>
                                         <p style="font-size:13px">Social Community Platform</p>
                                    </div>
                               <a href="https://timeswappers.com/swapperswall" target="_blank">  <div class="flip-card-back">
                                  <div class="tm-funfact text-center">
                                     <img src="images/b-min.png" alt="" height="105px">
                                  </div>
                                </div></a>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="flip-card">
                                    <div class="flip-card-inner">
                                      <div class="flip-card-front">
                                        <span class="tm-funfact-icon">
                                           <img src="/images/10-min.png" alt="">
                                      </span>
                                      <p style="font-size:13px">Decentralized Token Vesting</p>
                                      </div>
                                  <a href="https://www.timeally.io/" target="_blank">
                                  <div class="flip-card-back">
                                      <div class="tm-funfact text-center">
                                        <img src="images/g-min.png" alt="" height="105px">
                                    </div>
                                  </div>
                                  </a>
                                  </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="flip-card">
                                    <div class="flip-card-inner">
                                      <div class="flip-card-front">
                                       <span class="tm-funfact-icon">
                                        <img src="/images/8-min.png" alt="">
                                    </span>
                                    <p style="font-size:13px">Decentralized Wallet</p>
                                      </div>
                                <a href="https://eraswapwallet.com/" target="_blank">
                                    <div class="flip-card-back">
                                      <div class="tm-funfact text-center">
                                        <img src="images/f-min.png" alt="" height="105px">
                                    </div>
                                  </div>
                                  </a>
                                  </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="flip-card">
                                    <div class="flip-card-inner">
                                      <div class="flip-card-front">
                                       <span class="tm-funfact-icon">
                                        <img src="/images/2-min.png" alt="">
                                       </span>
                                    <p style="font-size:13px">P2P Marketplace Platform</p>
                                      </div>
                                  <a href="https://timeswappers.com" target="_blank">
                                    <div class="flip-card-back">
                                      <div class="tm-funfact text-center">
                                      <img src="images/A-min.png" alt="" height="105px">
                                    </div>
                                  </div>
                                  </a>
                                  </div>
                                </div>
                            </div>
                        </div>

                        <br><br>
                         <div class="row">
                            <div class="col-md-3">
                             <div class="flip-card">
                                    <div class="flip-card-inner">
                                      <div class="flip-card-front">
                                      <span class="tm-funfact-icon">
                                      <img src="/images/9-min.png" alt="">
                                    </span>
                                     <p style="font-size:13px">Affiliate Programme</p>

                                      </div>
                                   <a href="https://dayswappers.com/" target="_blank">
                                    <div class="flip-card-back">
                                      <div class="tm-funfact text-center">
                                      <img src="images/d-min.png" alt="" height="105px">
                                      </div>
                                    </div>
                                  </a>
                                  </div>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="flip-card">
                                    <div class="flip-card-inner">
                                      <div class="flip-card-front">
                                      <span class="tm-funfact-icon">
                                        <img src="/images/11-min.png" alt="">
                                    </span>
                                    <p style="font-size:13px">Merchants & Shoppers e-Retail</p>
                                      </div>
                                      <a href="https://buzcafe.com/" target="_blank">
                                    <div class="flip-card-back">
                                      <div class="tm-funfact text-center">
                                        <img src="images/c-min.png" alt="" height="105px">
                                    </div>
                                  </div>
                                  </a>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-3">
                                  <div class="flip-card">
                                      <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                        <span class="tm-funfact-icon">
                                          <img src="/images/3-min.png" alt="">
                                      </span>
                                      <p style="font-size:13px">eLearning Platform</p>
                                        </div>
                                        <a href="https://eraswap.academy/wallet-login" target="_blank">
                                      <div class="flip-card-back">
                                        <div class="tm-funfact text-center">
                                        <img src="images/academy.png" alt="" height="105px">
                                      </div>
                                    </div>
                                    </a>
                                    </div>
                                  </div>
                              </div>
                            <div class="col-md-3">
                                <div class="flip-card">
                                    <div class="flip-card-inner">
                                      <div class="flip-card-front">
                                       <span class="tm-funfact-icon">
                                        <img src="/images/5-min.png" alt="">
                                    </span>
                                    <p style="font-size:13px">Decentralized Prediction Platform</p>
                                      </div>
                                      <a href="https://www.betdeex.com/" target="_blank">
                                    <div class="flip-card-back">
                                      <div class="tm-funfact text-center">
                                        <img src="images/betdeex-logo.png" alt="" height="105px">
                                      </div>
                                    </div>
                                    </a>
                                  </div>
                                </div>
                            </div>
                        </div>
                         <br><br>
                         <div class="row">
                            <div class="col-md-3">
                               <div class="flip-card">
                                    <div class="flip-card-inner">
                                      <div class="flip-card-front">
                                        <span class="tm-funfact-icon">
                                        <img src="/images/7-min.png" alt="">
                                       </span>
                                    <p style="font-size:13px">P2P Lend & Borrow</p>
                                      </div>
                                      <a href="https://computeex.net" target="_blank">
                                    <div class="flip-card-back">
                                      <div class="tm-funfact text-center">
                                        <img src="images/comp-lb.png" alt="" height="105px" >
                                    </div>
                                  </div>
                                  </a>
                                  </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                 <div class="flip-card">
                                    <div class="flip-card-inner">
                                      <div class="flip-card-front">
                                       <span class="tm-funfact-icon">
                                        <img src="/images/6-min.png" alt="">
                                        </span>
                                    <p style="font-size:13px">Multi Exchange Solution</p>
                                      </div>
                                      <a href="https://computeex.net" target="_blank">
                                    <div class="flip-card-back">
                                      <div class="tm-funfact text-center">
                                       <img src="images/comp.png" alt="" height="105px">
                                    </div>
                                    </a>
                                  </div>
                                </div>
                             </div>
                            <div class="col-md-3">
                                <div class="flip-card">
                                    <div class="flip-card-inner">
                                      <div class="flip-card-front">
                                      <span class="tm-funfact-icon">
                                         <img src="/images/Farmer.png" alt="">
                                    </span>
                                     <p style="font-size:13px">Farming Community</p>
                                      </div>
                                      <a href="https://valueoffarmers.org/" target="_blank">
                                    <div class="flip-card-back">
                                      <div class="tm-funfact text-center">
                                        <img src="images/vof.png" alt="" height="105px">
                                    </div>
                                  </div>
                                  </a>
                                  </div>
                                </div>
                            </div>
                             <div class="col-md-3">
                                <div class="flip-card">
                                    <div class="flip-card-inner">
                                      <div class="flip-card-front">
                                      <span class="tm-funfact-icon">
                                        <img src="/images/Dating.png" alt="">
                                    </span>
                                    <p style="font-size:13px">Next Gen Dating and Match-Making</p>
                                      </div>
                                      <a href="https://dateswappers.com/" target="_blank">
                                    <div class="flip-card-back">
                                      <div class="tm-funfact text-center">
                                        <img src="images/date.png" alt="" height="105px">
                                    </div>
                                  </div>
                                  </a>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
          </div>
            <!--// About Us Area -->

          <!--// Global Exchange -->

          <div id="tm-area-services" class="tm-services-area tm-section tm-padding-section bg-white">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="tm-sectiontitle text-center">
                                <h4>Global Exchange</h4>
                               <span class=""><img src="/images/S_LIFE.png" height="30px"></span>
                                <br><br>
                            </div>
                        </div>
                        <div class="">
                          <img class="img-responsive custom-height" src="/images/probitexchange.png" height="auto">
                        </div>
                    </div>
                </div>
          </div>

            <!-- Services Area -->
            <div id="tm-area-services" class="tm-services-area tm-section tm-padding-section bg-white">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="tm-sectiontitle text-center">
                                <h4>Advantages to Era Swap Community Members</h4>
                               <span class=""><img src="/images/S_LIFE.png" height="30px"></span>
                                <br><br>
                            </div>
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-lg-6">
                            <div class="row mt-40-reverse">

                                <!-- Single Features -->
                                <div class="col-lg-12 col-md-6 col-12 mt-40">
                                    <div class="tm-service">
                                        <span class="tm-service-icon">
                                            <i class="flaticon-friendship"></i>
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                                width="70px" height="72px">
                                                <path fill-rule="evenodd" d="M52.556,54.307 C64.348,37.302 73.747,12.982 68.512,4.877 C60.795,-7.064 13.848,4.659 2.850,20.520 C2.466,21.074 2.124,21.636 1.831,22.199 C-6.854,38.889 17.104,75.968 33.774,71.638 C39.513,70.148 46.364,63.237 52.556,54.307 " />
                                            </svg>
                                        </span>
                                        <div class="tm-service-content">
                                            <h4><img src="/images/divider-logo-min.png"/> Single Sign On to Ecosystem (SSO)</h4>
                                            <p style="margin-left: 33px;">Ease of access and convenience to users for getting access to all platforms of Era Swap Ecosystem</p>
                                        </div>
                                    </div>
                                </div>
                                <!--// Single Features -->

                                <!-- Single Features -->
                                <div class="col-lg-12 col-md-6 col-12 mt-40">
                                    <div class="tm-service">
                                        <span class="tm-service-icon">
                                            <i class="flaticon-support"></i>
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                                width="70px" height="72px">
                                                <path fill-rule="evenodd" d="M52.556,54.307 C64.348,37.302 73.747,12.982 68.512,4.877 C60.795,-7.064 13.848,4.659 2.850,20.520 C2.466,21.074 2.124,21.636 1.831,22.199 C-6.854,38.889 17.104,75.968 33.774,71.638 C39.513,70.148 46.364,63.237 52.556,54.307 " />
                                            </svg>
                                        </span>
                                        <div class="tm-service-content">
                                            <h4><img src="/images/divider-logo-min.png"/> Integrated with Wallet</h4>
                                            <p style="margin-left: 33px;">Integrated with your Wallet to receive all benefits from inter-linked platforms</p>
                                        </div>
                                    </div>
                                </div>
                                <!--// Single Features -->

                                <!-- Single Features -->
                                <div class="col-lg-12 col-md-6 col-12 mt-40">
                                    <div class="tm-service">
                                        <span class="tm-service-icon">
                                            <i class="flaticon-team"></i>
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                                width="70px" height="72px">
                                                <path fill-rule="evenodd" d="M52.556,54.307 C64.348,37.302 73.747,12.982 68.512,4.877 C60.795,-7.064 13.848,4.659 2.850,20.520 C2.466,21.074 2.124,21.636 1.831,22.199 C-6.854,38.889 17.104,75.968 33.774,71.638 C39.513,70.148 46.364,63.237 52.556,54.307 " />
                                            </svg>
                                        </span>
                                        <div class="tm-service-content">
                                            <h4><img src="/images/divider-logo-min.png"/> Self Control</h4>
                                            <p style="margin-left: 33px;">Control and privacy in your hands as the private keys stays with you only</p>
                                        </div>
                                    </div>
                                </div>
                                <!--// Single Features -->

                                <!-- Single Features -->
                                <div class="col-lg-12 col-md-6 col-12 mt-40">
                                    <div class="tm-service">
                                        <span class="tm-service-icon">
                                            <i class="flaticon-hourglass"></i>
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                                width="70px" height="72px">
                                                <path fill-rule="evenodd" d="M52.556,54.307 C64.348,37.302 73.747,12.982 68.512,4.877 C60.795,-7.064 13.848,4.659 2.850,20.520 C2.466,21.074 2.124,21.636 1.831,22.199 C-6.854,38.889 17.104,75.968 33.774,71.638 C39.513,70.148 46.364,63.237 52.556,54.307 " />
                                            </svg>
                                        </span>
                                        <div class="tm-service-content">
                                            <h4><img src="/images/divider-logo-min.png"/> Mapping</h4>
                                            <p style="margin-left: 33px;">Mapped with your usage, utility, rewards and referrals</p>
                                        </div>
                                    </div>
                                </div>
                                <!--// Single Features -->
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="tm-service-image">
                                <div class="tm-service-image-1 is-visible">
                                    <img src="/images/Rocket-min.png" alt="appmyil mobile">
                                </div>
                                <div class="tm-service-image-2">
                                </div>
                                <div class="tm-service-mobileshowanim">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
              
                
            <!--// Services Area -->
             <div id="tm-area-faq" class="tm-faq-area tm-section tm-padding-section"  style="background: #eef2f4">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="tm-sectiontitle text-center">
                                <h4>FAQ's</h4>
                                <span class=""><img src="/images/S_LIFE.png" height="30px"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-lg-8 offset-md-2">
                            <!-- Accordion Wrapper -->
                            <div id="tm-accordion1" class="tm-accordion">


                                <div class="card">
                                    <div class="card-header" id="tm-accordion1-heading1n1">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#tm-accordion1-collapse1n1"
                                                aria-expanded="true" aria-controls="tm-accordion1-collapse1n1">
                                                <img src="/images/q.png"> What is Era Swap Life?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="tm-accordion1-collapse1n1" class="collapse" aria-labelledby="tm-accordion1-heading1n1"
                                        data-parent="#tm-accordion1">
                                        <div class="card-body offset-md-1">
                                          <p>Please watch this video to understand "Era Swap Life - One World"</p>
                                          <iframe src="https://www.youtube.com/embed/CHfxYfYnKpE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </div>

                                <!-- <div class="card">
                                    <div class="card-header" id="tm-accordion1-heading1n2">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#tm-accordion1-collapse1n2"
                                                aria-expanded="true" aria-controls="tm-accordion1-collapse1n2">
                                                <img src="/images/q.png"> What is Single Sign-on in Era Swap Ecosystem?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="tm-accordion1-collapse1n2" class="collapse" aria-labelledby="tm-accordion1-heading1n2"
                                        data-parent="#tm-accordion1">
                                        <div class="card-body offset-md-1">
                                          <p>Please watch this video to understand "Era Swap Life - One World"</p>
                                          <iframe src="https://www.youtube.com/embed/Wfxgd4l9cmM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </div> -->

                                <div class="card">
                                    <div class="card-header" id="tm-accordion1-heading1">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#tm-accordion1-collapse1"
                                                aria-expanded="true" aria-controls="tm-accordion1-collapse1">
                                                <img src="/images/q.png"> How to use Era Swap Life Single Sign On to access Era Swap Ecosystem?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="tm-accordion1-collapse1" class="collapse" aria-labelledby="tm-accordion1-heading1"
                                        data-parent="#tm-accordion1">
                                        <div class="card-body offset-md-1">
                                          <iframe src="https://www.youtube.com/embed/NElgJEKOReI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-header" id="tm-accordion1-heading2">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#tm-accordion1-collapse2"
                                                aria-expanded="false" aria-controls="tm-accordion1-collapse2">
                                               <img src="/images/q.png">  How to Stake TimeAlly from Era Swap Life?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="tm-accordion1-collapse2" class="collapse" aria-labelledby="tm-accordion1-heading2"
                                        data-parent="#tm-accordion1">
                                        <div class="card-body offset-md-1">
                                           <iframe  src="https://www.youtube.com/embed/Jtc3unocmEA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="tm-accordion1-heading3">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#tm-accordion1-collapse3"
                                                aria-expanded="false" aria-controls="tm-accordion1-collapse3">
                                               <img src="/images/q.png">  What if my private key got exposed?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="tm-accordion1-collapse3" class="collapse" aria-labelledby="tm-accordion1-heading3"
                                        data-parent="#tm-accordion1">
                                        <div class="card-body offset-md-1">
                                         <p>As you only control the keys of your account and they are not stored anywhere, so in case you loose your Private Keys or Mnemonic phrase or Keystore file then only you are accountable and responsible for the loss.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <!--// Accordion Wrapper -->
                        </div>
                    </div>
                </div>
            </div>

            <!--// Frequently Ask Question -->
        </main>
        <!--// Page Content -->


    </div>
    

     <Footer />
     <div id="css-only-modals">
	<input id="modal1" class="css-only-modal-check" type="checkbox" checked/>
	<div class="css-only-modal">
		<label for="modal1" class="css-only-modal-close"><i class="fa fa-times fa-2x"></i></label>
		<!--<h2>Modal Title</h2>
		<hr />-->
		<a href="https://www.probit.com/app/exchange/ES-BTC" target="_blank"><img src="images/annoncement2.jpeg" class="img-responsive svelte-1ewjq1k" alt="" style=" width:100%">  </a>
		<!--<label for="modal1" class="css-only-modal-btn btn btn-primary btn-lg text-center">Okay</label>-->
	</div>
<div id="screen-shade"></div>
</div>
