<template>
    <div class="todo-item__menu-wrap">
        <div class="todo-item__menu-close" v-if="isShownMenu" @click="closeMenu"></div>
        <div class="todo-item__menu" @click="toggleMenu">
            <transition name="fade">
                <ul class="todo-item__menu-list" v-if="isShownMenu">
                    <li v-if="!isCompleted" @click="onCompleteTodo">Выполнить</li>
                    <li v-if="!isCompleted" @click="shownAddComment">Добавить комментарий</li>
                    <li v-if="isCompleted" @click="onRestoreTodo">Восстановить</li>
                    <li @click="onRemoveTodo">Удалить</li>
                </ul>
            </transition>
        </div>
        <TodoAddComment v-if="isShownAddComment" :closeAddComment="closeAddComment"/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import TodoAddComment from './TodoAddComment'

    export default {
        props: {
            'itemId': String,
            'isCompleted': Boolean
        },
        data() {
            return {
                isShownMenu: false,
                isShownAddComment: false
            }
        },
        computed: {
            ...mapGetters(['getCertainTodo'])
        },
        components: {
            TodoAddComment,
        },
        methods: {
            toggleMenu() {
                this.isShownMenu = !this.isShownMenu;
            },
            closeMenu() {
                this.isShownMenu = false;
            },
            onCompleteTodo() {
                this.$store.dispatch('completeTodo', this.getCertainTodo(this.itemId))
            },
            onRestoreTodo() {
                this.$store.dispatch('restoreTodo', this.getCertainTodo(this.itemId))
            },
            onRemoveTodo() {
                this.$store.dispatch('removeTodo', this.itemId)
            },
            shownAddComment() {
                this.isShownAddComment = true
            },
            closeAddComment() {
                this.isShownAddComment = false
            },
        },
    }
</script>

<style lang="scss">
    .fade-enter-active, 
    .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>