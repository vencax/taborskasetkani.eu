const URL = 'http://test.vxk.cz/api/posts/'

export default {
  data: function () {
    return {
      posts: null
    }
  },
  created: async function () {
    try {
      const url = `${URL}?currentPage=1&perPage=${this.$props.data.count}&sort=published:asc`
      const dataReq = await axios.get(url)
      this.$data.posts = dataReq.data.data
    } catch (_) {
      this.$data.posts = [{ title: 'newsPreview: asi spatne url v datech' }]
    }
  },
  props: ['data', 'path'],
  template: `
    <div class="row">
      <div v-for="(i, idx) in posts" :key="idx" class="col">
        <h3>{{ i.title }}</h3>
        <h4>{{ i.published | longDate }}</h4>
        <markdown :text="i.content" />
      </div>
    </div>
  `
}
