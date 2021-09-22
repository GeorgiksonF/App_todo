import Vue from 'vue'
import Vuex from 'vuex'
import todo from './todo'
import comments from './comments'
import search from './search'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isFetching: false
    },
    modules: {
        todo,
        comments,
        search
    }
})

export default store