
const bbbmenuitem = {
  props: ['data'],
  template: `
  <div v-if="$props.data.children" class="navbar-item has-dropdown is-hoverable">
    <div class="navbar-link">
      {{ data.label }}
    </div>

    <div class="navbar-dropdown">
      <router-link v-for="i, idx in $props.data.children" :key="idx"
          class="navbar-item" :to="i.link">
        {{ i.label }}
      </router-link>
    </div>
  </div>
  <router-link v-else class="navbar-item" :to="data.link">
    {{ data.label }}
  </router-link>
  `
}
export default {
  data: function () {
    return { expanded: false }
  },
  components: { bbbmenuitem },
  template: `
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="container">

    <div class="navbar-brand">

      <router-link class="navbar-item" to="/">
        <img :src="$store.getters.mediaUrl('LOGO.svg')" :alt="$store.state.site.title" />
      </router-link>

      <a role="button" class="navbar-burger" aria-label="menu"
            :class="expanded ? 'is-active' : ''"
            @click="expanded = !expanded">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>

    </div>

    <div class="navbar-menu" :class="expanded ? 'is-active' : ''">

      <div class="navbar-end">
        <bbbmenuitem v-for="i, idx in $store.state.site.menu" :key="idx" :data="i" />
        <div class="navbar-item social-links">
          <a v-if="$store.state.site.twitter" :href="$store.state.site.twitter" target="_blank"><i class="fab fa-twitter"></i></a>
          <a v-if="$store.state.site.facebook" :href="$store.state.site.facebook" target="_blank"><i class="fab fa-facebook"></i></a>
          <a v-if="$store.state.site.instagram" :href="$store.state.site.instagram" target="_blank"><i class="fab fa-instagram"></i></a>
        </div>
      </div>

    </div>

  </div>
</header>
`
//<div class="navbar-item">
//          <a href="#">english</a>/<a href="#">deutsch</a>
//        </div>
}
