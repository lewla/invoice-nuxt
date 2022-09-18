<template>
  <div class="companies-container">
    <div class="companies-container__company" v-for="company in this.$store.state.companies.list">
      <div class="companies-container__company__info">
        <h2 class="companies-container__company___info__name">{{company.name}}</h2>
        <span class="companies-container__company__info__email">{{company.email}}</span>
        <span class="companies-container__company__info__phone">{{company.phone}}</span>
      </div>
      <div class="companies-container__company__address company-address">
        <span v-if="company.address_line_1" class="company-address__line1">{{company.address_line_1}}</span>
        <span v-if="company.address_line_2" class="company-address__line2">{{company.address_line_2}}</span>
        <span v-if="company.city" class="company-address__city">{{company.city}}</span>
        <span v-if="company.state" class="company-address__state">{{company.state}}</span>
        <span v-if="company.postal_code" class="company-address__postal_code">{{company.postal_code}}</span>
        <span v-if="company.country" class="company-address__country">{{company.country}}</span>
        <span v-if="company.extra_address_info" class="company-address__extra_address_info">{{company.extra_address_info}}</span>
      </div>
      <div class="companies-container__company__buttons">
        <InterfaceButton text="" class="button--branded button--round button--small" icon="edit"/>
        <InterfaceButton text="" class="button--red button--round button--small" icon="trash-2"/>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: "Companies"
}
</script>

<style scoped lang="scss">
.companies-container {
  max-width: $ui-max-width;
  width: 90%;
  margin: 0px auto;
  &__company {
    display: flex;
    flex-direction: row;
    max-width: 600px;
    margin: 0px auto 10px auto;
    background-color: #ffffff;
    padding: 10px;
    border-left: 5px solid $brand-color;
    text-align: left;
    &__info {
      margin: 15px 20px;
      flex-grow: 1;
      h2 {
        margin: 0;
      }
      &__email, &__phone {
        font-weight: 400;
        display: block;
        margin: 1px 0px;
        color: $text-color-faded;
      }
    }
    &__address {
      margin: 15px;
      flex-grow: 1;
      span {
        display: block;
        text-align: left;
      } 
    }
    &__buttons {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      column-gap: 10px;
      justify-content: center;
      margin-right: 15px;
    }
  }
}

@media screen and (max-width: 650px) {
  .companies-container {
    &__company {
      flex-direction: column;
      &__buttons {
        flex-direction: row;
      }
    }
  }
}

</style>