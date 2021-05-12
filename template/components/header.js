
const bbbmenuitem = {
  data: function () {
    return { open: false }
  },
  props: ['data'],
  methods: {
    onC: function() {
      this.$data.open = ! this.$data.open
    },
    onSelect: function (link) {
      this.$data.open = false
      if (this.$router.currentRoute.path !== link) this.$router.push(link)
    }
  },
  template: `
    <li class="nav-item" :class="data.children ? 'dropdown' : ''">
      <a v-if="$props.data.children" class="nav-link dropdown-toggle"
          :class="open ? 'show' : ''"
          role="button"
          data-bs-toggle="dropdown" :aria-expanded="open"
          @click="onC">
        {{ data.label }}
      </a>
      <router-link v-else class="nav-link" :to="$props.data.link">
        {{ data.label }}
      </router-link>
      <ul v-if="$props.data.children && $data.open" 
            class="dropdown-menu" :class="open ? 'show' : ''">
        <li v-for="i in $props.data.children">
          <a href="javascript:void(0);" class="dropdown-item" @click="onSelect(i.link)">
            {{ i.label }}
          </a>
        </li>
      </ul>
    </li>
`
}
const menusubmenu = {
  props: ['to'],
  template: `
  <li v-if="i.children" class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      {{ i.label }}
    </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
      <li v-for="c in i.children">
        <router-link v-else class="dropdown-item" :to="c.link">
          {{ c.label }}
        </router-link>
      </li>
    </ul>
  </li>
  `
}
export default {
  data: function () {
    return { open: false }
  },
  components: { bbbmenuitem },
  template: `
<header id="header" class="navbar navbar-expand-lg">
  <div class="container">
  
    <router-link class="navbar-brand" to="/">
      {{ $store.state.site.title }}
    </router-link>
    
    <button class="navbar-toggler" type="button" 
        aria-controls="navbarTogglerDemo01" aria-expanded="false" 
        aria-label="Toggle navigation"
        @click="open = !open">
      <i class="fas fa-bars"></i>
    </button>


    <nav class="collapse navbar-collapse" :class="open ? 'show' : ''">
      <ul class="navbar-nav">
        <bbbmenuitem v-for="i in $store.state.site.menu" :data="i" />

        <li class="nav-item social-links"><a class="nav-link" href="#">english</a></li>
        <li class="nav-item social-links"><a class="nav-link" href="#">deutsh</a></li>

        <li class="nav-item social-links">

          <a class="nav-link" v-if="$store.state.site.twitter" :href="$store.state.site.twitter"><i class="fab fa-twitter"></i></a>
          <a class="nav-link" v-if="$store.state.site.facebook" :href="$store.state.site.facebook"><i class="fab fa-facebook"></i></a>
          <a class="nav-link" v-if="$store.state.site.instagram" :href="$store.state.site.instagram"><i class="fab fa-instagram"></i></a>
        </li>
      </ul>
    </nav>

  </div>
</header>
`
}