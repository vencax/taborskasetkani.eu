export default {
  data: function () {
    return {
      posts: null
    }
  },
  created: async function () {
    const dataReq = await axios.get(this.$props.data.url)
    this.$data.posts = dataReq.data.data
  },
  props: ['data', 'path'],
  template: `
  <div class="row">
    <div v-for="(i, idx) in posts" :key="idx" class="col">
      <div class="card">
        <img :src="i.obrazek" class="card-img-top" :alt="i.title">
        <div class="card-body">
          <h5 class="card-title">{{ i.title }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            {{ i.cas | longDate }}
          </h6>
          <p class="card-text">{{ i.content }}</p>
        </div>
      </div>
    </div>
  </div>
  `
}
