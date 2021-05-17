export default {
  template: `
<footer class="footer">
  <div class="container">

    <img class="py-4" src="http://data.vxk.cz/ts/LOGO.svg" alt="logo" />
  
    <div class="columns">

      <div class="column text-center">
        Táborská Setkání © 2021
      </div>
    
      <div class="column">
        <router-link to="/prohlaseni">Prohlášení o přístupnosti</router-link>
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