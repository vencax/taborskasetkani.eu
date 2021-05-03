export default {
  template: `
<footer id="footer" class="bg-cream  text-dark">
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-6 py-7 footer-newsletter">

        <p>Oficiální stránky festivalu Táborská Setkání © 2021
        </p>
        <p>
        Poslední aktualizace: 29. 3. 2021
        </p>
      </div>

      <div class="col-lg-4 col-md-6 footer-links">
        <h3 class="orange">Užitečné odkazy</h3>
        <ul>
          <li hidden v-for="i in $store.state.site.menu">
            <router-link :to="i.link">{{ i.label }}</router-link>
          </li>
          <li>Prohlášení o přístupnosti</li>
          <li>Prohlášení o ochraně soukromí</li>
          <li>Struktura stránek</li>
        </ul>
      </div>

      <div class="col-lg-4 col-md-6">
        <h3 class="orange">Pořadatel</h3>
        <p>
          Město Tábor, odbor kultury </br>
          Žižkovo náměstí 11  </br>
          390 01 Tábor  </br>
          info@mutabor.cz <br>
          datová schránka: 5zrb8iz <br>
        </p>
      </div>

      

    </div>
  </div>
</footer>
`}