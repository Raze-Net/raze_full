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
          description: 'Deposit BNB to rBNB',
          icon: require('../assets/icon/5.png'),
          tip: '0 Unit BNB = 0 BNB',
          needmax: false,
        },
        {
          title: 'Transfer',
          description: 'My Raze Account Address',
          icon: require('../assets/icon/6.png'),
          address: true,
          needmax: true,
        },
        {
          title: 'Redeem',
          description: 'Redeem rBNB to BNB',
          icon: require('../assets/icon/6.png'),
          tip: 'You will receive 0 Unit BNB',
          needmax: true,
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
