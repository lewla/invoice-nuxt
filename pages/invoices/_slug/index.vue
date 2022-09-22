<template>
  <main>
    <Userinfo />
    <div class="invoice-container">
      <div class="invoice-container__top">
        <h1>Invoice {{ this.invoice_data.number }}</h1>
        <h2>{{ this.invoice_data.client_business_name }}</h2>
        <div>Due Date {{ parseTimestamp(this.invoice_data.due_date, false) }}</div> <div>Issue Date {{ parseTimestamp(this.invoice_data.issue_date, false) }}</div>
      </div>
      <div class="invoice-container__items">
        <div class="invoice-container__items__item invoice-item" v-for="item in items">
          <span class="invoice-container__items__item__item">{{ item.item }}</span>
          <span class="invoice-container__items__item__quantity">{{ item.quantity }}</span>
          <span class="invoice-container__items__item__price">{{ item.price }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "InvoicePage",
  data() {
    return {
      invoice_data: {}
    }
  },
  beforeMount() {
    this.$axios.get(`/v1/invoices/${this.$route.params.slug}`)
    .then((data) => {
      console.log(data)
      if(data.status === 200) {
        this.invoice_data = data.data.invoices[0];
      }
    })
    .catch((e) => {
      console.log(e)
    })
  },
  computed: {
    items() {
      if(this.invoice_data.items) {
        return JSON.parse(this.invoice_data.items)
      }
      else {
        return [];
      }
    }
  },
  methods: {
    parseTimestamp(ts, include_time=true) {
      let date = new Date(ts);
      if(include_time)
        return date.getDate() + "/" + (date.getMonth() + 1) +  "/" + date.getFullYear() +  " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      else
        return date.getDate() + "/" + (date.getMonth() + 1) +  "/" + date.getFullYear();
    },
  }
}
</script>

<style scoped lang="scss">
.invoice-container__items {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 600px;
  padding: 10px;
  margin: 20px auto;
  &__item {
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: space-between;
    text-align: left;
    padding: 5px;
    &__item {
      flex-grow: 1;
    }
    &__quantity {
      width: 20%;
    }
    &__price {
      width: 20%;
    }
  }
}
</style>