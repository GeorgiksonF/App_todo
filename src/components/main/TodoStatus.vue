<template>
    <div class="status">
        <div :class="[`status__item`, `status__item--${getStatus}`]">
            <span>{{status}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            status: String,
        },
        computed: {
            getStatus() {
                return this.status.toLowerCase().split('').filter((el) => el !== ' ').join('')
            },
        }
    }
</script>

<style lang="scss">
    .status {
        flex: 1;

        &__item {
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
    }
</style>