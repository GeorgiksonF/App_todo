<template>
    <div class="todo-item__menu-wrap">
        <div class="todo-item__menu-close" v-if="isShownMenu" @click="closeMenu"></div>
        <div class="todo-item__menu" @click="toggleMenu">
            <transition name="fade">
                <ul class="todo-item__menu-list" v-if="isShownMenu">
                    <li v-if="!isCompleted" @click="onCompleteTodo">Выполнить</li>
                    <li v-if="!isCompleted">Добавить комментарий</li>
                    <li v-if="isCompleted">Восстановить</li>
                    <li @click="onRemoveTodo">Удалить</li>
                </ul>
            </transition>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: {
            'itemId': String,
            'isCompleted': Boolean
        },
        data() {
            return {
                isShownMenu: false,
            }
        },
        computed: {
            ...mapGetters(['getCertainTodo'])
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
            onRemoveTodo() {
                this.$store.dispatch('removeTodo', this.itemId)
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