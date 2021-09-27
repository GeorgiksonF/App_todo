<template>
    <div 
        :class="['todo-item', {'todo-item--selected': isSelected, 'todo-item--completed': isCompleted}]" 
        @click="onSelectTodo"
    >
        <div class="todo-item__text-wrap">
            <div class="todo-item__mark" ></div>
            <p class="todo-item__text">{{text}}</p>
        </div>
        <TodoStatus :status="status"/>
        <TodoPriority :priority="priority"/>
        <TodoParticipants :participants="participants"/>
        <TodoMenu :itemId="itemId" :isCompleted="isCompleted"/>
    </div>
</template>

<script>
    import TodoStatus from './TodoStatus'
    import TodoPriority from './TodoPriority'
    import TodoMenu from './TodoMenu'
    import TodoParticipants from './TodoParticipants'

    export default {
        data() {
            return {
            }
        },
        props: {
            'isCompleted': Boolean,
            'isSelected': Boolean,
            'text': String,
            'status': String,
            'priority': String,
            'itemId': String,
            'participants': Object
        },
        components: {
            TodoStatus,
            TodoPriority,
            TodoMenu,
            TodoParticipants
        },
        methods: {
            onSelectTodo() {
                this.$store.commit('selectTodo', this.itemId)
                this.$store.dispatch('getComments', this.itemId)
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

        &--completed &__text-wrap,
        &--completed &__status-wrap,
        &--completed &__priority-wrap,
        &--completed .participants {
            opacity: .3;
        }

        &--selected {
            box-shadow: 1px 1px 8px rgba($black, 0.3);
            position: relative;
            z-index: 10;
            transition: .4s;
        }

        &__text-wrap {
            display: flex;
            align-items: center;
            flex: 3;
            margin-left: 6px;
        }

        &__mark {
            @include position-center;
            @include object-circle(10px);
            background: $list-item-mark-active-bg;
            margin-right: 6px;

            &::after {
                content: '';
                @include object-circle(5px);
                background: $list-item-mark-active;
            }
        }

        &__text {
            font-size: 14px;
        }

        &__status-wrap {
            flex: 1;
        }

        &__status {
            display: flex;
            justify-content: center;
            width: 80px;
            border-radius: 9px;
            font-size: 11px;
            padding: 3px 0;

            @each $status, $color in $status-list {
                &--#{$status} {
                    background: rgba($color, 0.2);
                    color: $color;
                }
            }
        }

        &__priority-wrap {
            flex: 1;
        }

        &__priority {
            display: flex;
            align-items: center;
            font-size: 11px;
        }

        &__priority-mark {
            @include position-center;
            @include object-circle(8px);
            margin-right: 5px;

            @each $priority, $color in $priority-list {
                &--#{$priority} {
                    background: $color;
                }
            }

            &::after {
                content: "";
                @include object-circle(4px);
                border-radius: 50%;
                background: $white;
            }
        }

        &__menu {
            @include object-circle(22px);
            background: $grey url('~@/assets/svg/menu-dots.svg') no-repeat center center;
            cursor: pointer;
            position: relative;
            margin-right: 28px;
        }
        
        &__menu-list {
            position: absolute;
            right: 0px;
            top: 28px;
            z-index: 20;
            background: $white;
            box-shadow: 2px 2px 8px rgba($black, 0.3);
            border-radius: 5px;

            li {
                font-size: 11px;
                min-width: 130px;
                padding: 6px;
                cursor: pointer;
                
                &:first-child {
                   border-top-left-radius: 5px; 
                   border-top-right-radius: 5px; 
                }
                
                &:last-child {
                   border-bottom-left-radius: 5px; 
                   border-bottom-right-radius: 5px; 
                }

                &:not(:last-child) {
                    border-bottom: 1px solid $line-sep;
                }

                &:hover {
                    background: rgba($grey, 0.8);
                    transition: .4s;
                }
            }
        }

        &__menu-close {
            @include blocker(0);
        }
    }
</style>