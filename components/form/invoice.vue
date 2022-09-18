<template>
  <div class="form-container">
    <h1>New Invoice</h1>
    <form class="form" ref="form" @submit.prevent="send" novalidate>
      <span v-if="errormsg" class="form__error-msg">{{ errormsg }}</span>
      <label class="form__label">
        <span class="form__label__text">Invoice Number</span>
        <input v-model="invoicenumber" type="text" class="form__input" :class="{'form__input--error': error_fields.invoicenumber}" @input="hideError('invoicenumber')"/>
        <span class="form__label__error" v-if="error_fields.invoicenumber">{{ error_fields.invoicenumber }}</span>
      </label>
      <label class="form__label">
        <span class="form__label__text">Client</span>
        <input v-model="client" type="text" class="form__input" :class="{'form__input--error': error_fields.client}" @input="madeSelection = false; hideError('client')"/>
        <div class="client-input-suggestions" v-if="client && !madeSelection">
          <div class="client-input-suggestions__suggestion" v-for="(client, index) in clientSuggestions" :key="index" @click="setClient(index)">
            <span class="client-input-suggestions__suggestion__business-name">{{ client.business_name }}</span>
            <span class="client-input-suggestions__suggestion__address">{{ client.address_line_1 }} {{ client.city }} {{ client.postal_code }}</span>
          </div>
        </div>
        <span class="form__label__error" v-if="error_fields.client">{{ error_fields.client }}</span>
      </label>
      <label class="form__label">
        <span class="form__label__text">Due Date</span>
        <input v-model="duedate" type="date" class="form__input" :class="{'form__input--error': error_fields.duedate}" @input="hideError('duedate')"/>
        <span class="form__label__error" v-if="error_fields.duedate">{{ error_fields.duedate }}</span>
      </label>
      <label class="form__label">
        <span class="form__label__text">Invoice Items</span>
      </label>
      <div class="invoice-items-container">
        <div class="new-invoice-item" v-for="(item, index) in line_items">
          <input class="form__input new-invoice-item__item" type="text" placeholder="Item" v-model="line_items[index].item"/>
          <input class="form__input new-invoice-item__quantity" type="number" placeholder="Quantity" step="1" min="0" v-model="line_items[index].quantity"/>
          <input class="form__input new-invoice-item__price" type="number" placeholder="Price" step="0.01" v-model="line_items[index].price"/>
          <span class="new-invoice-item__total-price">{{ calcLinePrice(index) }}</span>
          <InterfaceButton text="" icon="trash-2" class="button--tiny button--red button--curved" @click.native="deleteItem(index)"/>
        </div>
        <InterfaceButton type="button" text="" icon="plus" class="button--medium button--branded button--curved button--align-right add-item-button" @click.native="addItem"/>
      </div>
      <input type="submit" style="display: none"/>
      <InterfaceButton type="button" icon="plus-circle" text="Create Invoice" class="button--branded button--curved button--medium" @click.native="send"/>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    invoicenumber_prop: {
      default: "",
      type: String
    },
    client_prop: {
      default: "",
      type: String
    },
    duedate_prop: {
      default: "",
      type: String
    },
    errormsg_prop: {
      default: "",
      type: String
    },
    error_fields_prop: {
      default: () => {
        return {
        }
      },
      type: Object
    }
  },
  data() {
    return {
      invoicenumber: this.invoicenumber_prop,
      client: this.client_prop,
      duedate: this.duedate_prop,
      selectedClient: undefined,
      madeSelection: false,
      errormsg: this.errormsg_prop,
      error_fields: this.error_fields_prop,
      line_items: [],
      currency: '£'
    }
  },
  methods: {
    send() {
      console.log("Send")
    },
    addItem() {
      this.line_items.push({item: '', quantity: '1', price: ''})
    },
    deleteItem(index) {
      this.line_items.splice(index, 1)
    },
    calcLinePrice(index) {
      let quantity = this.line_items[index].quantity;
      let price = this.line_items[index].price;
      let total = quantity * price;
      let pounds  = total.toString().split('.')[0] || "0";
      let pence = total.toString().split('.')[1] || "00";

      return this.currency + pounds.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + pence.padEnd(2, 0);
    },
    hideError(key) {
      console.log(key)
    },
    setClient(index) {
      console.log(index);
      this.madeSelection = true;
      this.selectedClient = this.$store.state.clients.list[index];
      this.client = this.selectedClient.business_name;
    }
  },
  computed: {
    selectList() {
      return this.$store.state.clients.list;
    },
    numItems() {
      return this.line_items.length
    },
    totalPrice() {
      return 100;
    },
    clientSuggestions() {
      return this.$store.state.clients.list.filter(
        e => e.first_name.toLowerCase().includes(this.client.toLowerCase())
        || e.last_name.toLowerCase().includes(this.client.toLowerCase())
        || e.business_name.toLowerCase().includes(this.client.toLowerCase())
      );
    }
  }
}
</script>

<style scoped lang="scss">

.form-container {
  display: flex;
  flex-direction: column;
  padding: 10px 35px 25px 35px;
  margin: 20px auto;
  width: 80%;
  max-width: 1000px;
  background: #ffffff;
  border-top: 5px solid $brand-color;
  border-radius: 2px 2px 2px 2px;
  box-shadow: 0px 0px 5px 0px $shadow-color;
  justify-content: center;
  min-height: 300px;
  h1 {
    margin: 20px 0px 15px 0px;
    text-align: left;
  }
  p {
    margin: 0px 0px 20px 0px;
    text-align: left;
    font-weight: 600;
  }
  .form {
    display: flex;
    flex-direction: column;
    position: relative;
    &__error-msg {
      font-weight: 600;
      color: $red-color;
    }
    &__label {
      margin-top: 10px;
      &__error {
        text-align: right;
        font-weight: 400;
        font-style: italic;
        display: block;
        color: $red-color;
        font-size: 0.9em;
      }
      &__text {
        display: block;
        text-align: left;
        font-weight: 600;
      }
    }
    &__input {
      width: 100%;
      outline: 0;
      background: #f1f1f5;
      padding: 8px 12px;
      box-sizing: border-box;
      margin: 5px 0px 0px 0px;
      border: 0;
      border-bottom: 2px solid #d5d5df;
      border-radius: 0px;
      &--error {
        border-bottom-color: $red-color!important;
        background: $red-color-faded!important;
      }
      &:focus {
        background: #d5d5df;
        border-bottom-color: $brand-color;
      }
    }
  }
}

@media screen and (max-width: 650px) {
  .form-container {
    width: 90%;
    padding: 10px 20px 35px 20px;
    .form {
      .input-group {
        flex-direction: column;
      }
    }
  }
}

.new-invoice-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 5px;
  margin-top: 2px;
  margin-bottom: 6px;
  row-gap: 5px;
  .form__input {
    margin: 0;
  }
  &__item {
    width: 300%;
    max-width: 100%;
  }
  &__price {
    width: 40%;
    max-width: 100px;
  }
  &__quantity {
    width: 40%;
    max-width: 100px;
  }
  &__total-price {
    font-weight: 600;
    margin-left: 6px;
    margin-right: 6px;
    min-width: 110px;
  }
}

.client-input-suggestions {
  position: absolute;
  width: 100%;
  &__suggestion {
    display: flex;
    background: #ececff;
    padding: 10px 15px;
    justify-content: space-between;
    user-select: none;
    cursor: pointer;
    &:hover {
      background: $brand-color-faded;
    }
  }
}

@media screen and (max-width: 650px) {
  .new-invoice-item {
    flex-wrap: wrap;
    margin-bottom: 10px;
    margin-top: 10px;
    &__price {
      flex-shrink: 1;
    }
    &__total-price {
      flex-grow: 1;
    }
  }
  .add-item-button {
    margin-bottom: 10px;
  }
}
</style>