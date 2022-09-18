<template>
  <div class="custom-select" :class="{'custom-select--open': open}" @blur="open = false">
    <div class="custom-select__active" @click="open = !open" v-if="selected">
      {{ selected.title }}
      <span v-if="open" v-html="$feathericons['chevron-up'].toSvg()" style="width: 1em;display: flex;height: 1em;align-items: center;"></span>
      <span v-else v-html="$feathericons['chevron-down'].toSvg()" style="width: 1em;display: flex;height: 1em;align-items: center;"></span>
    </div>
    <div class="custom-select__options" v-if="open">
      <div class="custom-select__options__option" v-for="(option, i) of options" :key="i" @click="selected = option;open = false; $emit('input', option);" :class="{'custom-select__options__option--selected': selected === option}">
        {{ option.title }}
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      selected: this.options.length > 0 ? this.options[0] : null,
      open: false
    }
  }
}
</script>

<style scoped lang="scss">
.custom-select {
  outline: none;
  border: 0;
  margin: 0;
  max-width: 300px;
  width: 100%;
  position: relative;
  user-select: none;
  &__active {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background: #fff;
    font-weight: 600;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 12px;
    width: 100%;
    border: 2px solid transparent;
  }
  &__options {
    position: absolute;
    z-index: 20;
    text-align: left;
    padding: 5px 5px;
    background: #ffffff;
    border-radius: 12px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 3px;
    border: 1px solid #ccc;
    &__option {
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 3px;
      font-weight: 600;
      &--selected {
        font-weight: 600;
        background: $brand-color-faded;
        color: $brand-color;
      }
      &:hover {
        background: #e0e0fb;
      }
    }
  }
  &--open {
  }
}

.custom-select--open .custom-select__active{
  border-color: $brand-color;
  box-shadow: 0px 0px 0px 5px $brand-color-faded;
}

@media screen and (max-width: 650px) {
}

</style>