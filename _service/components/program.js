export default {
  data: function () {
    return {
      events: null,
      mista: null,
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
    this.$data.loading = true
    const filter = {
      status: "y"
    }
    if (this.$router.currentRoute.query.tags) {
      const tags = this.$router.currentRoute.query.tags.split(',')
      filter.or = _.map(tags, i => ({ tags: { like: "%" + i + "%" } }))
    }
    if (this.$router.currentRoute.query.tags) {
      filter.id = { in: this.$data.favorites }
    }
    // if (this.$data.selectedDay) {
    //   const b = this.$data.theWeekBegin.add(this.$data.selectedDay, 'days')
    //   const e = moment(b).add(1, 'days')
    //   filter.cas = { between: [b, e] }
    // }
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
    this.$data.theWeekBegin = moment('2021-09-05')
  },
  computed: {
    unpublished: function () {
      return this.$props.data.unpublished && 
        !this.$router.currentRoute.query.debug
    }
  },
  filters: {
    eventDate: function (value) {
      if (value) {
        value = _.isString(value) ? moment(value) : value
        return value.format('HH:mm / dddd DD.MM.')
      }
    }
  },
  props: ['data'],
  components: { 
    DayPicker: () => import('./program/daypicker.js'),
    TagPicker: () => import('./program/tagpicker.js'),
    Misto: () => import('./program/misto.js'),
    FavoriteIcon: () => import('./program/favoriteIcon.js'),
    FavoriteFilter: () => import('./program/favoriteFilter.js')
  },
  template: `
<div v-if="unpublished" class="container">
  Podrobný program je v přípravě. Děkujeme za strpení.
</div>
<div v-else class="container">
  <div class="columns">
    <DayPicker class="column is-4" :data="data" />
    <div class="column is-4"><TagPicker :data="data" /></div>
    <FavoriteFilter class="column is-4" />
  </div>

  <div class="columns is-flex-wrap-wrap">
    <i v-if="$data.loading" class="fas fa-spinner"></i>

    <div v-else v-for="(i, idx) in $data.events" :key="idx" class="column is-one-third card-program">

      <div class="card">
        <div v-if="i.obrazek" class="card-image is-hidden-mobile">
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
