export default {
  template: `
<footer class="footer">
  <div class="container">

    <div class="is-flex is-justify-content-center">
      <img class="py-5" src="http://data.vxk.cz/ts/LOGO.svg" alt="logo" />
    </div>

    <div class="columns m-4">

      <div class="column">
        Táborská Setkání © 2021
      </div>
    
      <div class="column">
        <router-link to="/pristupnost">Prohlášení o přístupnosti</router-link>
      </div>
      <div class="column">
        <router-link to="/soukromi">Prohlášení o ochraně soukromí</router-link>
      </div>
      <div class="column">
        <router-link to="/sitemap">Struktura stránek</router-link>
      </div>      

    </div>

  </div>
</footer>
`}