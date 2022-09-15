<template>
  <div class="form-container">
    <h1>Sign in</h1>
    <p>Don't have an account? <NuxtLink to="/register">Sign up</NuxtLink></p>
    <form class="form" ref="form" @submit.prevent="send" novalidate>
      <span v-if="errormsg" class="form__error-msg">{{ errormsg }}</span>
      <label class="form__label">
        <span class="form__label__text">Username</span>
        <input v-model="username" type="text" class="form__input" :class="{'form__input--error': error_fields.username}" @input="hideError('username')"/>
        <span class="form__label__error" v-if="error_fields.username">{{ error_fields.username }}</span>
      </label>
      <label class="form__label">
        <span class="form__label__text">Password</span>
        <input v-model="password" type="password" class="form__input" :class="{'form__input--error': error_fields.password}" @input="hideError('password')"/>
        <span class="form__label__error" v-if="error_fields.password">{{ error_fields.password }}</span>
      </label>
      <input type="submit" style="display: none"/>
      <InterfaceButton icon="arrow-right-circle" text="Login" class="button--branded button--curved button--medium" @click.native="send"/>
    </form>
  </div>
</template>

<script scoped>
export default {
  props: {
    username_prop: {
      default: "",
      type: String
    },
    password_prop: {
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
      username: this.username_prop,
      password: this.password_prop,
      errormsg: this.errormsg_prop,
      error_fields: this.error_fields_prop
    }
  },
  methods: {
    send() {
      console.log("Send")
      try {
        let response = this.$auth.loginWith('local', {data: {username: this.username, password: this.password}})
        response.then((data) => {
          console.log("response:")
          console.log(data)
          if(data.status !== 200) {
            console.log("Login error")
            this.errormsg = data.data.error;
            let toast = this.$toast.error(data.data.error);
            for(let key in data.data.invalid_fields) {
              this.error_fields[key] = data.data.invalid_fields[key];
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
      }
      catch (error) {
        console.log("Error!")
        console.log(error)
      }
    },
    hideError(key) {
      delete this.error_fields[key];
      if(Object.keys(this.error_fields).length === 0) {
        this.errormsg = "";
      }
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
      margin-bottom: 20px;
    }
    &__label {
      &__error {
        text-align: right;
        font-weight: 400;
        font-style: italic;
        display: block;
        color: $red-color;
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
    .button {
      margin-top: 10px;
    }
  }
}
</style>