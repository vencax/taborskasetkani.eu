export default {
    props: ['data'],
    template: `
  <router-link :to="data.link">
    <button class="button is-large my-4" :class="data.class">
      {{ data.text }}
    </button>
  </router-link>
  `
}


