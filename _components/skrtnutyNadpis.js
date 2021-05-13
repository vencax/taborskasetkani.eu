export default {
  props: ['data'],
  template: `
  <div class="h1-wrapper">
    <div class="line"></div>
    <h1>{{ data.content }}</h1>
    <div class="line"></div>
  </div>
  `
}