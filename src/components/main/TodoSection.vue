<template>
    <div class="todo">
        <TodoList 
            :todos="getActiveTodo"
            title="On Hold"
        />
        <TodoList 
            :todos="getCompletedTodo"
            title="Completed"
        />
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import TodoList from './TodoList'

    export default {
        computed: {
            ...mapGetters([
                'getActiveTodo',
                'getCompletedTodo'
            ]),
        },
        components: {
            TodoList,
        }
    }
</script>

<style lang="scss">
    .todo {
        margin-top: 40px;
        margin-right: 20px;
        
        &__list {
            &:not(:first-child) {
                margin-top: 27px;
            }
        }

        &__title {
            margin-bottom: 10px;
            font-size: 18px;
        }
    }
</style>