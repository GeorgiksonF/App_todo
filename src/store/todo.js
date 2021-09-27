import { todoApi } from '../api/api'

const todo = {
    state: () => ({
        todoList: [],
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
        getSelectedTodo(state) {
            return state.todoList.find(todo => todo.isSelected ? todo.id : null)
        }
    },
    mutations: {
        fillTodoList(state, todoList) {
            state.todoList = [...todoList.todos]
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
        selectTodo(state, itemId) {
            state.todoList = state.todoList.map(todo => {
                if (todo.id === itemId) {
                    return {
                        ...todo,
                        isSelected: true
                    }
                }
                return {
                    ...todo,
                    isSelected: false
                }
            })
        }
    },
    actions: {
        getTodos({commit}) {
            todoApi.getTodoList()
                .then(res => {
                    commit({
                        type: 'fillTodoList',
                        todos: res.data
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
            delete todo.isSelected
            todoApi.completeTodo(todo)
                .then(() => {
                    commit({
                        type: 'completeTodo',
                        id: todo.id
                    })
                })
        },
        restoreTodo({commit}, todo) {
            delete todo.isSelected
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