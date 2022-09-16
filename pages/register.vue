<template>
  <main>
    <FormRegister />
  </main>
</template>

<script>
export default {
  name: "RegisterPage",
  layout: 'guest',
  components: {
  },
  auth: false
}
</script>

<style lang="scss">
@media screen and (max-width: 650px) {
  main {
    margin-left: 0px;
  }
}
</style>