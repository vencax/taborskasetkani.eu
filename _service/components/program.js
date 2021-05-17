Vue.filter('eventDate', function (value) {
  if (value) {
    value = _.isString(value) ? moment(value) : value
    return value.format('dddd hh:mm')
  }
})

const tagpicker = {
  props: ['typeOpts', 'selected', 'onSelect'],
  template: `
  <div class="col-6">
    <div v-for="(opt, idx) in typeOpts" :key="idx"
        class="form-check form-check-inline pl-0 mb-3">

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
  props: ['data'],
  template: `
  <ul class="nav nav-pills">
    <li class="nav-item">
      <a class="nav-link active" href="#">Všechny dny</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Pátek</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Sobota</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Neděle</a>
    </li>
  </ul>
  `
}

export default {
  data: function () {
    return {
      typeOpts: null,
      events: null,
      mista: null,
      selected: null,
      loading: false
    }
  },
  created: async function () {
    const cfgUrl = 'http://test.vxk.cz/api/_events/config.json'
    const req = await axios.get(cfgUrl)
    const opts = _.findWhere(req.data.attrs, { name: 'tags' }).options
    this.$data.typeOpts = _.filter(opts, i => i.value !== 'index')
    this.$data.selected = _.map(this.$data.typeOpts, i => i.value)
    this.load()
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
    load: async function () {
      this.$data.loading = true
      const filter = {
        status: "y",
        or: _.map(this.$data.selected, i => ({ tags: { like: "%" + i + "%" } }))
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
      const mistaReq = await axios.get('http://test.vxk.cz/api/ts_places/', {
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
  <div>
    <div class="container">
      
      <div class="row justify-content-md-center">
        <daypicker data="ff" />
      
        <p class="lead">Vyberte si vaše oblibené podle programu</p>

        <tagpicker :typeOpts="typeOpts" :selected="selected" :onSelect="select" />
      </div>
    </div>

    <div class="">
      <div class="container py-5">

        <i v-if="$data.loading" class="fas fa-spinner"></i>

        <div v-else class="row">
          <div v-for="(i, idx) in $data.events" :key="idx" class="col card-program">

            <div class="card m-3" style="width: 19rem;">
              <div class="card-body">
              <h6 class="card-subtitle mb-2 text-muted">{{ i.tags }}</h6>
              
                <h3 class="card-title">
                  {{ i.title }} <i class="fa-heart float-right" :class="false ? 'fas' : 'far'"></i>
                </h3>
                

                <p class="card-text">{{ i.content }}</p>
                <div class="d-flex flex-column">
                  <a href="#" class="card-link">
                    <i class="far fa-clock"></i> {{ i.cas | eventDate }}
                  </a>
                  <misto :id="i.misto" :mista="mista" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  
  </div>
  `
}