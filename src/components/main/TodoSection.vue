<template>
    <div class="todo">
        <TodoList 
            :todos="activeTodo"
            title="On Hold"
        />
        <TodoList 
            :todos="completedTodo"
            title="Completed"
        />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import TodoList from './TodoList'

    export default {
        computed: {
            activeTodo() {
                if (this.getSearchText !== '') {
                    return this.getSearchTodosActive
                }

                return this.getActiveTodo
            },
            completedTodo() {
                if (this.getSearchText !== '') {
                    return this.getSearchTodosCompleted
                }

                return this.getCompletedTodo
            },
            ...mapGetters([
                'getSearchText',
                'getSearchTodosActive',
                'getSearchTodosCompleted',
                'getActiveTodo',
                'getCompletedTodo'
                ])
        },
        components: {
            TodoList,
        }
    }
</script>

<style lang="scss">
    .todo {
        margin-top: 40px;
        
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