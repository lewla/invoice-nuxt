<template>
  <main>
    <Userinfo />
    <FormInvoice />
  </main>
</template>

<script>
export default {
  name: "InvoicesCreatePage",
  components: {
  },
  beforeMount() {
    this.$store.dispatch('clients/fetchAll')
  }
}
</script>

<style lang="scss">
</style>