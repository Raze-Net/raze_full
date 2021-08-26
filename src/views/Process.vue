<template>
  <div class="process">
    <header-nav
      class="header"
      :tab="false"
      :side="true"
    ></header-nav>
    <side-bar
      class="sidebar"
      :menuConfig="menuConfig"
    ></side-bar>
    <div class="main">
      <balance></balance>
      <transaction></transaction>
    </div>
  </div>
</template>

<script>
import headerNav from '../components/HeaderNav';
import sideBar from '../components/SideBar';
import balance from '../components/Balance';
import transaction from '../components/Transaction';

export default {
  name: 'Process',
  data() {
    return {
      menuConfig: [
        {
          title: 'Swap',
          key: '/swap',
          icon: `${require('../assets/icon/invalid-name.png')}`
        },
        {
          title: 'Bridge',
          key: '/bridge',
          icon: `${require('../assets/icon/loading.png')}`
        },
        {
          title: 'Tutorial',
          icon: `${require('../assets/icon/play.png')}`
        },
        {
          title: 'Q&A',
          icon: `${require('../assets/icon/help.png')}`
        },
        {
          title: 'Info',
          icon: `${require('../assets/icon/prompt.png')}`
        }
      ]
    };
  },
  components: {
    headerNav,
    sideBar,
    balance,
    transaction
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header {
  width: 100%;
  ::v-deep .header-info {
    background-image: linear-gradient(40deg, #3d1861 48%, #461b66 100%),
      linear-gradient(to right, #e388e8 16%, #590ab7 150%);
  }
  ::v-deep .header-language {
    background-image: linear-gradient(40deg, #3d1861 48%, #461b66 100%),
      linear-gradient(to right, #e388e8 16%, #590ab7 150%);
  }
}
.process {
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(40deg, #1e0f51 48%, #4e1d69 100%);
}
.main {
  flex: 1;
  padding: 0 35px;
}
</style>
