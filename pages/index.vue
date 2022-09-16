<template>
  <main>
    <Userinfo />
    <span>{{ this.$store.state.companies.list }}</span>
  </main>
</template>

<script>
export default {
  name: "IndexPage",
  components: {
  },
  mounted() {
    this.$store.dispatch('companies/fetchAll')
  }
}
</script>