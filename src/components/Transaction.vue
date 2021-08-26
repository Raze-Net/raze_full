<template>
  <div class="confirm">
    <transaction-item
      v-for="(item,index) in transationDataList"
      :key="index"
      :transactionData="item"
    ></transaction-item>
  </div>
</template>

<script>
import transactionItem from '../components/TransactionItem';
export default {
  data() {
    return {
      transationDataList: [
        {
          title: 'Mint',
          description: 'Deposit ETH to pETH',
          icon: require('../assets/icon/5.png'),
          tip: '0 Unit ETH = 0 ETH'
        },
        {
          title: 'Transfer',
          description: 'My Raze Account Address',
          icon: require('../assets/icon/6.png'),
          address: true
        },
        {
          title: 'Redeem',
          description: 'Redeem pETH to ETH',
          icon: require('../assets/icon/6.png'),
          tip: 'You will receive 0 Unit ETH'
        }
      ]
    };
  },
  components: {
    transactionItem
  }
};
</script>

<style lang="less" scoped>
.confirm {
  width: 100%;
  margin-top: 23px;
  display: flex;
  justify-content: space-between;
}
</style>
