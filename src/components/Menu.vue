<template>
    <div class="menu">
        <div class="menu__close" v-if="isShownMenu" @click="closeMenu"></div>
        <div class="menu" @click="toggleMenu">
            <transition name="fade">
                <ul class="menu__list" v-if="isShownMenu">
                    <li v-if="!isCompleted" class="menu__item" @click="onCompleteTodo">Perform</li>
                    <li v-if="!isCompleted" class="menu__item" @click="shownAddComment">Add comment</li>
                    <li v-if="isCompleted" class="menu__item" @click="onRestoreTodo">Restore</li>
                    <li @click="onRemoveTodo" class="menu__item">Remove</li>
                </ul>
            </transition>
        </div>
        <AddComment v-if="isShownAddComment" :closeAddComment="closeAddComment"/>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import AddComment from '@/view/modals/AddComment'

    export default {
        props: {
            itemId: String,
            isCompleted: Boolean
        },
        data() {
            return {
                isShownMenu: false,
                isShownAddComment: false
            }
        },
        computed: {
            ...mapGetters(['getCertainTodo'])
        },
        components: {
            AddComment,
        },
        methods: {
            toggleMenu() {
                this.isShownMenu = !this.isShownMenu;
            },
            closeMenu() {
                this.isShownMenu = false;
            },
            onCompleteTodo() {
                this.completeTodo(this.getCertainTodo(this.itemId))
            },
            onRestoreTodo() {
                this.restoreTodo(this.getCertainTodo(this.itemId))
            },
            onRemoveTodo() {
                this.removeTodo(this.itemId)
            },
            shownAddComment() {
                this.isShownAddComment = true
            },
            closeAddComment() {
                this.isShownAddComment = false
            },
            ...mapActions(['completeTodo', 'restoreTodo', 'removeTodo'])
        },
    }
</script>

<style lang="scss">
    .fade-enter-active, 
    .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .menu {
        @include object-circle(22px);
        background: $grey url('~@/assets/svg/menu-dots.svg') no-repeat center center;
        cursor: pointer;
        position: relative;
        margin-right: 28px;

        &:hover {
            &:hover {
                box-shadow: 1px 1px 4px rgba($black, 0.3);
                transition: .3s;
            }
        }
        
        &__list {
            position: absolute;
            right: 0px;
            top: 28px;
            z-index: 20;
            background: $white;
            box-shadow: 2px 2px 8px rgba($black, 0.3);
            border-radius: 5px;
        }

        &__item {
            font-size: 11px;
            min-width: 130px;
            padding: 6px;
            cursor: pointer;
            
            &:first-child {
                border-radius: 5px 5px 0 0; 
            }
            
            &:last-child {
                border-radius: 0 0 5px 5px;
            }

            &:not(:last-child) {
                border-bottom: 1px solid $line-sep;
            }

            &:hover {
                background: rgba($grey, 0.8);
                transition: .4s;
            }
        }

        &__close {
            @include blocker(0);
        }
    }
</style>