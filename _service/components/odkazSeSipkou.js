export default {
  props: ['data'],
  template: `
  <div class="is-flex is-justify-content-center my-4">
    <router-link class="section-link" :to="data.to">
      <h2>{{ data.content }}</h2>
    </router-link>
  </div>
  `
}