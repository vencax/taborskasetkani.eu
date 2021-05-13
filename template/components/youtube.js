export default {
  props: ['data', 'path'],
  template: `
  <div :class="data.class">
    <figure class="image is-16by9">
      <iframe class="has-ratio" :src="data.url" allowfullscreen></iframe>
    </figure>
  </div>
  `
}
