<template>
  <div class="form-container">
    <h1>Create company</h1>
    <p>Enter your company details that will appear on invoices below</p>
    <form class="form" ref="form" @submit.prevent="send" novalidate>
      <label class="form__label">
        <span class="form__label__text">Company name</span>
        <input v-model="form_data.name" type="text" class="form__input" />
        <span class="form__label__error" v-if="error_fields.name">{{ error_fields.name }}</span>
      </label>
      <label class="form__label">
        <span class="form__label__text">Address line 1</span>
        <input v-model="form_data.address_line_1" type="text" class="form__input" />
        <span class="form__label__error" v-if="error_fields.address_line_1">{{ error_fields.address_line_1 }}</span>
      </label>
      <label class="form__label">
        <span class="form__label__text">Address line 2</span>
        <input v-model="form_data.address_line_2" type="text" class="form__input" />
        <span class="form__label__error" v-if="error_fields.address_line_2">{{ error_fields.address_line_2 }}</span>
      </label>
      <label class="form__label">
        <span class="form__label__text">City</span>
        <input v-model="form_data.city" type="text" class="form__input" />
        <span class="form__label__error" v-if="error_fields.city">{{ error_fields.city }}</span>
      </label>
      <label class="form__label">
        <span class="form__label__text">State</span>
        <input v-model="form_data.state" type="text" class="form__input" />
        <span class="form__label__error" v-if="error_fields.state">{{ error_fields.state }}</span>
      </label>
      <label class="form__label">
        <span class="form__label__text">Postal/Zip Code</span>
        <input v-model="form_data.postal_code" type="text" class="form__input" />
        <span class="form__label__error" v-if="error_fields.postal_code">{{ error_fields.postal_code }}</span>
      </label>
      <label class="form__label">
        <span class="form__label__text">Country</span>
        <input v-model="form_data.country" type="text" class="form__input" />
        <span class="form__label__error" v-if="error_fields.country">{{ error_fields.country }}</span>
      </label>
      <label class="form__label">
        <span class="form__label__text">Additional address information</span>
        <input v-model="form_data.extra_address_info" type="text" class="form__input" />
        <span class="form__label__error" v-if="error_fields.extra_address_info">{{ error_fields.extra_address_info }}</span>
      </label>
      <label class="form__label">
        <span class="form__label__text">Company email</span>
        <input v-model="form_data.email" type="text" class="form__input" />
        <span class="form__label__error" v-if="error_fields.email">{{ error_fields.email }}</span>
      </label>
      <label class="form__label">
        <span class="form__label__text">Company phone number</span>
        <input v-model="form_data.phone" type="text" class="form__input" />
        <span class="form__label__error" v-if="error_fields.phone">{{ error_fields.phone }}</span>
      </label>
      <input type="submit" style="display: none"/>
      <InterfaceButton icon="arrow-right-circle" text="Create company" class="button--branded button--curved button--medium" @click.native="send"/>
    </form>
  </div>
</template>

<script scoped>
export default {
  props: {
    name_prop: {
      type: String,
      default: ''
    },
    address_line_1_prop: {
      type: String,
      default: ''
    },
    address_line_2_prop: {
      type: String,
      default: ''
    },
    city_prop: {
      type: String,
      default: ''
    },
    state_prop: {
      type: String,
      default: ''
    },
    postal_code_prop: {
      type: String,
      default: ''
    },
    country_prop: {
      type: String,
      default: ''
    },
    extra_address_info_prop: {
      type: String,
      default: ''
    },
    email_prop: {
      type: String,
      default: ''
    },
    phone_prop: {
      type: String,
      default: ''
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
      form_data: {
        name: this.name_prop,
        address_line_1: this.address_line_1_prop,
        address_line_2: this.address_line_2_prop,
        city: this.city_prop,
        state: this.state_prop,
        postal_code: this.postal_code_prop,
        country: this.country_prop,
        extra_address_info: this.extra_address_info_prop,
        email: this.email_prop,
        phone: this.phone_prop,
      },
      error_fields: this.error_fields_prop
    }
  },
  methods:{
    send() {
      console.log("Send");

      this.$axios.post('/v1/companies/create', {
        name: this.form_data.name,
        address_line_1: this.form_data.address_line_1,
        address_line_2: this.form_data.address_line_2,
        city: this.form_data.city,
        state: this.form_data.state,
        postal_code: this.form_data.postal_code,
        country: this.form_data.country,
        extra_address_info: this.form_data.extra_address_info,
        email: this.form_data.email,
        phone: this.form_data.phone
      })
      .then((response) => {
        console.log(response);
        if(response.status === 200) {
          let toast = this.$toast.success(response.data.message);
        }
        else {
          let toast = this.$toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
        this.errormsg = error.response.data.error;
      });

    },
    addError(key, message) {
      this.error_fields[key] = message;
    },
    hideError(key) {
      delete this.error_fields[key];
    }
  }
}
</script>
  
<style lang="scss">
.form-container {
  display: flex;
  flex-direction: column;
  padding: 10px 35px 25px 35px;
  margin: 20px auto;
  width: 80%;
  max-width: 600px;
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
    &__error-msg {
      font-weight: 600;
      color: $red-color;
    }
    &__label {
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
      margin: 5px 0px 10px 0px;
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
</style>