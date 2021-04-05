Vue.filter('eventDate', function (value) {
  if (value) {
    value = _.isString(value) ? moment(value) : value
    return value.format('dddd hh:mm')
  }
})

export default {
  data: function () {
    return {
      typeOpts: null,
      events: null,
      selected: null,
      loading: false
    }
  },
  created: async function () {
    const cfgUrl = 'http://test.vxk.cz/api/_events/config.json'
    const req = await axios.get(cfgUrl)
    const opts = _.findWhere(req.data.attrs, { name: 'tags' }).options
    this.$data.typeOpts = _.filter(opts, i => i.value !== 'index')
    this.select(this.$data.typeOpts[0])
  },
  methods: {
    select: async function (opt) {
      this.$data.selected = opt.value
      this.$data.loading = true
      const filter = {
        status: "y",
        tags: { like: "%" + opt.value + "%" }
      }
      const filterStr = JSON.stringify(filter)
      const dataReq = await axios.get(this.$props.data.url, {params: {filter: filterStr}})
      this.$data.loading = false
      this.$data.events = dataReq.data
    }
  },
  props: ['data', 'path'],
  template: `
  <div>
    <nav>
      <div class="nav nav-tabs" role="tablist">
        <button v-for="(opt, idx) in $data.typeOpts" :key="idx"
          :class="{'active': selected===opt.value, 'nav-link': true}"
          type="button" role="tab"
          aria-controls="nav-home"
          :aria-selected="selected===opt.value"
          @click="select(opt)">{{opt.text}}</button>
      </div>
    </nav>
    <div class="tab-content">
      <i v-if="$data.loading" class="fas fa-spinner"></i>
      <div v-else class="row" role="tabpanel">
        <div v-for="(i, idx) in $data.events" :key="idx" class="col-12">
          <h5>
            {{ i.title }} <i class="far fa-clock"></i> {{ i.cas | eventDate }}
          </h5>
          <p>{{ i.content }}</p>
        </div>
      </div>
    </div>
  </div>
  `
}
