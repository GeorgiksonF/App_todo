<template>
    <div class="header">
        <Search/>
        <div class="header-end">
            <div>Bell</div>
            <div>Profile</div>
        </div>
    </div>
</template>

<script>
import Search from './Search'

export default {
    data() {
        return {
            header: 'Header',
        }
    },
    components: {
        Search,
    }
}
</script>

<style lang="scss">
    .header {
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
    }

    .header-end {
        display: flex;
    }
</style>