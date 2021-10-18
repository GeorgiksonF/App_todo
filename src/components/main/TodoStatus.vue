<template>
    <div class="status">
        <div 
            :class="[`status__item`, `status__item--${getStatus}`]" 
            @click="onChangeStatus"
        >
            <span>{{status}}</span>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
    export default {
        props: {
            status: String,
            itemId: String,
            isCompleted: Boolean
        },
        computed: {
            getStatus() {
                return this.status.toLowerCase().split('')
                            .filter((el) => el !== ' ').join('')
            },
        },
        methods: {
            onChangeStatus() {
                if (!this.isCompleted) {
                    this.updateTodoStatus(this.itemId)
                }
            },
            ...mapActions(['updateTodoStatus'])
        }
    }
</script>

<style lang="scss">
    .status {
        display: flex;
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

            &:hover {
                box-shadow: 1px 2px 4px rgba($black, 0.3);
                transition: .3s;
            }
        }
    }
</style>