Vue.filter('eventDate', function (value) {
  if (value) {
    value = _.isString(value) ? moment(value) : value
    return value.format('dddd hh:mm')
  }
})

// ?currentPage=1&perPage=3&sort=cas:asc

export default {
  data: function () {
    return {
      events: null
    }
  },
  created: async function () {
    const url = `${this.$props.data.url}?sort=id:asc&filter={"status":"y"}`
    const dataReq = await axios.get(url)
    this.$data.events = dataReq.data
  },
  props: ['data', 'path'],
  template: `
  <div class="row">
    <div v-for="(i, idx) in events" :key="idx" class="col">
      <div class="card">
        <img :src="i.obrazek" class="card-img-top" :alt="i.title">
        <div class="card-body">
          <h5 class="card-title">{{ i.title }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            {{ i.cas | eventDate }}
          </h6>
          <p class="card-text">{{ i.content }}</p>
        </div>
      </div>
    </div>
  </div>
  `
}
