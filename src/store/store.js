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
            return Promise.all([
                dispatch('getTodosActive'),
                dispatch('getTodosCompleted'),
                dispatch('getUsers')
            ]).catch(res => res)
        }
    }
})

export default store