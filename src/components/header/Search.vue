<template>
    <div class="search">
        <img src="~@/assets/svg/search.svg" class="search__icon" alt="search" aria-placeholder="">
        <input 
            type="text" 
            class="search__input" 
            v-model="searchText" 
            :placeholder="palceholder"
            @input="onSearchTodo"    
        >
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchText: '',
                palceholder: 'Search for any training you want'
            }
        },
        methods: {
            onSearchTodo() {
                this.$store.dispatch('getSearchTodos', this.searchText)
            }
        }
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