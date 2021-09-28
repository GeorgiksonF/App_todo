<template>
    <div class="modal">
        <div class="modal__blocker" @click.self="closeAddComment">
            <div class="modal__section">
                <form action="" class="form">
                    <div class="form__item">
                        <label class="form__label" for="comment-text">Comment</label>
                        <textarea class="form__textarea" type="text" id="comment-text" v-model="newComment.message"></textarea>
                    </div>
                    <input type="button" value="Send" class="form__btn" @click="onSendComment">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { uuidv4 } from '/src/helpers'
    import {mapGetters} from 'vuex'
    import dayjs from 'dayjs'

    export default {
        data() {
            return {
                newComment: {
                    id: null,
                    taskId: '',
                    userId: '',
                    text: '',
                    message: '',
                    time: null
                }
            }
        },
        props: {
            'closeAddComment': Function
        },
        computed: {
            ...mapGetters(['getSelectedTodo'])
        },
        methods: {
            onSendComment() {
                this.closeAddComment()
                this.newComment.id = uuidv4()
                this.newComment.taskId = this.getSelectedTodo.id
                this.newComment.time = dayjs().toISOString()
                this.newComment.userId = '1' // hardcode userId
                this.$store.dispatch('createComment', this.newComment) 
            }
        }
    }
</script>