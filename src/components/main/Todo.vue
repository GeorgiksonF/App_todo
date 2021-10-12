<template>
    <router-link 
        :to='commentUrl'
        custom
        v-slot="{ isActive, navigate }"
    >
        <div 
            :class="['todo-item', {'todo-item--selected': isActive, 'todo-item--completed': isCompleted}]" 
            @click="navigate"
        >
            <div class="todo-item__wrap" @click="onTodoClick">
                <TodoTask :text="text"/>
                <TodoStatus :status="status" :itemId="itemId" :isCompleted="isCompleted"/>
                <TodoPriority :priority="priority"/>
                <TodoParticipants :participants="participants"/>
                <TodoMenu :itemId="itemId" :isCompleted="isCompleted"/>
            </div>
        </div>
    </router-link>
</template>

<script>
    import TodoTask from './TodoTask'
    import TodoStatus from './TodoStatus'
    import TodoPriority from './TodoPriority'
    import TodoMenu from './TodoMenu'
    import TodoParticipants from './TodoParticipants'
    import { mapActions, mapMutations } from 'vuex'

    export default {
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
            onTodoClick() {
                this.getComments({id: this.itemId, page: 1})
                this.setSelectedTodoId(this.itemId)
            },
            ...mapActions(['getComments']),
            ...mapMutations(['setSelectedTodoId'])
        },
        computed: {
            commentUrl() {
                return `/comments/task=${this.itemId}`
            }
        },
    }
</script>

<style lang="scss">
    .todo-item {
        
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

        &__wrap {
            display: flex;
            align-items: center;
            padding: 21px 0;
            cursor: pointer;
        }
    }
</style>