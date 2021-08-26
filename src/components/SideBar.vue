<template>
  <div class="sidebar">
    <div
      :class="['menu-item',path===menu.key?'active':'']"
      v-for="(menu,index) in menuConfig"
      :key="index"
    >
      <div class="front">
      </div>
      <img
        class="icon"
        :src="menu.icon"
      >
      {{menu.title}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuConfig: Array
  },
  computed: {
    path() {
      return '/swap';
    }
  }
};
</script>

<style lang="less" scoped>
.sidebar {
  width: 320px;
  height: calc(100vh - 106px);
  padding: 0 0 420px;
  background-image: linear-gradient(164deg, #301853 0%, #1c1243 70%);
}

.menu-item {
  cursor: pointer;
  width: 320px;
  height: 79px;
  position: relative;
  display: flex;
  align-items: center;
  font-family: PingFangSC;
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: justify;
  color: #a6adca;
  .front {
    width: 90px;
    height: 46px;
    margin-right: 11px;
    border-radius: 0 100px 100px 0;
  }
  .icon {
    position: absolute;
    left: 41px;
  }
}
.active {
  font-family: Arial;
  font-size: 21px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: justify;
  color: #ff4b52;
  background-image: linear-gradient(to left, rgba(84, 29, 145, 0), #290b5d);
  .front {
    background-color: #5c00eb;
  }
}
</style>
