const URL = '/api/uni/files/'

const myCarousel = {
  data: function () {
    return {
      curr: null,
      images: [],
      loading: true
    }
  },
  created: async function () {
    try {
      const filter = {
        ctype: { like: 'image%' },
        and: [{ tags: { like: `%${this.$props.data.imagesTag}%` } }]
      }
      const dataReq = await axios.get(URL, {params: {
        filter: JSON.stringify(filter)
      }})
      this.$data.images = dataReq.data
      this.$data.curr = dataReq.data[0]
      this.$data.loading = false
    } catch (_) {
      // do nothing, let the spinner spin ;)
    }
  },
  props: ['data', 'onClose'],
  methods: {
    imgURL: function (i) {
      return `${CDN}${i.id}/${i.filename}`
    },
    toLeft: function () {
      const ctx = _.indexOf(this.$data.images, this.$data.curr)
      const newCtx = ctx === 0 ? (this.$data.images.length - 1) : (ctx - 1)
      this.$data.curr = this.$data.images[newCtx]
    },
    toRight: function () {
      const ctx = _.indexOf(this.$data.images, this.$data.curr)
      const newCtx = ctx === (this.$data.images.length - 1) ? 0 : (ctx + 1)
      this.$data.curr = this.$data.images[newCtx]
    }
  },
  template: `
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <i v-if="loading" class="fas fa-spinner fa-spin"></i>
      <div v-else>
      
        <div class="field has-addons">
          <p class="control">
            <button class="button" @click="toRight">
              <span class="icon is-small">
                <i class="fas fa-arrow-left"></i>
              </span>
              <span> doleva </span>
            </button>
          </p>
          <p class="control">
            <button class="button" @click="toLeft">              
              <span> doprava </span>
              <span class="icon is-small">
                <i class="fas fa-arrow-right"></i>
              </span>
            </button>
          </p>
        </div>

        <img :src="$store.getters.mediaUrl(curr)" />
      </div>
    </div>
    <button @click="onClose" class="modal-close is-large" aria-label="close"></button>
  </div>
  `
}

export default {
  data: function () {
    return {
      // curr: null,
      images: [],
      loading: true
    }
  },
  created: async function () {
    try {
      const filter = {
        ctype: { like: 'image%' },
        and: [{ tags: { like: `%${this.$props.data.item.images_tag}%` } }]
      }
      const dataReq = await axios.get(URL, {params: {
        filter: JSON.stringify(filter)
      }})
      this.$data.images = dataReq.data
      this.$data.loading = false
    } catch (_) {
      // do nothing, let the spinner spin ;)
    }
  },
  props: ['data'],
  methods: {
    imgURL: function (i) {
      return `${CDN}${i.id}/${i.filename}`
    }
  },
  template: `
  <div class="eventmasonry">
      <img v-for="i,idx in images" :key="idx" 
        :src="$store.getters.mediaUrl(i, 'w=300')" />
  </div>
  `
}