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
  props: ['data', 'path'],
  template: `
  <section :class="data.component">

    <div class="accordion">
      <div class="card" v-for="(i, idx) in data.sections" :key="idx">
        <div class="card-header">
          <h3 class="mb-0">
            <button class="btn btn-link btn-block text-left" type="button" 
                  @click="select(idx)">
              {{ i.title }}
              <i class="float-right fas" 
                :class="isCollapsed(idx) ? 'fas fa-angle-down' : 'fas fa-angle-up'"></i>
            </button>
          </h3>
        </div>
        <div class="collapse" :class="{show: isCollapsed(idx)}">
          <div class="card-body">
            <MDText :data="i.content" />
          </div>
        </div>
      </div>
    </div>

  </section>
  `
}