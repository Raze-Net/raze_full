<template>
  <div class="home">
    <!-- 导航栏 -->
    <header-nav class="nav"></header-nav>

    <!-- 中间文字 -->
    <div>
      <div class="front-text">
        Choose Which cryptocurrency you<br />
        want to <span>privately transfer</span> via<br />
        Raze Network
      </div>
     <div
      class="btn"
    >
      <span>Check Tutorial </span>
    </div>
    </div>
    <!-- 底部组件 -->
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
  </div>
</template>

<script>
import headerNav from '../components/HeaderNav';
import Card from '../components/Card';
// import { hideLoading, showLoading } from '../loading';

export default {
  name: 'Home',
  data() {
    return {
      cardList: [
        {
          icon: require('../assets/icon/bnb.png'),
          text: 'BNB',
          content: 'Transfer BNB to rBNB',
          width: 100
        },
        {
          icon: require('../assets/icon/dai.png'),
          text: 'DAI',
          content: 'Transfer DAI to rDAI',
          width: 130
        },
        {
          icon: require('../assets/icon/ustd.png'),
          text: 'USDT',
          content: 'Transfer USDT to rUSDT',
          width: 100
        },
        {
          icon: require('../assets/icon/raze.png'),
          text: 'Raze',
          content: 'Transfer RAZE to rRAZE',
          width: 100
        }
      ]
    };
  },
  components: {
    headerNav,
    Card
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  background-color: #1c1e27;
  background-image: url('../assets/images/16.png');
  background-repeat: no-repeat;
  background-position: top right;
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

.bottom-card {
  width: 100%;
  padding: 0 70px;
  display: flex;
  justify-content: space-between;
}
.btn{
  cursor: pointer;
  width: 208px;
  height: 46px;
  position: relative;
  margin: 0 107px 129px 84px;
  background-image: linear-gradient(
    -40deg,
    transparent 15px,
    #de637a -51%,
    #5c00eb 95%,
    transparent 20px
  );
  font-family: Helvetica;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 46px;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  &::after {
    content: '';
    display: block;
    position: absolute;
    width: calc(100% - 4px);
    height: 42px;
    top: 2px;
    left: 2px;
  }
}
</style>
