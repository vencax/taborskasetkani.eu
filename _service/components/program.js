Vue.filter('eventDate', function (value) {
  if (value) {
    value = _.isString(value) ? moment(value) : value
    return value.format('dddd hh:mm')
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

const misto = {
  props: ['id', 'mista'],
  computed: {
    misto: function () {
      return _.find(this.$props.mista, i => i.id === this.$props.id)
    },
    // see https://developers.google.com/maps/documentation/urls/get-started
    dirURL: function () {
      return 'https://www.google.com/maps/dir/?api=1&travelmode=walking&destination=' + this.misto.gps
    }
  },
  template: `
  <a :href="dirURL" target="_blank" class="card-link">
    <i class="fas fa-map-marked-alt"></i> {{ misto.title }}
  </a>
  `
}
        

const daypicker = {
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

export default {
  data: function () {
    return {
      typeOpts: null,
      events: null,
      mista: null,
      selected: null,
      selectedDay: null,
      theWeekBegin: null,
      loading: false
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
  props: ['data', 'path'],
  components: { daypicker: daypicker, tagpicker: tagpicker, misto },
  template: `
<div v-if="data.unpublished" class="container">
  Program se teprve tvoří. Strpení prosím.
</div>
<div v-else class="container">
  <div class="columns">
    
    <div class="column is-half">
      <daypicker data="selectedDay" :onSelect="selectDay" />
    </div>

    <div class="column is-half">
        <tagpicker :typeOpts="typeOpts" :selected="selected" :onSelect="select" />
    </div>

  </div>

  <div class="columns is-flex-wrap-wrap">
    <i v-if="$data.loading" class="fas fa-spinner"></i>

    <div v-else v-for="(i, idx) in $data.events" :key="idx" class="column is-one-third card-program">

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ i.title }}</p>
          <div class="card-header-icon">
            <i class="fa-heart float-right" :class="false ? 'fas' : 'far'"></i>
          </div>
        </header>

        <div class="card-content">        

          <div class="content">
            <markdown :text="i.content" />
          
            <h6 class="card-subtitle mb-2 text-muted">{{ i.tags }}</h6>

            <a href="#" class="card-link">
              <i class="far fa-clock"></i> {{ i.cas | eventDate }}
            </a>
            <p><misto :id="i.misto" :mista="mista" /></p>
          </div>

        </div>
      </div>

      
    </div>
  
  </div>
</div>
  `
}
