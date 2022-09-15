<template>
  <NuxtLink class="button" v-if="type==='link'" :to="to">
    <span class="button__icon" v-if="icon" v-html="$feathericons[icon].toSvg()"></span>
    <span class="button__text">{{text}}</span>
  </NuxtLink>
  <button class="button" v-else>
    <span class="button__icon" v-if="icon" v-html="$feathericons[icon].toSvg()"></span>
    <span class="button__text">{{text}}</span>
  </button>
</template>

<script scoped>
  export default {
    props: {
      icon: {
        default: "",
        type: String
      },
      text: {
        default: "Submit",
        type: String
      },
      type: {
        default: "link",
        type: String
      },
      to: {
        default: "",
        type: String
      }
    }
  }
</script>

<style scoped lang="scss">
.button {
  border: none;
  outline: none;
  padding: 8px 20px;
  cursor: pointer;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  column-gap: 5px;
  row-gap: 5px;
  font-size: 0.9em;
  text-decoration: none;
  justify-content: center;
  &--branded {
    background: $brand-color;
    color: $white-color;
    &:hover {
      background: $brand-color-darker;
    }
  }
  &--white {
    background: $white-color;
    color: #333;
  }
  &--curved {
    border-radius: 5px;
  }
  &--round {
    border-radius: 20px;
  }
  &--circle {
    border-radius: 100%;
  }
  &--small {
    max-width: 100px;
  }
  &--medium {
    max-width: 250px;
  }
  &--fullwidth {
    max-width: 100%;
  }
  &__icon {
    display: flex;
    width: 1.3em;
  }
  &__text {
    word-break: initial;
    white-space: normal;
  }
}

</style>