export default {
  props: ['data', 'path'],
  template: `
    <div :class="data.class" class="columns is-flex-wrap-wrap">
      <div v-for="i, idx in data.list" :key="idx" class="column is-quarter">
        <img :src="i.url" :alt="i.name" />
      </div>
    </div>

  `
}