<template>
    <div 
        class="todo__list" 
        v-if="todos.length > 0"
    >
        <h2 class="todo__title">{{title}}</h2>
        <div class="todo__items">
            <Todo 
                v-for="todo in todos" 
                :key="todo.id"
                :isCompleted="todo.isCompleted"
                :isSelected="todo.isSelected"
                :text="todo.text"
                :status="todo.status"
                :priority="todo.priority"
                :itemId="todo.id"
                :participants="todo.participants"
            />
        </div>
        <div class="todo__more" v-if="showMoreBtn">
            <button href="#" class="todo__more-btn" @click="onShownMore">Show more</button>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import Todo from './Todo'

    export default {
        data() {
            return {
                activeCurrentPage: 1,
                completedCurrentsPage: 1
            }
        },
        props: {
            todos: Array,
            title: String,
            pagesCount: Number,
            currentPage: Number
        },
        components: {
            Todo
        },
        computed: {
            showMoreBtn() {
                if (this.title === 'On Hold') {
                    return this.activeCurrentPage < this.pagesCount
                } 
                
                return this.completedCurrentsPage < this.pagesCount
            }
        },
        methods: {
            onShownMore() {
                if (this.title === 'On Hold') {
                    this.getTodosActive(++this.activeCurrentPage)
                } else if (this.title === 'Completed') {
                    this.getTodosCompleted(++this.completedCurrentsPage)
                }
            },
            ...mapActions(['getTodosActive', 'getTodosCompleted'])
        }
    }
</script>