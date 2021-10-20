import { todoApi } from '../api/api'

const todo = {
    state: () => ({
        todoList: [],
        todoActivePagesCount: null,
        todoActiveCount: null,
        todoCompletedPagesCount: null,
        selectedTodoId: null,
        statusesList: [
            'Pending',
            'In Progress',
            'Completed',
            'Cancelled'
        ],
        priorityList: [
            'Minor',
            'Normal',
            'Critical'
        ]
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
        getTodoActiveCount(state) {
            return state.todoActiveCount
        },
        getTodoCompletedpagesCount(state) {
            return state.todoCompletedPagesCount
        }
    },
    mutations: {
        setTodosPagesCount(state, data) {
            if (data.status === 'active') {
                state.todoActivePagesCount = Math.ceil(data.totalCount / 10)
                state.todoActiveCount = data.totalCount
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
        setSelectedTodoId(state, id) {
            state.selectedTodoId = id
        },
        changeTodoStatus(state, data) {
            let todo = state.todoList.find(todo => todo.id === data.itemId)
            let statusIndex = state.statusesList.indexOf(todo.status)

            if (statusIndex === state.statusesList.length - 1) {
                return todo.status = state.statusesList[0]
            } 

            return todo.status = state.statusesList[++statusIndex]
        },
        changeTodoPriority(state, data) {
            let todo = state.todoList.find(todo => todo.id === data.itemId)
            let priorityIndex = state.priorityList.indexOf(todo.priority)

            if (priorityIndex === state.priorityList.length - 1) {
                return todo.priority = state.priorityList[0]
            } 

            return todo.priority = state.priorityList[++priorityIndex]
        }
    },
    actions: {
        getTodosActive({commit}, page = 1) {
            return todoApi.getTodosActive(page)
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
            return todoApi.getTodosCompleted(page)
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
            return todoApi.createTodo(todo)
                .then(() => {
                    commit({
                        type: 'createTodo',
                        todo
                    })
                })
        },
        completeTodo({commit}, todo) {
            return todoApi.completeTodo(todo)
                .then(() => {
                    commit({
                        type: 'completeTodo',
                        id: todo.id
                    })
                })
        },
        restoreTodo({commit}, todo) {
            return todoApi.restoreTodo(todo)
                .then(() => {
                    commit({
                        type: 'restoreTodo',
                        id: todo.id
                    })
                })
        },
        removeTodo({commit}, itemId) {
            return todoApi.removeTodo(itemId)
                .then(() => {
                    commit({
                        type: 'removeTodo',
                        id: itemId
                    })
                })
        },
        updateTodoStatus({commit, getters}, itemId) {
            commit({
                type: 'changeTodoStatus',
                itemId
            })
            return todoApi.changeTodoValues(getters.getCertainTodo(itemId))
        },
        updateTodoPriority({commit, getters}, itemId) {
            commit({
                type: 'changeTodoPriority',
                itemId
            })
            return todoApi.changeTodoValues(getters.getCertainTodo(itemId))
        }
    }
}

export default todo;