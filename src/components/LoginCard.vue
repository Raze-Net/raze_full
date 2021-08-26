<template>
  <div
    class="login-card"
    :style="type=='login'?'height:497px':'height:564px'"
  >
    <div class="login-content">
      <div class="title">
        {{type==='select'?'register': 'Login'}}
        <div class="subtitle">Your Raze Account</div>
        <img src="@/assets/icon/10.png">
      </div>
      <login-item v-if="type=='login'" />
      <select-item v-else />
      <div class="divider"></div>
      <div class="tips" v-if="type!=='select'">
        Don’t have a Account?
        <span @click="toRegister">
          Register
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import loginItem from '../components/LoginItem';
import selectItem from '../components/SelectItem';
export default {
  data() {
    return {};
  },
  props: {
    type: String
  },
  components: {
    loginItem,
    selectItem
  },
  methods: {
      toRegister() {
          this.$router.push('/select')
      }
  },
//   computed: {
//       type: function() {
//           return this.$store.state.type
//       }
//   }
};
</script>

<style lang="less" scoped>
.login-card {
  width: 498px;

  margin: 24px 31px 0 0;
  border-radius: 13px;
  box-shadow: 4px 14px 35px 0 rgba(72, 9, 63, 0.8);
  border-style: solid;
  border-width: 2px;
  border-image-source: linear-gradient(
    207deg,
    #db617d,
    rgba(255, 129, 0, 0) 17%
  );
  border-image-slice: 1;
  background-image: linear-gradient(138deg, #260c67, #1d0f49 95%),
    linear-gradient(207deg, #db617d, #5615e0 97%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
.login-content {
  padding: 20px 37px;
}
.title {
  font-family: DIN;
  font-size: 60px;
  font-weight: bold;
  font-stretch: condensed;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: justify;
  color: #5f95ff;
  .subtitle {
    margin-top: 10px;
    font-family: Arial;
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: justify;
    color: rgba(95, 149, 255, 0.52);
  }
  img {
    position: absolute;
    right: -60px;
    top: -25px;
  }
}

.tips {
  font-family: Arial;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: justify;
  color: rgba(95, 149, 255, 0.52);
  span {
    margin-left: 5px;
    font-family: Arial;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: justify;
    color: #e65f8b;
    cursor: pointer;
  }
}
.divider {
  width: 418px;
  height: 1px;
  margin-block: 14px;
  opacity: 0.49;
  border-style: solid;
  border-width: 1px;
  border-image-source: linear-gradient(to left, #f03a8d 10%, #500af9 90%);
  border-image-slice: 1;
}
</style>
