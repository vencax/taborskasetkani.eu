Vue.filter('eventDate', function (value) {
  if (value) {
    value = _.isString(value) ? moment(value) : value
    return value.format('dddd HH:mm')
  }
})

const tagpicker = {
  props: ['typeOpts', 'selected', 'onSelect'],
  template: `
  <div class="is-flex is-justify-content-space-evenly">
    <div v-for="(opt, idx) in typeOpts" :key="idx">

      <input type="checkbox" :checked="_.contains(selected, opt.value)"
        class="form-check-input" :id="idx" @click="onSelect(opt)">
      <label class="form-check-label small text-uppercase card-link-secondary"
        :for="idx">{{opt.text}}</label>
        
    </div>
  </div>
  `
}

export default {
  data: function () {
    return {
      typeOpts: null,
      events: null,
      mista: null,
      selected: null,
      selectedDay: null,
      theWeekBegin: null,
      loading: false,
      favorites: JSON.parse(localStorage.getItem('TS_FAVORITE_EVENTS') || '[]')
    }
  },
  watch: {
    favorites (val, oldVal) {
      localStorage.setItem('TS_FAVORITE_EVENTS', JSON.stringify(val))
    }
  },
  created: async function () {
    const cfgUrl = this.$props.data.url + 'config.json'
    const req = await axios.get(cfgUrl)
    const opts = _.findWhere(req.data.attrs, { name: 'tags' }).options
    this.$data.typeOpts = _.filter(opts, i => i.value !== 'index')
    this.$data.selected = _.map(this.$data.typeOpts, i => i.value)
    this.load()
    this.$data.theWeekBegin = moment('2021-09-05')
  },
  computed: {
    unpublished: function () {
      return this.$props.data.unpublished && 
        !this.$router.currentRoute.query.debug
    }
  },
  methods: {
    select: async function (opt) {
      if (_.contains(this.$data.selected, opt.value)) {
        this.$data.selected = _.without(this.$data.selected, opt.value)
      } else {
        this.$data.selected.push(opt.value)
      }
      this.load()
    },
    selectDay: function (idx) {
      this.$data.selectedDay = idx
      this.load()
    },
    load: async function () {
      this.$data.loading = true
      const filter = {
        status: "y",
        or: _.map(this.$data.selected, i => ({ tags: { like: "%" + i + "%" } }))
      }
      if (this.$data.selectedDay) {
        const b = this.$data.theWeekBegin.add(this.$data.selectedDay, 'days')
        const e = moment(b).add(1, 'days')
        filter.cas = { between: [b, e] }
      }
      const filterStr = JSON.stringify(filter)
      const dataReq = await axios.get(this.$props.data.url, {
        params: {
          filter: filterStr, sort: 'cas:asc'
        }
      })
      this.$data.events = dataReq.data
      // load mista
      const mistaIDs = _.keys(_.reduce(dataReq.data, (acc, i) => {
        acc[i.misto] = null
        return acc
      }, {}))
      const mistaReq = await axios.get(this.$props.data.mistaurl, {
        params: {
          filter: JSON.stringify({ id: { in: mistaIDs } })
        }
      })
      this.$data.mista = mistaReq.data

      this.$data.loading = false
    }
  },
  props: ['data'],
  components: { 
    DayPicker: () => import('./program/daypicker.js'),
    tagpicker: tagpicker,
    Misto: () => import('./program/misto.js'),
    FavoriteIcon: () => import('./program/favoriteIcon.js')
  },
  template: `
<div v-if="unpublished" class="container">
  Podrobný program je v přípravě. Děkujeme za strpení.
</div>
<div v-else class="container">
  <div class="columns">
    
    <div class="column is-half">
      <DayPicker data="selectedDay" :onSelect="selectDay" />
    </div>

    <div class="column is-half">
        <tagpicker :typeOpts="typeOpts" :selected="selected" :onSelect="select" />
    </div>

  </div>

  <div class="columns is-flex-wrap-wrap">
    <i v-if="$data.loading" class="fas fa-spinner"></i>

    <div v-else v-for="(i, idx) in $data.events" :key="idx" class="column is-one-third card-program">

      <div class="card">
        <div v-if="i.obrazek" class="card-image">
          <figure class="image is-4by3">
            <img :src="$store.getters.mediaUrl(i.obrazek)" alt="Obrázek">
          </figure>
        </div>

        <div class="card-content">

          <FavoriteIcon class="is-pulled-right" :event="i" :favorites="favorites" />
          <p class="title">{{ i.title }}</p>

          <div class="content">
            <p>
              <i class="far fa-clock"></i>
              <a href="#" class="card-link">{{ i.cas | eventDate }}</a><br/>

              <i class="fas fa-map-marked-alt"></i>
              <Misto :id="i.misto" :mista="mista" />
            </p>            

            <markdown :text="i.content" />
              
          </div>

        </div>
      </div>

      
    </div>
  
  </div>
</div>
  `
}
