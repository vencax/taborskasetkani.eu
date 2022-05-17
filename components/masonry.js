export default {
  props: ['data', 'path'],
  methods: {
    showCarousel: function (idx) {
      this.$modal.show('example')
    }
  },
  mounted () {
    import('https://cdn.jsdelivr.net/npm/vue-js-modal@2.0.0-rc.6/dist/index.js')
    .then(res => {
      console.log(res);
    })
  },
  template: `
  <div :class="data.class">
    <div class="card-columns masonry">
      <div class="card" v-for="(i, idx) in data.list" :key="idx">
        <img :src="$store.state.site.cdn + i.url" :alt="i.name" 
          @click="showCarousel(idx)" />
      </div>
      <modal name="example">This is an example</modal>
    </div>
  </div>
  `
}
