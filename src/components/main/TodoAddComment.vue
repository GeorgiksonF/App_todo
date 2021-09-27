<template>
    <div class="comment-form">
        <div class="comment-form__blocker" @click="closeAddComment"></div>
        <div class="comment-form__section">
            <form action="" class="comment-form__form">
                <div class="comment-form__item comment-form__item--text">
                    <label for="comment-text">Комментарий</label>
                    <textarea type="text" id="comment-text" v-model="newComment.message"></textarea>
                </div>
                <input type="button" value="Отправить" class="comment-form__item comment-form__item--send" @click="onSendComment">
            </form>
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
                    id: uuidv4(),
                    taskId: '',
                    userId: '1',
                    text: '',
                    message: '',
                    time: dayjs().toISOString()
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
                this.newComment.taskId = this.getSelectedTodo.id
                this.$store.dispatch('createComment', this.newComment) 
            }
        }
    }
</script>

<style lang="scss">
    .comment-form {
        &__blocker {
            background: rgba($black, 0.5);
            @include blocker(1);
        }

        &__section {
            position: fixed;
            padding: 20px;
            top: 36%;
            left: 36%;
            background: $white;
            border-radius: 7px;
            box-shadow: 1px 1px 10px rgba($black, 0.4);
            z-index: 15;
        }

    }
</style>