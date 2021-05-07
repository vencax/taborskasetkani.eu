export default {
    props: ['data'],
    template: `
  <router-link :to="data.link">
    <button type="button" class="btn button" :class="data.class">
      {{ data.text }}
    </button>
  </router-link>
  `
}


