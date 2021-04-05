export default {
  template: `
<footer id="footer" class="bg-dark text-light">
  <div class="container">
    <div class="row">

      <div class="col-lg-4 col-md-6">
        <h3>Pořadatel</h3>
        <p>
          Město Tábor, odbor kultury </br>
          Žižkovo náměstí 11  </br>
          390 01 Tábor  </br>
          info@mutabor.cz <br>
          datová schránka: 5zrb8iz <br>
        </p>
      </div>

      <div class="col-lg-4 col-md-6 footer-links">
        <h3>Užitečné odkazy</h3>
        <ul>
          <li v-for="i in $store.state.site.menu">
            <router-link :to="i.link">{{ i.label }}</router-link>
          </li>
        </ul>
      </div>

      <div class="col-lg-4 col-md-6 footer-newsletter">
    
      <p>
        Oficiální stránky festivalu Táborská Setkání © 2021
      </p>
      <p>
        Poslední aktualizace: 29. 3. 2021
        </p>
        <p>
        Prohlášení o přístupnosti
        </p>
        <p>
        Prohlášení o ochraně soukromí
        </p>
        <p>
        Prohlášení o přístupnosti
        </p>
        <p>
        Struktura stránek
        </p>
        
     
      </div>

    </div>
  </div>
</footer>
`}