export default {
  data: function () {
    return {
      selected: null,
      open: false
    }
  },
  created: async function () {
    this.$data.selected = this.$router.currentRoute.query.dny
      ? this.$router.currentRoute.query.dny.split(',').map(i => (Number(i)))
      : [2, 3, 4, 5, 6, 7]
  },
  props: ['data'],
  computed: {
    days: function () {
      return ['úterý', 'středa', 'čtvrtek', 'pátek', 'sobota', 'neděle']
    }
  },
  methods: {
    select: function (idx) {
      idx = idx + 2
      if (_.contains(this.$data.selected, idx)) {
        this.$data.selected = _.without(this.$data.selected, idx)
      } else {
        this.$data.selected.push(idx)
      }
    },
    isSelected: function (idx) {
      return _.contains(this.$data.selected, idx + 2)
    },
    apply: function () {
      const query = Object.assign({}, this.$router.currentRoute.query)
      query.dny = this.$data.selected.join(',')
      this.$router.push({ query })
    }
  },
  template: `
<div class="dropdown is-fullwidth" :class="open ? 'is-active' : ''">
  <div class="dropdown-trigger" @click="open = !open">
    <button class="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Filtr dnů</span>
      <span class="icon is-small">
        <i class="fas" :class="open ? 'fa-angle-up' : 'fa-angle-down'" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <div v-for="(day, idx) in days" :key="idx" class="dropdown-item">
        <label class="checkbox">
          <input @click="select(idx)" type="checkbox" :checked="isSelected(idx)"> {{ day }}
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