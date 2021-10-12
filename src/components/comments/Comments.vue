<template>
    <div class="sidebar">
        <Comment 
            v-for="comment in getCommentsList" 
            :key="comment.id"
            :id="comment.id"
            :taskId="comment.taskId"
            :userId="comment.userId"
            :description="comment.description"
            :time="comment.time"
            :message="comment.message"
        />
        <keep-alive>
            <div class="sidebar__loader loader" v-if="loader">
                <img src="~@/assets/img/rhombus.gif" alt="loader">
            </div>
        </keep-alive>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import Comment from './Comment'

    export default {
        data() {
            return {
                commentsPage: 1,
                pageSize: 10,
                loader: false
            }
        },
        components: {
            Comment
        },
        methods: {
            onCommentScroll() {
                if (this.getCommentsList.length) {
                    let elementIndex = this.getCommentsList.length - 1
                    const top = this.$children[elementIndex].$el.getBoundingClientRect().top
                    if (top < 1000 && this.commentsPage < this.getPagesCount) {
                        if (!this.loader) {
                            this.loader = true
                            this.getComments({
                                id: this.getSelectedTodoId, 
                                page: ++this.commentsPage
                            }).finally(() => this.loader = false)
                        }
                    }
                }
            },
            ...mapActions(['getComments']),
        },
        computed: {
            getPagesCount() {
                return Math.ceil(this.getCommentsCount / this.pageSize)
            },
            ...mapGetters(['getCommentsList', 'getCommentsCount', 'getSelectedTodoId'])
        },
        created () {
            window.addEventListener('scroll', this.onCommentScroll);
        },
        destroyed () {
            window.removeEventListener('scroll', this.onCommentScroll);
        }
    }
</script>

<style lang="scss">
    .sidebar {
        margin: 5px 0 60px;
        flex: 3;

        &__loader {
            margin: 30px 0;

            img {
                width: 40px;
            }
        }
    }
</style>