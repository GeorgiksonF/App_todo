<template>
    <div class="sidebar">{{sidebar}}</div>
</template>

<script>
export default {
    data() {
        return {
            sidebar: 'Sidebar'
        }
    },
}
</script>

<style lang="scss">
    .sidebar {
        flex: 3;
    }
</style>