import { commentsApi } from '../api/api'

const comments = {
    state: () => ({
        comments: [],
        users: [],
        commentsCount: null,
        commentsPage: 1
    }),
    getters: {
        getCommentsList(state) {
            return state.comments
        },
        getCertainUser: state => userId => {
            return state.users.find(user => user.id === userId)
        },
        getCommentsCount(state) {
            return state.commentsCount
        },
        getCommentsPage(state) {
            return state.commentsPage
        }
    },
    mutations: {
        fillCommentsList(state, data) {
            if (data.page === 1) {
                return state.comments = [...data.commentsList]
            }
            
            return state.comments = [...state.comments, ...data.commentsList]
        },
        fillUsersInfo(state, usersList) {
            state.users = [...usersList.users]
        },
        addComment(state, data) {
            state.comments = [...state.comments, data.comment]
        },
        setCommentsCount(state, data) {
            state.commentsCount = data.totalCount
        },
        setCommentPage(state, page) {
            if (page) {
                return state.commentsPage = page
            }
            
            return state.commentsPage = ++state.commentsPage
        }
    },
    actions: {
        getComments({commit}, params) {
            return commentsApi.getCommentsList(params.id, params.page)
                .then(res => {
                    commit({
                        type: 'fillCommentsList',
                        commentsList: [...res.data],
                        page: params.page
                    })
                    commit({
                        type: 'setCommentsCount',
                        totalCount: +res.headers['x-total-count']
                    })
                })
        },
        getUsers({commit}) {
            return commentsApi.getUsersInfo()
                .then(res => {
                    commit({
                        type: 'fillUsersInfo',
                        users: res.data
                    })
                })
        },
        createComment({commit}, comment) {
            return commentsApi.createComment(comment)
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