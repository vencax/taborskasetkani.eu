export default {
  data: function () {
    return {
      selected: null,
      open: false
    }
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
      let selected = this.$router.currentRoute.query.days
        ? this.$router.currentRoute.query.days.split(',')
        : [2, 3, 4, 5, 6, 7]
      if (_.contains(selected, idx)) {
        selected = _.without(selected, idx)
      } else {
        selected.push(idx)
      }
      const query = Object.assign({}, this.$router.currentRoute.query)
      query.days = selected.join(',')
      this.$router.push({ query })
    },
    isSelected: function (idx) {
      return this.$router.currentRoute.query.days
        ? this.$router.currentRoute.query.days.indexOf(idx) >= 0
        : true
    }
  },
  template: `
<div class="dropdown is-fullwidth" :class="open ? 'is-active' : ''">
  <div class="dropdown-trigger" @click="open = !open">
    <button class="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Filter dnů</span>
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
    </div>
  </div>
</div>
  `
}