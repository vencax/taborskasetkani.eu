
export default {
  data: function () {
    return {
      posts: null
    }
  },
  created: async function () {
    try {
      const count = this.$props.data.count
      const filter = { published: { lte: moment() }}
      const URL = this.data.url
      let url = `${URL}?sort=published:desc&filter=${JSON.stringify(filter)}`
      if (count) url = `${url}&currentPage=1&perPage=${count}`
      const dataReq = await axios.get(url)
      this.$data.posts = count ? dataReq.data.data : dataReq.data
    } catch (_) {
      this.$data.posts = [{ title: 'newsPreview: asi spatne url v datech' }]
    }
  },
  props: ['data'],
  template: `
    <div class="columns is-flex-wrap-wrap">
      <div v-for="(i, idx) in posts" :key="idx" class="column is-4">
        <h4 class="subtitle brown">{{ i.published | date }}</h4>
        <h3 class="title red">{{ i.title }}</h3>
        <div class="content"><markdown :text="i.content" /></div>
        <router-link :to="'/posts/' + i.id" class="">přečíst ></router-link>
      </div>
    </div>
  `
}
