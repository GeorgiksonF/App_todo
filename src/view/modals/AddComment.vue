<template>
    <div class="modal">
        <div class="modal__blocker" @click.self="closeAddComment">
            <div class="modal__section">
                <div v-if="errors.length" class="errors">
                    <ul class="errors__list">
                        <li 
                            v-for="(error, key) in errors" 
                            :key="key"
                            class="errors__item"
                        >
                            {{ error }}
                        </li>
                    </ul>
                </div>
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
    import {mapActions, mapGetters} from 'vuex'
    import dayjs from 'dayjs'

    export default {
        data() {
            return {
                newComment: {
                    id: null,
                    taskId: '',
                    userId: '',
                    description: 'Comment on your task',
                    message: '',
                    time: null
                },
                errors: []
            }
        },
        props: {
            'closeAddComment': Function
        },
        computed: {
            ...mapGetters(['getSelectedTodoId'])
        },
        methods: {
            onSendComment() {
                if (this.checkForm()) {
                    this.closeAddComment()
                    this.newComment.id = uuidv4()
                    this.newComment.taskId = this.getSelectedTodoId
                    this.newComment.time = dayjs().toISOString()
                    this.newComment.userId = '1' // hardcode userId
                    this.createComment(this.newComment) 
                }
            },
            checkForm() {
                this.errors = []

                if (this.newComment.message.trim() === '') {
                    this.errors.push('You can\'t send empty message!')
                    return false
                } 
                
                return true
            },
            ...mapActions(['createComment'])
        }
    }
</script>