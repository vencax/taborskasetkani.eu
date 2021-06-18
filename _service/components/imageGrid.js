export default {
  props: ['data', 'path'],
  template: `
    <div :class="data.class" class="columns is-flex-wrap-wrap">
      <div v-for="i, idx in data.list" :key="idx" class="column is-quarter">
				<a v-if="i.web" :href="i.web" target="_blank">
					<img :src="$store.getters.mediaUrl(i.url, 'w=300')" :alt="i.name" />
        </a>
        <img v-else :src="$store.getters.mediaUrl(i.url, 'w=300')" :alt="i.name" />
      </div>
    </div>

  `
}