<template>
  <form>
    <div class="input">
      <input
        :type="show? 'password' : 'text'"
        v-model="account"
        placeholder="Please input your private key"
      >
      <img
        @click="show=!show"
        :src="show ? mode.show : mode.close"
      >
    </div>
      <div class="login-btn" @click="login">
        <span>
          Login
        </span>
      </div>
  </form>

</template>

<script>
const mode = {
  show: require('../assets/icon/eye.png'),
  close: require('../assets/icon/closeeye.png')
};
import { showLoading, hideLoading } from '../loading'

export default {
  name: 'LoginItem',
  data() {
    return {
      account: '',
      mode,
      show: true
    };
  },
  methods: {
      async login() {
          if (!this.account) {
              this.$message('please input scret')
              return 
          }
          if (!this.$raze.razeClient) {
             this.$message("Your Local Client Connection Failed.Please Refresh The Page");
             return; 
          }
          showLoading('logining in...')
          try {
            const res = await this.$raze.razeEthLogin(this.account);
            if (res == 0) {
                this.$message('Login Successful')
                try {
                    const razeAddress = await this.$raze.razeEthAddress()
                    this.$store.commit('setRazeAddress', razeAddress)
                } catch (error) {
                    if (error) {
                        this.$message(error);
                        hideLoading()
                        return;
                    }
                    this.$message('Something Went Wrong.')
                    console.error(error)
                }
                hideLoading()
                this.$router.push('/process')
            } else if (res == -1) {
                this.$message({type: 'error', message: 'login failed: this raze account dose not exist'})
                hideLoading()
                return
            }
          } catch (error) {
              this.$message(error);
              hideLoading()
              return;
          }
         
          
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
  margin: 94px 0 19px;
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

</style>
