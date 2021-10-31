<template>
  <div class="transaction-item">
    <div class="title">{{transactionData.title}}</div>
    <div class="description" >
        <span v-if="transactionData.title === 'Transfer'" @click="getMySelfAddress" class="address-description">
            {{transactionData.description}}
        </span>
        <span v-else>{{transactionData.description}}</span>
    </div>
    <div class="input-box">
      <input
        type="text"
        placeholder="0 Unit"
        v-model="value"
        @input="filter"
      >
      <div class="max-btn" @click="setMax" v-if="transactionData.needmax">Max</div>
      <img :src="transactionData.icon">
    </div>
    <div class="tip">{{tips}}</div>
    <div
      class="recipient-address"
      v-if="transactionData.address"
    >
      <div class="address-title">Recipient address</div>
      <div class="address-border">
        <textarea
          class="address-textarea"
          type="text"
          v-model="remoteAddress"
          placeholder="please input remote address "
          :rows="3"
        ></textarea>
      </div>
    </div>
    <div
      class="confirm-btn"
      :class="transactionData.title =='Redeem'?'redeem':''"
      @click="behive"
    >
      <span>Confirm {{transactionData.title}}</span>
    </div>
    <div class="address-dialog">
        <ElDialog
            :visible.sync="addressDialogVisible"
            width="500px"
            :modal="false"
            :modal-append-to-body="false"
            append-to-body
            custom-class="address-dialog"
        >
            <template slot="title"></template>
            <div class="addressDialog-title"><h1>Your Raze Account Address</h1></div>
            <div class="addressDialog-tip">A Raze ERC20 token account is identified by a ElGamal public key. It serves as inputs whenever the users invoke the Fund, Transfer, and Burn contracts.</div>
            <div class="address-border">
                <textarea
                    class="address-textarea"
                    type="text"
                    v-model="accountAddress"
                    :rows="3"
                ></textarea>
            </div>
            <div slot="footer">
                <div class="address-copy-btn" :data-clipboard-text="accountAddress" @click="copy">
                    <span >
                    Copy
                    </span>
                </div>
            </div>
        </ElDialog>
    </div>
  </div>
</template>

<script>
import { showLoading, hideLoading } from '../loading'
import { Dialog, MessageBox } from 'element-ui'
import { mapState } from 'vuex'
import Clipboard from 'clipboard'
export default {
  props: {
    transactionData: Object,
  },
  data: function() {
    return {
        value: null,
        remoteAddress: '',
        addressDialogVisible: false
    };
  },
  components: {
      ElDialog: Dialog,
  },
  methods: {
      async behive(){
        if (!this.$store.state.type) {
            this.$message({
                type: 'error',
                message: 'Encountered an error, please refresh the page, login again and try again'
            })
        }
        if (!this.value) return 
        try {
            switch(this.transactionData.title) {
              case 'Mint': {
                  await this.mint()
                  this.value = null
                  this.remoteAddress = ''
                  this.$store.dispatch('getBalance')
                  break;
              }
              case 'Transfer': {
                  if (!this.remoteAddress) {
                      this.$message({type: 'warning', message: 'Need Remote Address'})
                      return
                  }
                  MessageBox.confirm('Are You Sure To Transfer?', 'Tips', {
                      confirmButtonText: 'Confirm',
                      cancelButtonText: 'Cancel',
                      customClass: 'raze-messagebox'
                  }).then(async () => {
                      try {
                        await this.Transfer()
                        this.value = null
                        this.remoteAddress = ''
                        this.$store.dispatch('getBalance')
                        this.$message({
                            type: 'success',
                            message: 'Success!'
                        });
                      } catch (error) {
                          console.log('error')
                      }
                    }).catch(() => {
                        return         
                    });
                  break;
              }
              case 'Redeem': {
                  await this.Redeem()
                  this.value = null
                  this.remoteAddress = ''
                  this.$store.dispatch('getBalance')
                  break;
              }
            }
         
        } catch (error) {
            this.$message({
                type: 'error',
                message: error.message
            })
            console.error(error)
        }
      },
      async mint() {
        switch(this.$store.state.type) {
          case 'BNB': {
              showLoading('In execution...')
              try {
                  await this.$raze.razeEthDeposit(this.value)
              } catch (error) {
                  if (error) {
                     this.$message(error);
                     hideLoading()
                     return  
                  }
                  this.$message('Something Went Wrong.')
                  console.error(error)
              }
              hideLoading()
          }
        }
      },
      async Transfer() {
        switch(this.$store.state.type) {
          case 'BNB': {
              showLoading('In execution...')
              try {
                  await this.$raze.razeEthTransfer(this.remoteAddress, this.value)
              } catch (error) {
                  if (error) {
                     this.$message(error);
                     hideLoading()
                     return  
                  }
                  this.$message('Something Went Wrong.')
                  console.error(error)
              }
              hideLoading()
          }
        }
      },
      async Redeem() {
        switch(this.$store.state.type) {
          case 'BNB': {
              showLoading('In execution...')
              try {
                  await this.$raze.razeEthWithdraw(this.value)
              } catch (error) {
                  if (error) {
                     this.$message(error);
                     hideLoading()
                     return  
                  }
                  this.$message('Something Went Wrong.')
                  console.errror(error)
              }
              hideLoading()
          }
        }
      },
      async getMySelfAddress(){
          if (this.transactionData.title !== 'Transfer') {
              return
          }
          this.addressDialogVisible = true
      },
      copy() {
          const clipboard = new Clipboard('.address-copy-btn')
          clipboard.on('success', () => {
                this.$message('Copy Successful')
                //  释放内存
                clipboard.destroy()
          })
           clipboard.on('error', () => {
                this.$message('The browser does not support replication')
                //  释放内存
                clipboard.destroy()
          })
      },
      setMax() {
          try {
            switch(this.transactionData.title) {
                case 'Mint': {
                  this.setMateMaskMax()
                  break;
                }
                case 'Transfer': 
                case 'Redeem': {
                    this.setRazeMax()
                    break;
                }
               
            }
          } catch (error) {
              console.error(error)
          }
      },
      async setMateMaskMax() {
          this.value = this.$store.state.mateMaskBalance * 100
      },
      setRazeMax() {
          this.value = this.$store.state.razeBalance
      },
      filter() {
          this.value = this.value.replace(/[^\d]/g,'')
      }
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    accountAddress: state => state.razeAddress ,
    tips() {
        switch(this.transactionData.title) {
            case 'Mint': {
                return `${this.value} Unit BNB = ${Math.floor(this.value / 100)} BNB`
            }
            case 'Transfer': 
                return ''
            case 'Redeem': {
                return `You will receive ${Math.floor(this.value / 100)} BNB`
            }
               
        }
    },
  })
};
</script>

<style lang="less" scoped>
.transaction-item {
  position: relative;
  flex: 1;
  height: 476px;
  opacity: 0.68;
  padding: 1px;
  border-radius: 7px;
  border-style: solid;
  border-width: 1px;
  border-image-source: linear-gradient(86deg, #341774 -69%, #5615e0 199%);
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #210a57, #210a57),
    linear-gradient(86deg, #341774 -69%, #5615e0 199%);
  background-origin: border-box;
  background-clip: content-box, border-box;

  &:not(:last-child) {
    margin-right: 21px;
  }
}
.title {
  margin: 35px 23px 0;
  height: 60px;
  font-family: DIN;
  font-size: 60px;
  font-weight: bold;
  font-stretch: condensed;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: justify;
  color: #5f95ff;
}
.description {
  margin: 10px 24px 0;
  font-family: Arial;
  font-size: 21px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: justify;
  color: rgba(120, 149, 255, 0.57);
}
.input-box {
  height: 56px;
  margin: 50px 23px 12px;
  padding: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 7px;
  border-style: solid;
  border-width: 1px;
  border-image-source: linear-gradient(86deg, #5c00eb -69%, #de637a 199%);
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #210a57, #210a57),
    linear-gradient(86deg, #5c00eb -69%, #de637a 199%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  input {
    width: 100px;
    flex: 1;
    padding-left: 15px;
    background-color: transparent;
    outline: none;
    border: none;
    font-family: Arial;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: justify;
    color: rgba(200, 148, 254, 0.57);
    &::placeholder {
      color: rgba(200, 148, 254, 0.57);
    }
  }
  .max-btn {
    cursor: pointer;
    width: 56px;
    height: 38px;
    padding: 9px 10px 9px 11px;
    border-radius: 20px;
    border: solid 1px #5067b9;
    background-color: #2e2062;
    font-family: Arial;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: justify;
    color: #7895ff;
  }
}
.tip {
  margin: 12px 0 0 23px;
  font-family: Arial;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: justify;
  color: rgba(186, 120, 255, 0.57);
}
.recipient-address {
  margin: 28px 23px 0;
  .address-title {
    font-family: Arial;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: justify;
    color: #774ab6;
  }
  
}
.address-border {
    width: 100%;
    height: 66px;
    margin: 7px 0 36px;
    padding: 1px;
    border-radius: 7px;
    border-style: solid;
    border-width: 1px;
    border-image-source: linear-gradient(85deg, #5c00eb -69%, #de637a 198%);
    border-image-slice: 1;
    background-image: linear-gradient(to bottom, #210a57, #210a57),
      linear-gradient(85deg, #5c00eb -69%, #de637a 198%);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
  .address-textarea {
    width: calc(100% - 20px);
    overflow-y: auto;
    height: 44px;
    padding: 8px;
    outline: none;
    background: none;
    border: none;
    resize: none;
    font-family: Arial;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: justify;
    color: rgba(200, 148, 254, 0.57);
    &::placeholder {
      color: rgba(200, 148, 254, 0.57);
      font-size: 19px;
    }
  }
.confirm-btn, .address-copy-btn {
  cursor: pointer;
  width: calc(100% - 46px);
  height: 46px;
  position: absolute;
  bottom: 32px;
  left: 23px;
  background-image: linear-gradient(
    -40deg,
    transparent 15px,
    #de637a -51%,
    #5c00eb 95%,
    transparent 20px
  );
  font-family: Helvetica;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 46px;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  &::after {
    content: '';
    display: block;
    position: absolute;
    width: calc(100% - 4px);
    height: 42px;
    top: 2px;
    left: 2px;
    background-image: linear-gradient(
      -40deg,
      transparent 15px,
      #200e50 15px,
      #200e50 95%,
      transparent 20px
    );
  }
  span {
    z-index: 99;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
}
.redeem::after {
  background-image: none;
}
/deep/ .el-dialog{
    background-color: #290b5d;
}
.address-dialog {
    background-color: #290b5d;
}
.addressDialog-title h1 {
    color: #b9aaff;
    text-align: center;
    font-family: PingFangSC-Thin,sans-serif;
    margin-bottom: 0;
}
.addressDialog-tip {
    color: hsla(0,0%,100%,.5);
    text-align: center;
    margin: 20px 0;
    font-size: 14px;
}
.addressDialog-inputContainer {
    margin-top: 30px;
}
.address-description {
    cursor: pointer;
}
.address-description:hover {
    text-decoration: underline;
    color: #b9aaff;
}

</style>