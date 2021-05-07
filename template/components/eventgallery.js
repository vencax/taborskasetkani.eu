const URL = '/uniapi/files/'
export default {
  data: function () {
    return {
      images: null
    }
  },
  created: async function () {
    try {
      const url = `${URL}?currentPage=1&perPage=2&filter={"tags":{"like":"ts2019"}}`
      const dataReq = await axios.get(url)
      this.$data.images = dataReq.data.data
    } catch (_) {
      this.$data.images = [{ title: 'newsPreview: asi spatne url v datech' }]
    }
  },
  props: ['data'],
  template: `
  <div :class="data.class">
    <div class="card">
      <img v-if="i.obrazek" :src="i.obrazek" class="card-img-top" :alt="i.title">
      <div class="card-body text-center">
        <h3 class="card-title">{{ i.title }}</h3>
        <p class="card-text"><markdown :text="i.content" /></p>
        <div class="row">
          <img v-for="i in images" :src="i.link" />
        </div>
      </div>
    </div>
  </div>
  `
}

