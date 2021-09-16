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
                :isActive="todo.isCompleted"
                :text="todo.text"
                :status="todo.status"
                :priority="todo.priority"
                :itemId="todo.id"
                :class="{'todo-item--completed': todo.isCompleted}"
            />
        </div>
    </div>
</template>

<script>
    import Todo from './Todo'

    export default {
        props: {
            'todos': Array,
            'title': String
        },
        components: {
            Todo
        },
    }
</script>