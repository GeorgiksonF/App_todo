import { searchApi } from '../api/api'

const search = {
    state: () => ({
        searchTodos: [],
        searchText: ''
    }),
    getters: {
        getSearchTodosActive(state) {
            return state.searchTodos.filter(todo => todo.isCompleted === false)
        },
        getSearchTodosCompleted(state) {
            return state.searchTodos.filter(todo => todo.isCompleted === true)
        },
        getSearchText(state) {
            return state.searchText
        }
    },
    mutations: {
        fillSearchTodosList(state, searchTodos) {
            state.searchTodos = [...searchTodos.todos]
        },
        setSearchText(state, data) {
            state.searchText = data.searchText
        }
    },
    actions: {
        getSearchTodos({commit}, searchText) {
            searchApi.getSearchTodos(searchText)
                .then(res => {
                    commit({
                        type: 'fillSearchTodosList',
                        todos: res.data
                    })
                    commit({
                        type: 'setSearchText',
                        searchText
                    })
                })
        }
    }
}

export default search;