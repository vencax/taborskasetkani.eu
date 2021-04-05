export default {
  props: ['data', 'path'],
  template: `
  <div class="triangle-wrapper">
    <div :class="data.obracene ? 'triangle-right-R' : 'triangle-right-Y'"></div>
    <div :class="data.obracene ? 'triangle-left-Y' : 'triangle-left-R'"></div>
  </div>
  `
}