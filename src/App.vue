<template>
  <div id="app">
    <div class="container">
      <Header/>
      <div class="loader" v-if="getIsFetching">
        <img src="~@/assets/img/rhombus.gif" class="loader__img" alt="loader">
      </div>
      <div class="content-wrap" v-else>
        <Main class="content-wrap__item"/>
        <Comments class="content-wrap__item"/>
      </div>
    </div>
  </div>
</template>

<script>
  import store from './store/store'
  import Header from './components/header/Header'
  import Comments from './components/comments/Comments'
  import Main from './components/main/Main'
  import { mapGetters } from 'vuex'
  import './scss/main.scss'
  

  export default {
    name: 'App',
    store,
    components: {
      Header,
      Main,
      Comments
    },
    computed: {
      ...mapGetters(['getIsFetching'])
    }
  }
</script>

<style lang='scss'>
  .content-wrap {
    display: flex;
    margin-top: 60px;

    &__item {
      &:first-child {
        margin-right: 40px;
      }
    }
  }

  .loader {
    display: flex;
    justify-content: center;
    margin-top: 200px;

    &__img {
      width: 50px;
    }
  }
</style>
