<template>
  <div class="form-container">
    <h1>Sign up</h1>
    <p>Already have an account? <NuxtLink to="/login">Sign in</NuxtLink></p>
    <form class="form" ref="form" @submit.prevent="send" novalidate>
      <div class="input-group">
        <label class="form__label">
          <span class="form__label__text">First Name</span>
          <input v-model="first_name" type="text" class="form__input"/>
        </label>
        <label class="form__label">
          <span class="form__label__text">Last Name</span>
          <input v-model="last_name" type="text" class="form__input"/>
        </label>
      </div>
      <label class="form__label">
        <span class="form__label__text">Username</span>
        <input v-model="username" type="text" class="form__input"/>
      </label>
      <label class="form__label">
        <span class="form__label__text">Email</span>
        <input v-model="email" type="email" class="form__input"/>
      </label>
      <label class="form__label">
        <span class="form__label__text">Password</span>
        <input v-model="password" type="password" class="form__input"/>
      </label>
      <input type="submit" style="display: none"/>
      <InterfaceButton icon="arrow-right-circle" text="Create account" class="button--branded button--curved button--medium" @click.native="send"/>
    </form>
  </div>
</template>

<script scoped>
export default {
  props: {
    first_name_prop: {
      default: "",
      type: String
    },
    last_name_prop: {
      default: "",
      type: String
    },
    username_prop: {
      default: "",
      type: String
    },
    email_prop: {
      default: "",
      type: String
    },
    password_prop: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      first_name: this.first_name_prop,
      last_name: this.last_name_prop,
      username: this.username_prop,
      email: this.email_prop,
      password: this.password_prop
    }
  },
  methods: {
    send() {
      console.log("Send")
      let toast = this.$toast.info('Creating account...')
      this.$axios.post('/auth/register', {
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        email: this.email,
        password: this.password
      })
      .then((response) => {
        console.log(response);
        if(response.status === 200) {
          this.$router.push({ path: "/" });
        }
      })
      .catch((error) => {
        this.errormsg = error.response.data.error;
        let toast = this.$toast.error(error.response.data.error);
        for(let key in error.response.data.invalid_fields) {
          this.error_fields[key] = error.response.data.invalid_fields[key];
        }
      });
    },
    hideError(key) {
      delete this.error_fields[key];
    }
  }
}
</script>
  
<style lang="scss" scoped>
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
    .input-group {
      display: flex;
      flex-direction: row;
      row-gap: 10px;
      column-gap: 10px;
      .form__label {
        width: 100%;
      }
    }
    &__label {
      span {
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