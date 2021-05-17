export default {
  props: ['data'],
  template: `
  <div class="triangle-wrapper">    
    <div class="left" :class="(data ? data.left : null) || 'red'"></div>
    <div class="right" :class="(data ? data.right : null) || 'yellow'"></div>
  </div>
  `
}