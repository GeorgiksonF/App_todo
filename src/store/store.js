import Vue from 'vue'
import Vuex from 'vuex'
import todo from './todo'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        hello: 'hello'
    },
    modules: {
        todo
    }
})

export default store