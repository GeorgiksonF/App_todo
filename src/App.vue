<template>
  <div id="app">
    <div class="container">
      <Header/>
      <div class="content-wrap">
        <Main/>
        <Sidebar/>
      </div>
    </div>
  </div>
</template>

<script>
  import store from './store/store'
  import Header from './components/header/Header'
  import Sidebar from './components/Sidebar'
  import Main from './components/main/Main'
  import './scss/main.scss'

  export default {
    name: 'App',
    store,
    components: {
      Header,
      Main,
      Sidebar
    }
  }
</script>

<style lang='scss'>
  .content-wrap {
    display: flex;
    margin-top: 60px;
  }
</style>
