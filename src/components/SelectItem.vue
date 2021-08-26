<template>
  <div class="select">
    <template v-if="!registerByself">
        <div class="description">
        Please use our key generator or use a key that is as random as your Meramask wallet private key as the Raze account private key,and copy it on paper for safekeeping.
        <span>
            Never share your private key with others.
        </span>
        </div>
        <div class="private">
        This private key is for the access of RAZE-ETH account. It cannot be used to access any other Raze account.
        </div>
        <div class="privite-btn" @click="generatorKey">
        Privat Key Generator
        </div>
        <div class="or"> OR</div>
        <div class="own-btn" @click="registerByself=true">
            <span>
                Pick your own key
            </span>
        </div>
    </template>
    <RegisterItem v-else :generatorKey="generatorKey"></RegisterItem>
  </div>
</template>

<script>
import { hideLoading, showLoading } from '../loading';
import { generatorBase64Key, downloadScret } from '../utils'
import RegisterItem from './RegisterItem.vue'
export default {
  data() {
    return {
        registerByself: false,
    };
  },
  components: {
      RegisterItem,
  },
  methods: {
      async generatorKey() {
        const scret = generatorBase64Key()
           showLoading('registering...')
           try {
               await this.$raze.razeEthRegister(scret)
           } catch (error) {
               this.$message('something wrong')
           }
           hideLoading()
           downloadScret(scret, this.type)
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

<style lang="less" scoped>
.description {
  margin-top: 23px;
  font-family: Arial;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: rgba(95, 149, 255, 0.74);
  span {
    color: #e94e44;
    font-weight: bold;
  }
}
.private {
  margin-top: 15px;
  font-family: Arial;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: #e94e44;
}
.privite-btn {
  width: 424px;
  height: 50px;
  margin: 54px 6px 12px 0;
  padding: 17px 129px 15px 135px;
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
.or {
  margin: 10px;
  font-family: Arial;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #e94e44;
  text-align: center;
}
.own-btn {
  position: relative;
  width: 424px;
  height: 50px;
  padding: 17px 129px 15px 135px;
  margin-bottom: 22px;
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
    text-align: center;
    color: #fe5576;
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
