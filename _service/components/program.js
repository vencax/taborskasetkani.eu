export default {
  data: function () {
    return {
      events: null,
      mista: null,
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
    if (this.$router.currentRoute.query.tagy) {
      const tags = this.$router.currentRoute.query.tagy.split(',')
      filter.or = _.map(tags, i => ({ tags: { like: "%" + i + "%" } }))
    }
    if (this.$router.currentRoute.query.favorites) {
      filter.id = { in: this.$data.favorites }
    }
    if (this.$router.currentRoute.query.dny) {
      const theWeekBegin = '2021-09-05'
      const and = this.$router.currentRoute.query.dny.split(',').map(i => {
        const b = moment(theWeekBegin).add(Number(i), 'days')
        const e = moment(b).add(1, 'days')
        return { cas: { between: [b, e] } }
      })
      filter.or = filter.or ? _.union(filter.or, and) : and
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
    <div class="column is-4"><DayPicker :data="data" /></div>
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
