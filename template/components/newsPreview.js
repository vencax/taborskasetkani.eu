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
        <h3>{{ i.title }}</h3>
        <h4>{{ i.published | longDate }}</h4>
        <p>{{ i.content }}</p>
      </div>
    </div>
  `
}