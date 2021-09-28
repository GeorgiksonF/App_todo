<template>
    <div class="header">
        <Search/>
        <div class="header-end">
            <div>Profile</div>
        </div>
    </div>
</template>

<script>
import Search from './Search'

export default {
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