<template>
    <div class="task">
        <div class="task__mark" ></div>
        <p class="task__text">{{text}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            text: String
        }
    }
</script>

<style lang="scss">
    .task {
        display: flex;
        align-items: center;
        flex: 3;
        margin-left: 6px;

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
    }
</style>