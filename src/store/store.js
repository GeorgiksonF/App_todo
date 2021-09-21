import Vue from 'vue'
import Vuex from 'vuex'
import todo from './todo'
import comments from './comments'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isFetching: false
    },
    modules: {
        todo,
        comments
    }
})

export default store