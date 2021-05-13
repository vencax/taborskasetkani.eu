var bzucoApi;
var bzucoConfig = {
  headless: true,
  disableAutostart: true,
  onReady: function(api) {
    bzucoApi = api
  }
}

var jsRef = document.createElement("script")
jsRef.setAttribute("src", "https://mesto-tabor.bzuco.cloud/resources/frontend/embed.js")
const head = document.getElementsByTagName("head")
head[0].appendChild(jsRef)

export default {
  props: ['data'],
  created () {
    //bzucoStart("#bzucoDIV")
  },
  components: {
    'bzuco-shop': () => import('./my-async-component')
  }
  template: `
  <div id="bzucoDIV">
    <a class="bzuco-widget-basket" 
      href="http://www.seznam.cz"
      data-label="🛒"
    >KOKO</a>
  </div>
  `
}