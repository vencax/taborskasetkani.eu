const formComponents = {
  finput: {
    props: [ 'data', 'cfg' ],
    template: `
    <input class="input" :type="cfg.type" 
      :value="data[cfg.name]"
      @input="evt => data[cfg.name] = evt.target.value" />
    `
  },
  ftextarea: {
    props: [ 'data', 'cfg' ],
    template: `
    <textarea class="textarea" :rows="cfg.rows"
      :value="data[cfg.name]"
      @input="evt => data[cfg.name] = evt.target.value" />
    `
  }
}

export default {
  data: function () {
    return {
      submitting: false,
      formdata: _.reduce(this.$props.data.controls, (acc, i) => {
        acc[i.name] = ''
        return acc
      }, { otazka: '' })
    }
  },
  computed: {
    formcontrols: function () {
      return _.union(this.$props.data.controls, [{
        name: 'otazka',
        label: 'kontrolní otázka: ' + this.$props.data.otazka,
        component: 'input'
      }])
    }
  },
  methods: {
    handleSubmit: async function () {
      this.$data.submitting = true
      try {
        if (this.$data.formdata.otazka === this.$props.data.odpoved) {
          const url = this.$props.data.submitUrl
          const data = _.without(this.$data.formdata, 'otazka')
          const res = await axios.post(url, data)
        } else {
          throw new Error('nesouhlasí odpověď na kontrolní otázku')
        }
      } catch (err) {
        const message = err.response.data
        this.$store.dispatch('toast', { message, type: 'error' })
      } finally {
        this.$data.submitting = false
      }      
    }
  },
  props: ['data'],
  components: formComponents,
  template: `
<form @submit.prevent="handleSubmit">

  <div class="field" v-for="i, idx in formcontrols">
    <label class="label">{{ i.label }}</label>
    <div class="control">
      <component :is="'f' + i.component" 
        :data="formdata" :cfg="i"
        :placeholder="i.placeholder" />
    </div>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button type="submit" class="button is-link" 
        :disabled="submitting"
      >Odeslat</button>
    </div>
  </div>

<form>
  `
}
