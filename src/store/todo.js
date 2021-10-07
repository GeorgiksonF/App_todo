import { todoApi } from '../api/api'

const todo = {
    state: () => ({
        isFetching: false,
        todoList: [],
        todoActivePagesCount: null,
        todoCompletedPagesCount: null,
        selectedTodoId: null
    }),
    getters: {
        getActiveTodo(state) {
            return state.todoList.filter(todo => !todo.isCompleted)
        },
        getCertainTodo: state => itemId => {
            return state.todoList.find(todo => todo.id === itemId)
        },
        getCompletedTodo(state) {
            return state.todoList.filter(todo => todo.isCompleted)
        },
        getSelectedTodoId(state) {
            return state.selectedTodoId
        },
        getIsFetching(state) {
            return state.isFetching
        },
        getTodoActivePagesCount(state) {
            return state.todoActivePagesCount
        },
        getTodoCompletedpagesCount(state) {
            return state.todoCompletedPagesCount
        }
    },
    mutations: {
        setTodosPagesCount(state, data) {
            if (data.status === 'active') {
                state.todoActivePagesCount = Math.ceil(data.totalCount / 10)
            } 
            
            if (data.status === 'completed') {
                state.todoCompletedPagesCount = Math.ceil(data.totalCount / 10)
            }
        },
        fillTodoList(state, data) {
            state.todoList = [...state.todoList, ...data.todos]
        },
        createTodo(state, data) {
            state.todoList = [...state.todoList, data.todo]
        },
        completeTodo(state, data) {
            state.todoList.find(todo => todo.id === data.id).isCompleted = true;
        },
        restoreTodo(state, data) {
            state.todoList.find(todo => todo.id === data.id).isCompleted = false;
        },
        removeTodo(state, data) {
            state.todoList = [...state.todoList.filter(todo => todo.id !== data.id)]
        },
        setIsFetching(state) {
            state.isFetching = true
            console.log(state.isFetching)
        },
        unsetIsFetching(state) {
            state.isFetching = false
            console.log(state.isFetching)
        },
        setSelectedTodoId(state, id) {
            state.selectedTodoId = id
        }
    },
    actions: {
        getTodosActive({commit}, page = 1) {
            todoApi.getTodosActive(page)
                .then(res => {
                    commit({
                        type: 'fillTodoList',
                        todos: res.data,
                    })
                    commit({
                        type: 'setTodosPagesCount',
                        status: 'active',
                        totalCount: +res.headers['x-total-count']
                    })
                })
            },
            getTodosCompleted({commit}, page = 1) {
                todoApi.getTodosCompleted(page)
                .then(res => {
                    commit({
                        type: 'fillTodoList',
                        todos: res.data,
                    })
                    commit({
                        type: 'setTodosPagesCount',
                        status: 'completed',
                        totalCount: +res.headers['x-total-count']
                    })
                })
        },
        createTodo({commit}, todo) {
            todoApi.createTodo(todo)
                .then(() => {
                    commit({
                        type: 'createTodo',
                        todo
                    })
                })
        },
        completeTodo({commit}, todo) {
            todoApi.completeTodo(todo)
                .then(() => {
                    commit({
                        type: 'completeTodo',
                        id: todo.id
                    })
                })
        },
        restoreTodo({commit}, todo) {
            todoApi.restoreTodo(todo)
                .then(() => {
                    commit({
                        type: 'restoreTodo',
                        id: todo.id
                    })
                })
        },
        removeTodo({commit}, itemId) {
            todoApi.removeTodo(itemId)
                .then(() => {
                    commit({
                        type: 'removeTodo',
                        id: itemId
                    })
                })
        },
    }
}

export default todo;