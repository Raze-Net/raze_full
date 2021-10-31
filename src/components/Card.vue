<template>
  <div class="card" @click="initClient">
    <div class="l-bottom">
    </div>
    <div class="r-top"></div>
    <img
      :width="width+'px'"
      :src="icon"
    >
    <div class="text">
      {{text}}
    </div>
    <div class="content">
      {{content}}
    </div>
  </div>
</template>

<script>
import { showLoading, hideLoading } from '../loading'

export default {
  data() {
    return {};
  },
  props: {
    icon: String,
    text: String,
    content: String,
    width: Number
  },
  components: {},
  methods: {
      initClient: async function() {
        if (!this.$raze.razeClient) {
           try {
               await this.initRazeClient();
           } catch (error) {
               this.$message('Connect wallet Error');
               console.error(error);
           }
        }
        this.$store.commit('setType', this.text);
        switch(this.text) {
            case 'BNB': {
                showLoading('init RazeBNBClient...')
                try {
                    await this.$raze.initRazeEthClient();
                } catch (error) {
                    this.$message(error.message)
                    console.error(error)
                }
                hideLoading()
                this.$router.push('/login')
                break;
            }
            default: {
                this.$message('Coming Soon!')
            }
        }
      }
  }
};
</script>

<style lang="less" scoped>
.card {
  width: 310px;
  height: 168px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: 14px;
  box-shadow: 4px 10px 17px 0 rgba(64, 22, 129, 0.4);
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  border-image-source: linear-gradient(
    62deg,
    rgba(92, 0, 235, 0.5) 0%,
    rgba(211, 99, 222, 0.21) 100%
  );
  border-image-slice: 1;
  background-image: linear-gradient(59deg, #211b37 15%, #281c5a 88%),
    linear-gradient(
      62deg,
      rgba(92, 0, 235, 0.5) 0%,
      rgba(211, 99, 222, 0.21) 100%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
}
.l-bottom {
  width: 133px;
  height: 84px;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0.4;
  -webkit-filter: blur(24px);
  filter: blur(24px);
  background-image: linear-gradient(58deg, #de637a 0%, rgba(43, 0, 235, 0.59));
}
.r-top {
  width: 72px;
  height: 73px;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.4;
  -webkit-filter: blur(24px);
  filter: blur(24px);
  background-image: linear-gradient(45deg, rgba(92, 0, 235, 0.59) 0%, #de637a);
}
.text {
  height: 56px;
  position: absolute;
  top: 11px;
  right: 15.5px;
  font-family: DIN;
  font-size: 48px;
  font-weight: bold;
  font-stretch: condensed;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: right;
  color: #ffffff;
  &::after {
    content: '';
    width: 14px;
    transform: rotate(-2deg);
    opacity: 0.61;
    border: solid 1px #ffffff;
    position: absolute;
    top: 70px;
    right: 15px;
  }
}
.content {
  width: 200px;
  height: 18px;
  position: absolute;
  bottom: 40px;
  right: 15px;
  font-family: Helvetica;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: right;
  color: #ffffff;
}
</style>
