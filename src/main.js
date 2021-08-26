import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import { Message, Dialog, Loading } from 'element-ui';
import razeApp from './razeClient'
import { showLoading, hideLoading} from './loading'
Vue.use(Vuex)
Vue.use(Dialog);
Vue.use(Loading)
// Vue.use(ElementUI)
const store =  new Vuex.Store({
    state: {
      user: '',
      clientType: '',
      razeBalance: 0,
      mateMaskBalance: 0,
      razeAddress: '',
    },
    mutations: {
      setUser(state, user) {
        state.user = user
      },
      setType(state, type) {
        state.type = type
      },
      setRazeAddress(state, razeAddress) {
        state.razeAddress = razeAddress
      },
      setRazeBalance(state, razeBalance) {
          state.razeBalance = razeBalance
      },
      setMateMaskBalance(state, mateMaskBalance) {
        state.mateMaskBalance = mateMaskBalance
      },
    },
    actions: {
        async getRazeBalance({ commit }) {
            const razeBalance = await razeApp.razeEthBalance()
            commit('setRazeBalance', razeBalance)
        },
        async getMateMaskBalance({ commit, state }) {
            const mateMaskBalance = await razeApp.web3.eth.getBalance(state.user)
            commit('setMateMaskBalance', (mateMaskBalance / 1000000000000000000).toFixed(4))
        },
        async getBalance({ dispatch }) {
            showLoading('Get account information...')
            try {
                await dispatch('getRazeBalance')
                await dispatch('getMateMaskBalance')
            } catch (error) {
                Message('something wrong')
                console.error(error)
            }
            hideLoading()
        }
    }
})


razeApp.init().then( async function() {
    showLoading('connect service...')
    try {
        let accounts = await razeApp.web3.eth.getAccounts();
        const balance = await razeApp.web3.eth.getBalance(accounts[0])
        console.log('banlance', balance) 
        store.commit('setUser', accounts[0])
    } catch (error) {
        Message('something wrong')
    }
    hideLoading()
    
})

Vue.prototype.$raze = razeApp;

// bnjs wendang；generate random characters. 
// login yonghu xinxi 
// Vue.component(Message.name, Message);
Vue.prototype.$message = Message;

Vue.config.productionTip = false

new Vue({
store,
router,
render: h => h(App)
}).$mount('#app')
