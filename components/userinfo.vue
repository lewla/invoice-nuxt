<template>
  <div class="user-info">
    <span class="user-info__name" :title="this.$auth.user.first_name + ' ' +  this.$auth.user.last_name">
      {{ this.$auth.user.username }}
    </span>
    <div class="user-info__buttons">
      <span class="user-info__buttons__button">
        <span class="user-info__buttons__button__icon" v-html="$feathericons['settings'].toSvg()" aria-label="Settings button" role="button"></span>
      </span>
      <span class="user-info__buttons__button">
        <span class="user-info__buttons__button__icon" v-html="$feathericons['log-out'].toSvg()" aria-label="Logout button" role="button"></span>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.user-info {
  padding: 15px 10px;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: $ui-max-width;
  justify-content: flex-end;
  align-items: center;
  column-gap: 10px;
  margin: 0px auto;

  &__name {
    font-weight: 600;
  }
  &__buttons {
    display: flex;
    flex-direction: row;
    column-gap: 6px;
    &__button {
      &__icon {
        color: $text-color-faded;
        svg {
          padding: 1px;
          vertical-align: middle;
          cursor: pointer;
          &:hover {
            color: $text-color;
          }
        }
      }
    }
  }
}


</style>

<script scoped>
export default {
  name: "Userinfo"
}
</script>