export default {
  props: ['data'],
  computed: {
    decoClass: function () {
      const icon = this.$props.data.icon || 'kalich'
      const color = this.$props.data.color || 'red'
      return `deco-${icon}-${color} ${this.$props.data.class}`
    }
  },
  template: `
  <span :is="data.tag || 'h1'" :class="decoClass">
    {{ data.content }}
  </span>
  `
}