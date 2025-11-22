<template>
  <h1>Home</h1>
  <div>
    <router-link :to="{ name: 'newticket' }">criar novo ticket</router-link>
  </div>

  <router-view></router-view>
</template>
<script>
export default {}
</script>
<style lang=""></style>
