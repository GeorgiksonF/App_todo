import Vue from 'vue'
import Vuex from 'vuex'
import todo from './todo'
import comments from './comments'
import search from './search'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        todo,
        comments,
        search
    },
    actions: {
        fetchData({dispatch}) {
            return dispatch('getTodos')
                .then(() => {
                    dispatch('getUsers')
                })
        }
    }
})

export default store