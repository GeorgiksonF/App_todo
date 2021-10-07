<template>
    <router-link 
        :to='commentUrl'
        custom
        v-slot="{ isActive, navigate }"
        @click="onSelectTodo"
    >
        <div 
            :class="['todo-item', {'todo-item--selected': isActive, 'todo-item--completed': isCompleted}]" 
            @click="navigate"
        >
            <TodoTask :text="text"/>
            <TodoStatus :status="status"/>
            <TodoPriority :priority="priority"/>
            <TodoParticipants :participants="participants"/>
            <TodoMenu :itemId="itemId" :isCompleted="isCompleted"/>
        </div>
    </router-link>
</template>

<script>
    import TodoTask from './TodoTask'
    import TodoStatus from './TodoStatus'
    import TodoPriority from './TodoPriority'
    import TodoMenu from './TodoMenu'
    import TodoParticipants from './TodoParticipants'
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
            }
        },
        props: {
            isCompleted: Boolean,
            isSelected: Boolean,
            text: String,
            status: String,
            priority: String,
            itemId: String,
            participants: Object
        },
        components: {
            TodoTask,
            TodoStatus,
            TodoPriority,
            TodoMenu,
            TodoParticipants
        },
        methods: {
            onSelectTodo() {
                this.getComments(this.itemId)
            },
            ...mapActions(['getComments'])
        },
        computed: {
            commentUrl() {
                return `/comments/task=${this.itemId}`
            }
        }
    }
</script>

<style lang="scss">
    .todo-item {
        display: flex;
        align-items: center;
        padding: 21px 0;
        cursor: pointer;

        &:not(:last-child) {
            border-bottom: 1px solid $line-sep;
        }

        &--completed .task,
        &--completed .status,
        &--completed .priority,
        &--completed .participants {
            opacity: .3;
        }

        &--selected {
            box-shadow: 1px 1px 8px rgba($black, 0.3);
            position: relative;
            z-index: 10;
            transition: .4s;
        }
    }
</style>