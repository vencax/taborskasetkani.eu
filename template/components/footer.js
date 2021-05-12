export default {
  template: `
<footer id="footer" class="bg-black text-white">
  <div class="container">

    <div class="row">

      <div class="col-12 py-7 text-center">
        Táborská Setkání © 2021
      </div>
    
      <div class="col-sm-12 col-md-4">
        <router-link to="/prohlaseni">Prohlášení o přístupnosti</router-link>
      </div>
      <div class="col-sm-12 col-md-4">
        <router-link to="/soukromi">Prohlášení o ochraně soukromí</router-link>
      </div>
      <div class="col-sm-12 col-md-4">
        <router-link to="/sitemap">Struktura stránek</router-link>
      </div>      

    </div>

  </div>
</footer>
`}