<template>
  <nav class="sidebar" :class="{'sidebar--compact': !this.isOpen}" v-touch:swipe="handleSwipe">  
    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127 181" class="site-logo"><path d="M5.5,165h0A10.5,10.5,0,0,0,16,175.5h96a9.5,9.5,0,0,0,9.5-9.5h0a9.5,9.5,0,0,0-9.5-9.5H15A9.5,9.5,0,0,1,5.5,147V15A9.5,9.5,0,0,1,15,5.5h0A9.5,9.5,0,0,1,24.5,15V144" style="fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:11px;"></path></svg> -->
    <img src="@/assets/images/logo.png" class="site-logo" />
    <ul class="sidebar__links" v-for="group in this.linkGroups">
      <span class="sidebar__links__group-title">{{ group.title }}</span>
      <li v-for="link in group.links" class="sidebar__links__link link">
        <NuxtLink :to="link.to">
          <span class="sidebar__links__link__icon" v-html="$feathericons[link.icon].toSvg()"></span>
          <span class="sidebar__links__link__text">{{link.title}}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background: #ffffff;
  flex-basis: 100%;
  max-width: 260px;
  transition: 0.25s;
  box-shadow: 0px 0px 5px 0px $shadow-color;
  z-index: 10;
  overflow-y: auto;
  overflow-x: hidden;
  
  .site-logo {
    color: #000;
    width: 100%;
    width: 100%;
    padding: 10px 25px;
    box-sizing: border-box;
    margin: 30px 0px;
    -webkit-user-drag: none;
  }
  &__links {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
    text-align: left;
    padding: 5px 15px 5px 15px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    flex-shrink: 0;

    .nuxt-link-exact-active.nuxt-link-active {
      background: $brand-color;
      color: #ffffff;
      &:hover, &:active, &:focus {
        background: $brand-color;
        color: #ffffff;
      }
    }
    &__group-title {
      text-transform: uppercase;
      margin: 10px;
      color: #a7a7a7;
      font-weight: bold;
      display: block;
      font-size: 0.8em;
    }
    &__link {    
      &__icon {
        display: flex;
        flex-direction: column;
      }  
      & a {
        text-decoration: none;
        display: flex;
        flex-direction: row;
        font-size: 1.1em;
        color: #333;
        padding: 10px 15px;
        -moz-column-gap: 10px;
        column-gap: 10px;
        margin-bottom: 3px;
        border-radius: 5px;
        box-sizing: border-box;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        white-space: nowrap;
        overflow: hidden;
        align-items: center;
        font-weight: 600;
      }
      & a:hover  {
        background: #f1f1f5;
        color: $brand-color;
      }

      &__icon svg {
        width: 1em;
        height: 1em;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .sidebar--compact {
    max-width: 60px;
    .site-logo {
      padding: 0px 7px;
    }
    &__link {
      a {
        justify-content: center;
        align-items: center;
        padding: 10px;
        width: 50px;
        height: 50px;
        margin-left: auto;
        margin-right: auto;
      }
    }
    .sidebar__links {
      border-top: 3px solid #eee;
      padding: 15px 5px;
      &__group-title {
        display: none;
      }
      &__link {
        a {
          padding: 15px 10px;
          justify-content: center;
        }
        &__text {
          display: none;
        }
      }
    }
    .sidebar__links__link__text {
      display: none;
    }
  }
}

@media screen and (max-width: 650px) {
  .sidebar {
    position: fixed;
  }
}

</style>

<script scoped>
export default {
  name: "NavSidebar",
  components: {
  },
  props: {
    isOpen_prop: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    handleSwipe(direction, e) {
      if(direction === "left") {
        this.isOpen = false;
      }
      else if(direction === "right") {
        this.isOpen = true;
      }
    }
  },
  data() {
    return {
      isOpen: this.isOpen_prop,
      linkGroups: [
        {
          title: "Dashboard",
          links: [
            {id: 1, to: "/", icon: "home", title: "Home"},
            {id: 3, to: "/invoices", icon: "file-text", title: "Invoices"},
            {id: 2, to: "/clients", icon: "user", title: "Clients"},
            {id: 4, to: "/statistics", icon: "pie-chart", title: "Statistics"},
            {id: 5, to: "/companies", icon: "briefcase", title: "Companies"}
          ]
        },
        {
          title: "Settings",
          links: [
            {id: 5, to: "/user/personalization", icon: "edit-3", title: "Personalization"},
            {id: 6, to: "/user/settings", icon: "settings", title: "User Settings"}
          ]
        },
        {
          title: "Administration",
          links: [
            {id: 7, to: "/admin/users", icon: "users", title: "Users"},
            {id: 8, to: "/admin/log", icon: "alert-triangle", title: "Log"},
            {id: 9, to: "/admin/settings", icon: "server", title: "Admin Settings"},
          ]
        }
      ]
    }
  }
}
</script>