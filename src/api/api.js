import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

export const todoApi = {
    getTodoList() {
        return instance.get('/todos')
                .then(res => res)
    },
    getTodoListActive() {
        return instance.get('/todos?isCompleted=false&_page=1&_limit=10')
                .then(res => res)
    },
    getTodoListCompleted() {
        return instance.get('/todos?isCompleted=true&_page=1&_limit=10')
                .then(res => res)
    },
    createTodo(todo) {
        return instance.post('/todos', todo, {"Content-Type": "application/json"})
                .then(res => res)
    },
    completeTodo(todo) {
        return instance.put(`/todos/${todo.id}`, {...todo, "isCompleted": true}, {"Content-Type": "application/json"})
                .then(res => res)
    },
    restoreTodo(todo) {
        return instance.put(`/todos/${todo.id}`, {...todo, "isCompleted": false}, {"Content-Type": "application/json"})
                .then(res => res)
    },
    removeTodo(itemId) {
        return instance.delete(`/todos/${itemId}`)
                .then(res => res)
    }
}

export const commentsApi = {
    getCommentsList(itemId) {
        return instance.get(`/comments?taskId=${itemId}`)
                .then(res => res)
    },
    getUsersInfo() {
        return instance.get(`/users`)
                .then(res => res)    },
    createComment(comment) {
        return instance.post('/comments', comment, {"Content-Type": "application/json"})
                .then(res => res)
    }
}

export const searchApi = {
    getSearchTodos(searchText) {
        return instance.get(`/todos?text_like=${searchText}`)
                .then(res => res)
    }
}