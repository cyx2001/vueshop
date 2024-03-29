import Vue from "vue"
import Vuex from "vuex"
import goods_create from "./modules/goods_create.js"
import user from "./modules/user.js"
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        goods_create,
        user
    }
})