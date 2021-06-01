const URL = '/uniapi/files/'

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
      carouselOpened: false,
      images: []
    }
  },
  created: async function () {
    try {
      const filter = {
        ctype: { like: 'image%' },
        and: [{ tags: { like: `%${this.$props.data.imagesTag}%` } }]
      }
      const dataReq = await axios.get(URL, {params: {
        currentPage: 1,
        perPage: 4,
        filter: JSON.stringify(filter)
      }})
      this.$data.images = dataReq.data.data
    } catch (_) {
      this.$data.images = [{ title: 'newsPreview: asi spatne url v datech' }]
    }
  },
  computed: {
    isVideo: function () {
      return this.$props.data.primaryMedia
    }
  },
  props: ['data'],
  methods: {
    openCarousel: function () {
      this.$data.carouselOpened = true
    },
    closeCarousel: function () {
      this.$data.carouselOpened = false
    }
  },
  components: { myCarousel },
  template: `
  <div class="column is-6">
    <div class="card">

      <div class="card-image">
        <figure class="image is-4by3">
          <iframe v-if="isVideo" class="has-ratio" 
              :src="data.primaryMedia" allowfullscreen></iframe>
          <img v-else :src="data.primaryMedia" :alt="data.title">
        </figure>
      </div>

      <div v-if="false" class="card-content">
        <h3 class="title">{{ data.title }}</h3>
        <div class="content">
          <markdown :text="data.content" />
        </div>
      </div>

      <div class="columns is-gapless is-mobile" @click="openCarousel">
        <div v-for="i,idx in images" :key="idx" class="column">
          <img :src="$store.getters.mediaUrl(i, 'w=200')" />
        </div>
      </div>

      <div v-if="carouselOpened">
        <myCarousel :onClose="closeCarousel" :data="data" />
      </div>

    </div>
  </div>
  `
}

