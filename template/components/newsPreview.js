
const URL = '/uniapi/posts/'

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
  props: ['data',
  template: `
    <div class="columns is-desktop is-flex-wrap-wrap">
      <div v-for="(i, idx) in posts" :key="idx" class="column is-4">      
        <h4 class="subtitle brown">{{ i.published | date }}</h4>
        <h3 class="title red">{{ i.title }}</h3>        
        <markdown class="content" :text="i.content" />
      </div>
    </div>
  `
}
