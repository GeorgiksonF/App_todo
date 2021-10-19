<template>
    <div class="notices">
        <div class="notice__item" v-if="this.todoList.length === 0">Задачи отсутствуют</div>
        <div class="notice__item" v-else-if="this.searchTodoList.length === 0 && searchText !== ''">Результаты отсутствуют</div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        computed: {
            ...mapState({
                todoList: state => state.todo.todoList,
                searchTodoList: state => state.search.searchTodos,
                searchText: state => state.search.searchText
            }),
        }   
    }
</script>

<style lang="scss">
    .notices {
        display: flex;
        justify-content: center;
        margin-top: 100px;
        font-size: 18px;
    }
</style>