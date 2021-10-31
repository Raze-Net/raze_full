<template>
  <div class="sidebar">
    <div
      :class="['menu-item',path===menu.key?'active':'']"
      v-for="(menu,index) in menuConfig"
      :key="index"
      @click="hrefto(menu)"
    >
      <div class="front">
      </div>
      <img
        class="icon"
        :src="menu.icon"
      >
       <el-dropdown @command="swap" v-if="menu.title === 'Swap'" placement="right">
            <span class="el-dropdown-link">
                Swap<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="BNB">BNB</el-dropdown-item>
                <el-dropdown-item command="DAI" disabled>DAI</el-dropdown-item>
                <el-dropdown-item command="USDT" disabled>USDT</el-dropdown-item>
                <el-dropdown-item command="Raze" disabled>Raze</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span v-else>{{menu.title}}</span>
    </div>
  </div>
</template>

<script>
import { Dropdown, DropdownItem, DropdownMenu } from 'element-ui';
import { showLoading, hideLoading } from '../loading';

export default {
  props: {
    menuConfig: Array
  },
  components: {
      ElDropdown: Dropdown,
      ElDropdownItem: DropdownItem,
      ElDropdownMenu: DropdownMenu,
  },
  computed: {
    path() {
      return '/swap';
    }
  },
  methods: {
      hrefto(item) {
          if (item.type === 'link') {
              window.open(item.linkto);
              return;
          }
        //   if (item.type === 'router') {
        //       this.$router.push('/process');
        //       return;
        //   }
      },
      async swap(command){
          if (!this.$raze.razeClient) {
           try {
               await this.initRazeClient();
           } catch (error) {
               this.$message('Connect wallet Error');
               console.error(error);
           }
        }
        if (this.$store.state.type === command) {
            this.$message('You Are Already Here');
            return;
        }
        this.$store.commit('setType', command);
        switch(command) {
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
  .el-dropdown-link {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
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
