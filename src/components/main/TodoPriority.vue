<template>
    <div class="todo-item__priority-wrap">
        <div class="todo-item__priority">
            <div :class="[`todo-item__priority-mark`, `todo-item__priority-mark--${priority.toLowerCase()}`]"></div>
            <span>{{priority}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            'priority': String,
        },
    }
</script>