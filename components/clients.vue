<template>
  <div class="clients-container">
    <div class="table-top">
      <h1 class="table-top__title">Clients</h1>
      <div class="table-top__interface">
        <div class="table-top__interface__buttons">
          <InterfaceButton type="link" to="/clients/create" icon="plus" text="New client" class="button--branded button--round button--medium"/>
        </div>
      </div>
    </div>
    <InterfaceTable :columns="this.columns" :checkedList="[]" :data="this.$store.state.clients.list" :showCheckboxes="false" :maxPerPage_prop="10" class="small-table"/>
  </div>
</template>

<script scoped>
export default {
  name: "Clients",
  data() {
    return {
      columns: [
        {title: "Client", key: "business_name", type: "string", sortable: false, mobile: {showLabel: false}},
        {title: "Email", key: "email", type: "string", sortable: false, mobile: {showLabel: false}},
        {title: "Phone", key: "phone", type: "string", sortable: false, mobile: {showLabel: false}},
        {title: "Address", key: "address_line_1", type: "string", sortable: false, mobile: {showLabel: false}},
        {title: "", key: "address_line_2", type: "string", sortable: false, mobile: {showLabel: false}},
        {title: "Postal Code", key: "postal_code", type: "string", sortable: false, mobile: {showLabel: false}},
        {title: "City", key: "city", type: "string", sortable: false, mobile: {showLabel: false}},
        {title: "Country", key: "country", type: "string", sortable: false, mobile: {showLabel: false}}
      ],
      data: this.$store.state.clients.list
    }
  },
  methods: {
    editClient(id) {
      console.log("Edit client", id)
    },
    removeClient(id) {
      console.log("Remove client", id)
      this.$store.dispatch('clients/removeClient', id)
    }
  }
}
</script>

<style scoped lang="scss">
.table-top {
  padding: 5px 15px;
  max-width: 1080px;
  margin: 0px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  row-gap: 10px;
  column-gap: 10px;
  &__title {
    flex-grow: 1;
    text-align: left;
    margin: 0px;
    text-transform: uppercase;
    font-weight: 900;
    color: $text-color;
    font-size: 1.5em;
  }
  &__interface {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    column-gap: 10px;
    row-gap: 10px;
  }
}
@media screen and (max-width: 650px) {
  .table-top {
    margin-top: 10px;
    flex-direction: column;
    &__interface {
      flex-direction: column;
    }
  }
}
</style>