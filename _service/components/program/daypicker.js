export default {
  data: function () {
    return {
      selected: null
    }
  },
  props: ['data', 'onSelect'],
  methods: {
    doClick: function (val) {
      if (this.$data.selected === val) return
      this.$data.selected = val
      this.$props.onSelect(val)
    }
  },
  template: `
  <div class="tabs is-toggle is-toggle-rounded">
    <ul>
      <li :class="selected === null ? 'is-active' : ''">
        <a href="javascript:void(0);" @click="doClick(null)">Všechny dny</a>
      </li>
			<li :class="selected === 2 ? 'is-active' : ''">
        <a href="javascript:void(0);" @click="doClick(2)">Úterý</a>
      </li>
      <li :class="selected === 5 ? 'is-active' : ''">
        <a href="javascript:void(0);" @click="doClick(5)">Pátek</a>
      </li>
      <li :class="selected === 6 ? 'is-active' : ''">
        <a href="javascript:void(0);" @click="doClick(6)">Sobota</a>
      </li>
      <li :class="selected === 7 ? 'is-active' : ''">
        <a href="javascript:void(0);" @click="doClick(7)">Neděle</a>
      </li>
    </ul>
  </div>
  `
}