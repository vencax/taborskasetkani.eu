export default {
  props: ['data', 'path'],
  methods: {
    imgWidth: function (i) {
      return this.$store.getters.mediaUrl(i.url, `w=${i.width || 300}`)
    }
  },
  template: `
    <div :class="data.class" class="columns is-flex-wrap-wrap imageGrid">
      <div v-for="i, idx in data.list" :key="idx" class="column"
        :class="data.list.length > 1 ? 'is-flex is-align-items-center' : 'is-6 is-offset-one-quarter'">
				<a v-if="i.web" :href="i.web" target="_blank">
					<img :src="imgWidth(i)" :alt="i.name" />
        </a>
        <img v-else :src="imgWidth(i)" :alt="i.name" />
      </div>
    </div>

  `
}