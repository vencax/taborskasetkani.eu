export default {
  computed: {
    isChecked: function () {
      return this.$router.currentRoute.query.favorites
    }
  },
  methods: {
    toggle: function () {
      const query = Object.assign({}, this.$router.currentRoute.query)
      query.favorites = !query.favorites
      this.$router.push({ query })
    }
  },
  template: `
  <div>
    <label class="checkbox">
      <input type="checkbox" @click="toggle" :checked="isChecked"> Zobrazit oblíbené
    </label>
    <span class="card-link title">
      <i class="fa-heart fas"></i>
    </span>
  </div>
  `
}