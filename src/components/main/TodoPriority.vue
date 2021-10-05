<template>
    <div class="priority">
        <div class="priority__wrap">
            <div :class="[`priority__mark`, `priority__mark--${priority.toLowerCase()}`]"></div>
            <span>{{priority}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            priority: String,
        },
    }
</script>

<style lang="scss">
    .priority {
        flex: 1;

        &__wrap {
            display: flex;
            align-items: center;
            font-size: 11px;
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