<template>
  <div id="app">
    <div class="container">
      <Header/>
      <div class="content-wrap">
        <Main class="content-wrap__item"/>
        <Comments class="content-wrap__item"/>
      </div>
    </div>
  </div>
</template>

<script>
  import store from './store/store'
  import Header from './view/header/Header'
  import Comments from './view/Comments'
  import Main from './view/main/Main'
  import './scss/main.scss'
  

  export default {
    name: 'App',
    store,
    components: {
      Header,
      Main,
      Comments
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
</style>
