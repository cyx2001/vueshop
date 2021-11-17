import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import store from './store/index.js'
// import { FormItem } from 'element-ui'
// Vue.use(FormItem)
Vue.config.productionTip = false

//配置全局变量
import $icof from './common/config/config.js'
Vue.prototype.$icof = $icof

import vueDND from 'awe-dnd'
Vue.use(vueDND)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')