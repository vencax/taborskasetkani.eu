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
      const cfgUrl = 'http://test.vxk.cz/api/_events/config.json'
      const req = await axios.get(cfgUrl)
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
  props: ['data', 'path'],
  template: `
  <div class="tonejzprogramu">
    <div class="row">
      <div class="col-12 text-center">
        <div class="btn-group btn-group-lg mb-4" role="group">
          <button v-for="(opt, idx) in $data.typeOpts" :key="idx"
            type="button" role="tab"
            :class="{'active': selected===opt.value, 'nav-link': true}"
            class="btn btn-outline-primary"
            :aria-selected="selected===opt.value"
            @click="select(opt)">{{opt.text}}</button>
        </ul>
      </div>
    </div>

    <div class="row">
      <div v-for="(i, idx) in events" :key="idx" class="col">
      
        <div class="card">
          <img :src="i.obrazek" class="card-img-top" :alt="i.title">
          <div class="card-body">
            <h3 class="card-title">{{ i.title }}</h3>
            <h4 class="card-subtitle mb-2 red">
              {{ i.cas | eventDate }}
            </h4>
            <p class="card-text">{{ i.content }}</p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  `
}
