<template>
  <div
    :class="side?'header header-side':'header'"
    :style="{'background-color':bgColor,'padding-left':tab?'63px':'41px'}"
  >
    <img
      class="header-img"
      src="@/assets/images/home.png"
      @click="gohome"
    >
    <ul
      class="header-nav-item"
      v-show="tab"
    >
    <!-- @click="$router.push('/process')" -->
      <li >
        <el-dropdown @command="swap">
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
      </li>
      <li>
          <a 
            href="https://docs.raze.network/tutorial/testnet-configuration" 
            class="anchorotherweb" 
            target="_blank"
          >Bridge</a>
      </li>
      <li>
          <a 
            href="https://docs.raze.network/tutorial/testnet-configuration" 
            class="anchorotherweb"
            target="_blank"
        >Tutorial</a>
        </li>
      <li>
          <a href="https://www.raze.network/" class="anchorotherweb" target="_blank">About</a>
      </li>
     
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
import { mapState } from 'vuex';
import { Dropdown, DropdownItem, DropdownMenu } from 'element-ui';
import { showLoading, hideLoading } from '../loading';

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
  components: {
      ElDropdown: Dropdown,
      ElDropdownItem: DropdownItem,
      ElDropdownMenu: DropdownMenu,
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    user: state => {
        const userall = state.user
        const pre = userall.substring(0, 5)
        const behined = userall.substring(userall.length - 7)
        return `${pre}......${behined}`
    },
    type: state => {
        return state.type
    }
  }),
  methods:{
      gohome() {
          this.$router.push('/');
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
  cursor: pointer;
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
  .el-dropdown-link {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
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
.anchorotherweb {
    text-decoration: none;
    color: #fff;
}
</style>
