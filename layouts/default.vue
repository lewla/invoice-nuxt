<template>
  <div id="app">
    <NavSidebar v-if="this.$store.state.auth.loggedIn"/>
    <Nuxt />
  </div>
</template>

<script scoped>
import NavSidebar from '@/components/nav/sidebar.vue';
export default {
  components: {NavSidebar}
}
</script>

<style lang="scss">
#app {
  overflow-x: hidden;
  display: flex;
  height: 100vh;
  text-align: center;
}
</style>