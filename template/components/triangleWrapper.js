export default {
  props: ['data'],
  template: `
  <div class="triangle-wrapper">    
    <div class="right" :class="(data ? data.left : null) || 'yellow'"></div>
    <div class="left" :class="(data ? data.right : null) || 'red'"></div>
  </div>
  `
}