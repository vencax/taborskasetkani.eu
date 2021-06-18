Vue.filter('eventDate', function (value) {
  if (value) {
    value = _.isString(value) ? moment(value) : value
    return value.format('dddd hh:mm')
  }
})

const serviceTags = ['index', 'top10']

export default {
  data: function () {
    return {
      events: null,
      typeOpts: null,
      selected: null,
      loading: false
    }
  },
  created: async function () {
    try {
      const req = await axios.get(this.$props.data.cfgUrl)
      const opts = _.findWhere(req.data.attrs, { name: 'tags' }).options
      this.$data.typeOpts = _.filter(opts, i => i.value !== 'index')
      this.select(this.$data.typeOpts[0])
    } catch (_) {
      alert('toNejZProgramu: spatne')
    }
  },
  methods: {
    select: async function (opt) {
      this.$data.selected = opt.value
      this.$data.loading = true
      const filter = {
        status: "y",
        and: [
          { tags: { like: "%index%" }},
          { tags: { like: "%" + opt.value + "%" }}
        ]
      }
      const filterStr = JSON.stringify(filter)
      const dataReq = await axios.get(this.$props.data.url, {params: {filter: filterStr}})
      this.$data.loading = false
      this.$data.events = dataReq.data
    }
  },
  props: ['data'],
  template: `
  <div class="tonejzprogramu">

    <div class="is-flex is-justify-content-center my-4">
      
        <div class="tabs is-toggle is-toggle-rounded">
          <ul>
            <li v-for="(opt, idx) in $data.typeOpts" :key="idx"
                :class="selected===opt.value ? 'is-active' : ''">
              <a @click="select(opt)">{{opt.text}}</a>
            </li>
          </ul>
        </div>

    </div>

    <div class="columns is-flex-wrap-wrap">

      <div v-for="(i, idx) in events" :key="idx" class="column is-4">
      
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="i.obrazek ? $store.getters.mediaUrl(i.obrazek, 'w=640') : 'https://www.clipartkey.com/mpngs/m/40-401136_smiley-face-big-smile-clipart-png-download-excited.png'" :alt="i.title">
            </figure>
          </div>

          <div class="card-content">
            <h3 class="title">{{ i.title }}</h3>
            <h4 class="card-subtitle red">
              {{ i.cas | eventDate }}
            </h4>
            <div class="content">
              <markdown :text="i.content" />
            </div>
          </div>

        </div>
        
      </div>
    </div>
  </div>
  `
}
