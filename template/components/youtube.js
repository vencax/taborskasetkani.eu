export default {
  props: ['data', 'path'],
  template: `
  <div :class="data.class">
    <div class="embed-responsive embed-responsive-16by9">
      <iframe class="embed-responsive-item" :src="data.url" allowfullscreen></iframe>
    </div>
  </div>
  `
}
