<template>
    <div class="todo">
        <TodoList 
            :todos="activeTodo"
            title="On Hold"
            :pagesCount="getTodoActivePagesCount"
        />
        <TodoList 
            :todos="completedTodo"
            title="Completed"
            :pagesCount="getTodoCompletedpagesCount"
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
                'getCompletedTodo',
                'getTodoActivePagesCount',
                'getTodoCompletedpagesCount'
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

        &__more {
            display: flex;
            justify-content: center;
            margin: 30px 0px;
        }

        &__more-btn {
            padding: 8px 30px;
            color: $white;
            background: $main-title;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            box-shadow: 1px 1px 4px $black;
            
            &:active {
                background: rgba($main-title, .9);
                box-shadow: 1px 1px 4px rgba($main-title, .7);
                transition: .2s;
            }
        }
    }
</style>