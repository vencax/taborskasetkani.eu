

export default {
  template: `
<header id="header" class="navbar navbar-expand-lg">
  <div class="container d-flex align-items-center">

    <div class="logo mr-auto">
      <h1><router-link to="/">{{ $store.state.site.title }}</router-link></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
    </div>

    <nav class="nav-menu d-none d-lg-block">
      <ul class="navbar-nav">
        <li v-for="i in $store.state.site.menu" class="nav-item">
          <router-link class="nav-link" :to="i.link">{{ i.label }}</router-link>
        </li>
      </ul>
    </nav>

    <div class="header-social-links">
      <a href="#">english</a>
      <a href="#">deutsh</a>
    </div>

    <div class="header-social-links">
      <a v-if="$store.state.site.twitter" :href="$store.state.site.twitter"><i class="fab fa-twitter"></i></a>
      <a v-if="$store.state.site.facebook" :href="$store.state.site.facebook"><i class="fab fa-facebook"></i></a>
      <a v-if="$store.state.site.instagram" :href="$store.state.site.instagram"><i class="fab fa-instagram"></i></a>
    </div>

  </div>
</header>
`
}