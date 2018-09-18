<template>
  <div id="app">
    <router-view/>
    <img src="./assets/logo.png">
  </div>
</template>

<script>
export default {
    name: 'App'
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app img {
  margin-top: 100px;
}
</style>
