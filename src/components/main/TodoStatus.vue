<template>
    <div class="todo-item__status-wrap">
        <div :class="[`todo-item__status`, `todo-item__status--${getStatus}`]">
            <span>{{status}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            'status': String,
        },
        computed: {
            getStatus() {
                return this.status.toLowerCase().split('').filter((el) => el !== ' ').join('')
            },
        }
    }
</script>