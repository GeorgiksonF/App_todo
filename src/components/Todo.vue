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
                <Task :text="text"/>
                <Status :status="status" :itemId="itemId" :isCompleted="isCompleted"/>
                <Priority :priority="priority" :itemId="itemId" :isCompleted="isCompleted"/>
                <Participants :participants="participants"/>
                <Menu :itemId="itemId" :isCompleted="isCompleted"/>
            </div>
        </div>
    </router-link>
</template>

<script>
    import Task from './Task'
    import Status from './Status'
    import Priority from './Priority'
    import Menu from './Menu'
    import Participants from './Participants'
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
            Task,
            Status,
            Priority,
            Menu,
            Participants
        },
        methods: {
            onTodoClick() {
                this.getComments({id: this.itemId, page: 1})
                this.setCommentPage(1)
                this.setSelectedTodoId(this.itemId)
            },
            ...mapActions(['getComments']),
            ...mapMutations(['setSelectedTodoId', 'setCommentPage'])
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