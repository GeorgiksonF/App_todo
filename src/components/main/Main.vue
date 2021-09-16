<template>
    <div class="main">
        <div class="main__header-wrap">
            <h1 class="main__title">You’ve got <span>{{todoList.length + ' task'}}</span> today</h1>
            <a class="main__btn btn btn-add-todo" href="#" @click="showAddTodo">
                <img src="~@/assets/svg/add-todo.svg" alt="add todo">
                <span>Add New</span>
            </a>
        </div>
        <TodoAddModal v-if="isShownAddTodo" :closeAddTodo="closeAddTodo"/>
        <TodoSection v-if="todoList.length !== 0"/>
        <div class="main__no-todo" v-else>Нет задач</div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import TodoSection from './TodoSection'
    import TodoAddModal from './TodoAddModal'

    export default {
        data() {
            return {
                isShownAddTodo: false,
            }
        },
        components: {
            TodoSection,
            TodoAddModal
        },
        computed: {
            ...mapState({
                todoList: state => state.todo.todoList
            }),
        },
        methods: {
            showAddTodo() {
                this.isShownAddTodo = true
            },
            closeAddTodo() {
                this.isShownAddTodo = false
            },
            ...mapActions(['getTodos'])
        },
        created() {
            this.$store.dispatch('getTodos');
        }
    }
</script>

<style lang="scss">
    .main {
        flex: 8;

        &__header-wrap {
            display: flex;
            align-items: center;
        }

        &__title {
            font-weight: 700;
            font-size: 36px;
            color: $main-title;
            margin-right: 24px;
            span { 
                color: $crimson;
            }
        }
    }

    .btn-add-todo {
        @include position-center;
        background: $purple;
        padding: 8px 32px;
        border-radius: 10px;
        color: $white;
        font-size: 12px;

        img {
            margin-right: 5px;
        }
    }
</style>