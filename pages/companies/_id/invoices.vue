<template>
  <div>
    <span>Invoices</span>
    <span>{{ this.$route.params.id }}</span>
    <span>{{ this.$store.state.invoices.list }}</span>
  </div>
</template>

<script>
export default {
  name: "CompanyInvoicesPage",
  beforeMount() {
    console.log("Loading invoices for", this.$route.params.id)
    this.$store.dispatch('invoices/fetchAllByCompany', this.$route.params.id)
  }
}
</script>