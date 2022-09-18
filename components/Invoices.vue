<template>
  <div class="invoices-container">
    <div class="table-top">
      <h1 class="table-top__title">Invoices</h1>
      <InterfaceButton type="link" to="/invoices/create" icon="plus" text="New invoice" class="button--branded button--round button--medium create-invoice-button"/>
      <div class="table-top__interface">
        <InterfaceSelect
          ref="selectStatus"
          :options="[
            {title: 'Draft', value: 'draft', disabled: false},
            {title: 'Sent', value: 'sent', disabled: false},
            {title: 'Paid', value: 'paid', disabled: false},
            {title: 'Archived', value: 'archived', disabled: false}
          ]"
        />
        <div class="table-top__interface__buttons">
          <InterfaceButton icon="edit" :text="'Update Selected (' + numSelected + ')'" type="button" class="button--branded button--round button--medium" @click.native="updateStatus" />
        </div>
      </div>
    </div>
    <InterfaceTable :columns="this.columns" :data="this.$store.state.invoices.list" :maxPerPage_prop="10" @toggleCheckAll="handleCheckAll" @toggleCheck="check" @open="open" @sortTable="sortTable"/>
  </div>
</template>

<script scoped>
export default {
  name: "Invoices",
  data() {
    return {
      columns: [
        {title: "Invoice No.", key: "invoiceNumber", type: "string", sortable: false, mobile: {showLabel: false}},
        {title: "Client", key: "client", type: "string", sortable: false, mobile: {showLabel: false}},
        {title: "Created Date", key: "created",  type: "timestamp", sortable: true, mobile: {showLabel: false}},
        {title: "Due Date", key: "due",  type: "timestamp", sortable: true, mobile: {showLabel: false}},
        {title: "Total", key: "total",  type: "currency", sortable: true, mobile: {showLabel: false}},
        {title: "Status", key: "status",  type: "string", sortable: true, mobile: {showLabel: false}},
      ],
      data: this.$store.state.invoices.list
    }
  },
  methods: {
    updateStatus() {
      console.log("Update status")
      console.log(this.$refs.selectStatus.selected)
      
      this.$store.commit('invoices/updateSelectedStatus', {
        status: this.$refs.selectStatus.selected.value
      })
    },
    check(id) {
      this.$store.commit('invoices/toggleChecked', {
        id: id
      })
    },
    sortTable(sort) {
      let desc = sort[0];
      let col = sort[1];
      let column = this.columns.find(e => e.key == col);
      this.sortBy = col;
      this.sortDesc = desc;
      if(column.sortable) {
        this.$store.commit('invoices/sort', {
          by: this.sortBy,
          desc: this.sortDesc
        })
      }
    },
    open(id) {
      this.$router.push({ path: "/invoices/" + id });
    },
    parseTimestamp(ts, include_time=true) {
      let date = new Date(ts);
      if(include_time)
        return date.getDate() + "/" + (date.getMonth() + 1) +  "/" + date.getFullYear() +  " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      else
        return date.getDate() + "/" + (date.getMonth() + 1) +  "/" + date.getFullYear();
    },
    handleCheckAll() {
      this.headerChecked = !this.headerChecked;
      this.$store.commit('invoices/setAllChecked', {
        checked: this.headerChecked
      })
    }
  },
  computed: {
    numPages() {
      return Math.ceil(Object.keys(this.data).length / this.maxPerPage)
    },
    numSelected () {
      return this.data.filter(e => e.checked).length
    },
    paginationList() {
      let list = [];
      for (var i = this.currentPage - (this.maxPagesList+1); i <= this.maxPagesList + this.currentPage; i++) {
        if(i <= this.numPages && i > 0)
          list.push(i)
      }
      return list.sort((a, b) => a - b).slice(-(this.maxPagesList+2))
    }
  },
}
</script>

<style scoped lang="scss">
.table-top {
  padding: 5px 15px;
  max-width: $ui-max-width;
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
    &__buttons {
      .button {
      }
    }
  }
}

.create-invoice-button {
  width: 25%;
}

@media screen and (max-width: 650px) {
  .table-top {
    margin-top: 10px;
    flex-direction: column;
    &__interface {
      flex-direction: column;
      &__buttons {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
      }
    }
  }
  .create-invoice-button {
    width: 100%;
  }
}

</style>