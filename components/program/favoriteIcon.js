export default {
  props: ['event', 'favorites'],
  computed: {
    isLiked: function () {
      return this.$props.favorites.indexOf(this.$props.event.id) >= 0
    }
  },
  methods: {
    onClick: function () {
      const p = this.$props
      this.isLiked
        ? p.favorites.splice(p.favorites.indexOf(p.event.id), 1)
        : p.favorites.push(p.event.id)
    }
  },
  template: `
  <a href="JavaScript:void(0);" @click="onClick" class="card-link">
    <i class="fa-heart float-right" :class="isLiked ? 'fas' : 'far'"></i>
  </a>
  `
}