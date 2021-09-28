import { commentsApi } from '../api/api'

const comments = {
    state: () => ({
        comments: [],
        users: [],
    }),
    getters: {
        getComments(state) {
            return state.comments
        },
        getCertainUser: state => userId => {
            return state.users.find(user => user.id === userId)
        }
    },
    mutations: {
        fillCommentsList(state, commentsList) {
            state.comments = [...commentsList.comments]
        },
        fillUsersInfo(state, usersList) {
            state.users = [...usersList.users]
        },
        addComment(state, data) {
            state.comments = [...state.comments, data.comment]
        }
    },
    actions: {
        getComments({commit}, itemId) {
            commentsApi.getCommentsList(itemId)
                .then(res => {
                    commit({
                        type: 'fillCommentsList',
                        comments: res.data
                    })
                })
        },
        getUsers({commit}) {
            commentsApi.getUsersInfo()
                .then(res => {
                    commit({
                        type: 'fillUsersInfo',
                        users: res.data
                    })
                })
        },
        createComment({commit}, comment) {
            commentsApi.createComment(comment)
                .then(() => {
                    commit({
                        type: 'addComment',
                        comment
                    })
                })
        }
    }
}

export default comments;