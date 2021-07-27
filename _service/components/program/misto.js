export default {
  props: ['id', 'mista'],
  computed: {
    misto: function () {
      return _.find(this.$props.mista, i => i.id === this.$props.id)
    },
    // see https://developers.google.com/maps/documentation/urls/get-started
    dirURL: function () {
      return 'https://www.google.com/maps/dir/?api=1&travelmode=walking&destination=' + this.misto.gps
    }
  },
  template: `
  <a :href="dirURL" target="_blank" class="card-link">
    <i class="fas fa-map-marked-alt"></i> {{ misto.title }}
  </a>
  `
}