<template>
    <div class="search">
        <img src="~@/assets/svg/search.svg" class="search__icon" alt="search" aria-placeholder="">
        <input type="text" class="search__input" v-model="text" :placeholder="palceholder">
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: '',
            palceholder: 'Search for any training you want'
        }
    },
}
</script>

<style lang="scss">
    .search {
        display: flex;
        align-items: center;

        &__icon {
            margin-right: 15px;
        }

        &__input {
            border: none;
            outline: none;
            min-width: 200px;
            &::placeholder {
                color: $search-placeholder;
                font-size: 12px;
                font-family: 'Montserrat', sans-serif;
            }
        }
    }
</style>