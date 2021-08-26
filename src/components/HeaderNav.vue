<template>
  <div
    :class="side?'header header-side':'header'"
    :style="{'background-color':bgColor,'padding-left':tab?'63px':'41px'}"
  >
    <img
      class="header-img"
      src="@/assets/images/16.svg"
    >
    <ul
      class="header-nav-item"
      v-show="tab"
    >
      <li @click="$router.push('/process')">Swap</li>
      <li>Bridge</li>
      <li>Tutorial</li>
      <li>Q&A</li>
      <li>Info</li>
    </ul>
    <div class="header-info">
      <img
        src="@/assets/images/invalid-name.png"
        class="layer"
      >
      <span>
        {{user}}
      </span>
    </div>
    <!-- <div class="header-language">
      En
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
    };
  },
  props: {
    side: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String
    },
    tab: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  computed: mapState({
    user: state => {
        const userall = state.user
        const pre = userall.substring(0, 5)
        const behined = userall.substring(userall.length - 7)
        return `${pre}......${behined}`
    },
    type: state => {
        return state.type
    }
  })
};
</script>

<style lang="less" scoped>
.header {
  height: 106px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 75px 10px 63px;
}

.header-side::before {
  content: '';
  display: block;
  position: absolute;
  width: 320px;
  height: 100%;
  top: 0;
  left: 0;
  background-image: linear-gradient(to right, #1c1243, #23095a);
}
.header-img {
  width: 134px;
  z-index: 2;
}

.header-nav-item {
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 125px;
  margin-top: -5px;
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: justify;
  color: #ffffff;
  li {
    margin: 0 65px 0 0;
    cursor: pointer;
  }
}

.header-info {
  position: absolute;
  right: 100px;
  display: flex;
  align-items: center;
  width: 214px;
  height: 42px;
  padding: 1px;
  border-radius: 21px;
  border-style: solid;
  border-width: 0;
  border-image-source: linear-gradient(to right, #e388e8 16%, #590ab7 150%);
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #1a1c29, #1a1c29),
    linear-gradient(to right, #e388e8 16%, #590ab7 150%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  font-family: Helvetica;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
  img {
    margin: 0 9px 0 14px;
    width: 20px;
  }
}
.header-language {
  position: absolute;
  right: 35px;
  width: 42px;
  height: 42px;
  margin: 5px 0 13px 0;
  line-height: 42px;
  text-align: center;
  color: #ffffff;
  border-radius: 21px;
  border-style: solid;
  border-width: 1px;
  border-image-source: linear-gradient(to right, #e388e8 16%, #590ab7 150%);
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #1a1c29, #1a1c29),
    linear-gradient(to right, #e388e8 16%, #590ab7 150%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
