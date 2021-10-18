<template>
    <div class="priority">
        <div class="priority__wrap" @click="onPriorityChange">
            <div :class="[`priority__mark`, `priority__mark--${priority.toLowerCase()}`]"></div>
            <span class="priority__value">{{priority}}</span>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        props: {
            priority: String,
            itemId: String,
            isCompleted: Boolean
        },
        methods: {
            onPriorityChange() {
                if (!this.isCompleted) {
                    this.updateTodoPriority(this.itemId)
                }
            },
            ...mapActions(['updateTodoPriority'])
        }
    }
</script>

<style lang="scss">
    .priority {
        display: flex;
        justify-content: flex-start;
        flex: 1;

        &__wrap {
            display: flex;
            align-items: center;
            font-size: 11px;
            
            &:hover {
                font-size: 13px;
                transition: .3s;
                
                .priority__mark {
                    @include object-circle(12px);
                    transition: .2s;

                    &::after {
                        @include object-circle(6px);
                    }
                }
            }
        }

        &__mark {
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

    }
</style>