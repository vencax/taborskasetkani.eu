export default {
  data() {
    return {
      visible: null
    }
  },
  methods: {
    isCollapsed(idx) {
      return this.$data.visible === idx
    },
    select: function (idx) {
      this.$data.visible = this.$data.visible === idx ? null : idx
    }
  },
  props: ['data'],
  template: `
  <div class="accordion">
    <div class="card" v-for="(i, idx) in data.sections" :key="idx">

      <header class="card-header" @click="select(idx)">
        <p class="card-header-title">{{ i.title }}</p>
        <button class="button is-link card-header-icon" aria-label="více možností">
          <span class="icon">
            <i class="float-right fas" 
              :class="isCollapsed(idx) ? 'fas fa-minus' : 'fas fa-plus'"></i>
          </span>
        </button>
      </header>
 
      <div v-if="isCollapsed(idx)" class="card-content">
        <MDText class="content" :data="i.content" />
      </div>

    </div>
  </div>
  `
}