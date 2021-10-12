<template>
    <div class="main">
        <div class="main__header-wrap">
            <h1 class="main__title">You’ve got <span>{{getActiveTodo.length + ' task'}}</span> today</h1>
            <a class="main__btn btn btn-add-todo" href="#" @click="showAddTodo">
                <img src="~@/assets/svg/add-todo.svg" alt="add todo">
                <span>Add New</span>
            </a>
        </div>
        <keep-alive>
            <div class="main__loader loader" v-if="isFetching">
                <img src="~@/assets/img/rhombus.gif" alt="loader">
            </div>
        </keep-alive>
        <TodoAddTask v-if="isShownAddTodo" :closeAddTodo="closeAddTodo"/>
        <TodoSection v-if="todoList.length !== 0 && !isFetching"/>
        <TodoNotices v-if="!isFetching"/>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
    import TodoSection from './TodoSection'
    import TodoAddTask from './TodoAddTask'
    import TodoNotices from './TodoNotices'

    export default {
        data() {
            return {
                isFetching: false,
                isShownAddTodo: false
            }
        },
        components: {
            TodoSection,
            TodoAddTask,
            TodoNotices
        },
        computed: {
            ...mapState({
                todoList: state => state.todo.todoList,
            }),
            ...mapGetters(['getActiveTodo']),
        },
        methods: {
            showAddTodo() {
                this.isShownAddTodo = true
            },
            closeAddTodo() {
                this.isShownAddTodo = false
            },
            ...mapMutations(['setIsFetching', 'unsetIsFetching']),
            ...mapActions(['fetchData'])
        },
        created() {
            this.isFetching = true
            this.fetchData()
                .then(() => {
                    this.isFetching = false
                })
        }
    }
</script>

<style lang="scss">
    .main {
        position: relative;
        flex: 9;

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

        &__loader {
            margin-top: 100px;

            img {
                width: 50px;
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