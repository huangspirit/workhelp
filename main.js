import Vue from 'vue'
import App from './App'
import './assets/css/public.less' // 全局引入less
import './assets/js'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
