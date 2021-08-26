<template>
  <form>
    <div class="privite-btn" @click="generatorKey">
        or Privat Key Generator
    </div>
    <div class="input">
      <input
        :type="show? 'password' : 'text'"
        v-model="account"
        placeholder="Please enter your account to Register"
      >
      <img
        @click="show=!show"
        :src="show ? mode.show : mode.close"
      >
    </div>
      <div class="login-btn" @click="register">
        <span>
          register
        </span>
      </div>
  </form>

</template>

<script>
const mode = {
  show: require('../assets/icon/eye.png'),
  close: require('../assets/icon/closeeye.png')
};
import { downloadScret } from '../utils'
import { showLoading, hideLoading } from '../loading'
export default {
  name: 'RegisterItem',
  data() {
    return {
      account: '',
      mode,
      show: true
    };
  },
  props: {
      generatorKey: {
          type: Function,
          default: () => {}
      }
  },
  methods: {
      async register() {
          if (this.account.length < 16) {
              this.$message('Account length must be greater than 16')
              return
          }
          showLoading('registering...')
          try {
              await this.$raze.razeEthRegister(this.account)
          } catch (error) {
              this.$message('something wrong')
              console.error(error)
          }
          hideLoading()
          downloadScret(this.account, this.type)
          this.$router.push('/login')
      }
  },
  computed: {
      type: function() {
          return this.$store.state.type
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.input {
  display: flex;
  align-items: center;
  width: 424px;
  height: 62px;
  margin: 43px 0 19px;
  border-radius: 7px;
  border-style: solid;
  border-width: 1px;
  padding: 1px;
  border-image-source: linear-gradient(87deg, #5c00eb -69%, #de637a 200%);
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #210a57, #210a57),
    linear-gradient(87deg, #5c00eb -69%, #de637a 200%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  color: #5f95ff;
  input {
    outline: none;
    background-color: transparent;
    border: none;
    padding: 15px;
    font-size: 20px;
    width: 340px;
    color: #5f95ff;
    &::placeholder {
      color: #5f95ff;
      font-size: 20px;
    }
  }
}
.login-btn {
  position: relative;
  width: 424px;
  height: 50px;
  margin: 44px 0 33px;
  padding: 17px 129px 15px 135px;
  cursor: pointer;
  background-image: linear-gradient(
    -40deg,
    transparent 20px,
    #5c00eb -51%,
    #de637a 95%,
    transparent 20px
  );
  span {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    z-index: 99;
    font-family: Helvetica;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #7d7979;
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 420px;
    height: 46px;
    top: 2px;
    left: 2px;
    background-image: linear-gradient(
      -40deg,
      transparent 20px,
      #200e50 20px,
      #200e50 95%,
      transparent 20px
    );
  }
}
.privite-btn {
  width: 424px;
  height: 50px;
  margin: 54px 6px 12px 0;
  padding: 17px 25px 25px 25px;
  text-align: center;
  line-height: 50px;
  font-family: Helvetica;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  cursor: pointer;
  background-image: linear-gradient(
    -40deg,
    transparent 20px,
    #de637a -51%,
    #5c00eb 95%,
    transparent 20px
  );
}

</style>
