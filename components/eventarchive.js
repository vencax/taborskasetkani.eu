export default {
  data: function () {
    return {
      items: null
    }
  },
  created: async function () {
    let url = `${this.$props.data.url}?sort=title:desc&attrs=title,primary`
    const dataReq = await axios.get(url)
    this.$data.items = dataReq.data
  },
  props: ['data'],
  template: `
  <div class="columns is-flex-wrap-wrap">
    <div v-for="i,idx in items" :key="idx" class="column eventgallery is-6">

      <router-link :to="'/galerie/' + i.title">
        <figure class="image is-16by9">
          <img 
            :src="$store.getters.mediaUrl(i.primary, 'w=500')" 
            :alt="i.title" />
        </figure>
        <h2>{{ i.title }}</h2>
      </router-link>

    </div>
  </div>
  `
}