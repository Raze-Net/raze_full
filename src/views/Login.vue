<template>
  <div class="home">
    <!-- navigation bars -->
    <header-nav class="nav"></header-nav>

    <!-- middle character -->
    <div class="content">
      <div class="front-text">
        Choose Which cryptocurrency you<br />
        want to <span>privately transfer</span> via<br />
        Raze Network
      </div>
      <img
        src="@/assets/images/2@3x.png"
        class="btn"
      >
    </div>
    <!-- bottom component -->
    <div class="bottom-card">
      <card
        v-for="(card,index) in cardList"
        :key="index"
        :text="card.text"
        :content="card.content"
        :icon="card.icon"
        :width="card.width"
      />
    </div>
    <login-card
      type="login"
      class="login-card"
    ></login-card>
  </div>
</template>

<script>
import headerNav from '../components/HeaderNav';
import Card from '../components/Card';
import loginCard from '../components/LoginCard';
export default {
  name: 'Home',
  data() {
    return {
      cardList: [
        {
          icon: require('../assets/icon/eth.png'),
          text: 'ETH',
          content: 'Transfer ETH to pETH',
          width: 100
        },
        {
          icon: require('../assets/icon/dai.png'),
          text: 'DAI',
          content: 'Transfer DAI to pDAI',
          width: 200
        },
        {
          icon: require('../assets/icon/ustd.png'),
          text: 'USDT',
          content: 'Transfer USDT to pUSDT',
          width: 100
        },
        {
          icon: require('../assets/icon/raze.png'),
          text: 'Raze',
          content: 'Transfer RAZE to pRAZE',
          width: 100
        }
      ]
    };
  },
  components: {
    headerNav,
    Card,
    loginCard
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home {
  height: 100vh;
  overflow: hidden;
  background-color: #1c1e27;
  background-image: url('../assets/images/16.png');
  background-repeat: no-repeat;
  background-position: top right;
}
.home:after {
  content: '';
  width: 100%;
  height: calc(100% - 106px);
  position: absolute;
  left: 0;
  top: 106px;
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  background-color: rgba(29, 4, 73, 0.7);
  /*enhance the fuzziness*/
  z-index: 3;
}
.content {
  position: relative;
}

.front-text {
  width: 657px;
  height: 168px;
  margin: 154px 18px 24px 84px;
  font-family: Helvetica;
  font-size: 42px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #ffffff;
  span {
    background-image: linear-gradient(83deg, #7822ff 0%, #ff6e89);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.btn {
  width: 204px;
  height: 40px;
  margin: 0 107px 129px 84px;
  object-fit: contain;
}
.bottom-card {
  width: 100%;
  padding: 0 70px;
  display: flex;
  justify-content: space-between;
}
.login-card {
  z-index: 99;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
