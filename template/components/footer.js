export default {
  template: `
<footer id="footer" class="footer bg-black text-white">
  <div class="container">
  
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