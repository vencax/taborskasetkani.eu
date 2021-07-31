export default {
  data: function () {
    return {
      selected: null,
      open: false,
      typeOpts: null
    }
  },
  created: async function () {
    const cfgUrl = this.$props.data.url + 'config.json'
    const req = await axios.get(cfgUrl)
    const opts = _.findWhere(req.data.attrs, { name: 'tags' }).options
    this.$data.typeOpts = _.filter(opts, i => !_.contains(['index'], i.value))
    this.$data.selected = this.$router.currentRoute.query.tagy
      ? this.$router.currentRoute.query.tagy.split(',')
      : _.reduce(this.$data.typeOpts, (acc, i) => { acc.push(i.value); return acc }, [])
  },
  methods: {
    select: function (opt) {
      if (_.contains(this.$data.selected, opt.value)) {
        this.$data.selected = _.without(this.$data.selected, opt.value)
      } else {
        this.$data.selected.push(opt.value)
      }
    },
    isSelected: function (opt) {
      return _.contains(this.$data.selected, opt.value)

      // return this.$router.currentRoute.query.tags
      //   ? this.$router.currentRoute.query.tags.indexOf(opt.value) >= 0
      //   : true
    },
    apply: function () {
      const query = Object.assign({}, this.$router.currentRoute.query)
      query.tagy = this.$data.selected.join(',')
      this.$router.push({ query })
    }
  },
  props: ['data'],
  template: `
<div class="dropdown is-fullwidth" :class="open ? 'is-active' : ''">
  <div class="dropdown-trigger" @click="open = !open">
    <button class="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Filter žánrů</span>
      <span class="icon is-small">
        <i class="fas" :class="open ? 'fa-angle-up' : 'fa-angle-down'" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div v-if="typeOpts" class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <div v-for="(opt, idx) in typeOpts" :key="idx" class="dropdown-item">
        <label class="checkbox">
          <input @click="select(opt)" type="checkbox" :checked="isSelected(opt)"> {{opt.text}}
        </label>
      </div>
      <div class="dropdown-item">
        <button @click="apply" class="button is-success is-fullwidth">filtrovat</button>
      </div>
    </div>
  </div>
</div>
  `
}