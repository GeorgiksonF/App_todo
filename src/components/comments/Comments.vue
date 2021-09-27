<template>
    <div class="sidebar">
        <Comment 
            v-for="comment in getComments" 
            :key="comment.id"
            :id="comment.id"
            :taskId="comment.taskId"
            :userId="comment.userId"
            :text="comment.text"
            :time="comment.time"
            :message="comment.message"
        />
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Comment from './Comment'

    export default {
        data() {
            return {
                sidebar: 'Sidebar'
            }
        },
        components: {
            Comment
        },
        computed: {
            ...mapGetters(['getComments'])
        }
    }
</script>

<style lang="scss">
    .sidebar {
        margin-top: 5px;
        flex: 3;
    }
</style>