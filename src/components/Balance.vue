<template>
  <ul class="balance">
    <li class="balance-middle-raze">
      <div class="balance-top">
        Raze ETH Balance
      </div>
      <div class="balance-middle">
        <div class="balance-value">
            {{razeBalance}}
            <img
                src="@/assets/icon/5.png"
            />
            <span>Unit</span>
        </div>
      </div>
      <div class="balance-bottom">
          Raze ETH(=<span>{{razeBalance / 100}}</span>ETH)
      </div>
    </li>
    <li class="balance-middle-eth">
      <div class="balance-top">
        ETH Balance
      </div>
      <div class="balance-middle">
        <div class="balance-value">
            {{mateMaskBalanceUnit}}
            <img src="@/assets/icon/6.png" style="top: 90px"/>
            <span>Unit</span>
        </div>
      </div>
      <div class="balance-bottom">
        ETH(=<span>{{mateMaskBalance}}</span>ETH)
      </div>
    </li>
    <li class="balance-middle-bli">
      <div class="balance-top">
        Raze ETH Balance
      </div>
      <div class="balance-middle">
        <div class="balance-value">
            1:100
        </div>
      </div>
      <div class="balance-bottom">
        pETH &nbsp;&nbsp;ETH
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
    };
  },
  components: {},
  mounted: async function (){
      this.$store.dispatch('getBalance')
  },
  computed: mapState({
    razeBalance: state => state.razeBalance ,
    mateMaskBalance: state =>state.mateMaskBalance,
    mateMaskBalanceUnit: state => Math.floor(state.mateMaskBalance * 100)
  })
};
</script>

<style lang="less" scoped>
.balance {
  width: 100%;
  height: 266px;
  border-radius: 13px;
  box-shadow: 0 2px 10px 0 rgba(26, 3, 67, 0.5);
  display: flex;
  justify-content: space-around;
  border-style: solid;
  border-width: 4px;
  border-image-source: linear-gradient(36deg, transparent 75%, #ff589b 100%);
  border-image-slice: 1;
  background-image: linear-gradient(44deg, #290b5d, #210a57),
    linear-gradient(36deg, transparent 75%, #ff589b 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  color: #fff;
  li {
    position: relative;
    padding: 28px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .balance-top {
    font-family: Arial;
    font-size: 21px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: justify;
  }
  .balance-middle {
    text-shadow: 4px 2px 6px rgba(0, 0, 0, 0.5);
    margin-top: 20px;
    .balance-value {
        width: fit-content;
        font-family: DIN;
        font-size: 100px;
        font-weight: bold;
        font-stretch: condensed;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: justify;
        color: #ffffff;
        img {
            position: absolute;
            top: 95px;
        }
        span {
            font-family: DIN;
            font-size: 24px;
            font-weight: bold;
            font-stretch: condensed;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: justify;
            color: #ffffff;
            margin-left: -30px;
        }
    }
  }
  .balance-middle-raze {
      background-image: url('../assets/images/razebalance.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 70% 70%;
  }
  .balance-middle-eth {
      background-image: url('../assets/images/ethbalance.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 70% 70%;
  }
  .balance-middle-bli {
      background-image: url('../assets/images/bili.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 50% ;
  }
  .balance-bottom {
    font-family: Arial;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: justify;
    color: #7c58fa;
  }
}
</style>
