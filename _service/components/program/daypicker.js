export default {
  data: function () {
    return {
      selected: null,
      open: false
    }
  },
  props: ['data', 'onSelect'],
  methods: {
    doClick: function (val) {
      if (this.$data.selected === val) return
      this.$data.selected = val
      this.$props.onSelect(val)
    },
    selectDay: function (idx) {
      this.$data.selectedDay = idx
      this.load()
    }
  },
  template: `
<div class="dropdown" :class="open ? 'is-active' : ''">
  <div class="dropdown-trigger" @click="open = !open">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Filter dnů</span>
      <span class="icon is-small">
        <i class="fas" :class="open ? 'fa-angle-up' : 'fa-angle-down'" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <label class="dropdown-item checkbox" @click="doClick(2)">
        <input type="checkbox"> Úterý
      </label>
      <label class="dropdown-item checkbox" @click="doClick(2)">
        <input type="checkbox"> Středa
      </label>
    </div>
  </div>
</div>
  `
}