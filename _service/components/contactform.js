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
      question: null,
      formdata: _.reduce(this.$props.data.controls, (acc, i) => {
        acc[i.name] = ''
        return acc
      }, { a: '' })
    }
  },
  created: async function () {
    const reqQuestion = await axios.get(this.$props.data.url)
    this.$data.question = reqQuestion.data.q
    this.$data.qid = reqQuestion.data.id
  },
  computed: {
    formcontrols: function () {
      return _.union(this.$props.data.controls, [{
        name: 'a',
        label: 'kontrolní otázka: ' + this.$data.question,
        component: 'input',
        placeholder: 'správnou odpovědí ověříme, že nejste robot :)'
      }])
    }
  },
  methods: {
    handleSubmit: async function () {
      this.$data.submitting = true
      try {
        const data = Object.assign({ id: this.$data.qid, to: this.$props.data.to }, this.$data.formdata)
        const res = await axios.post(this.$props.data.url, data)
      } catch (err) {
        const message = 'nesouhlasí odpověď na kontrolní otázku'
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

  <div v-if="question" class="field" v-for="i, idx in formcontrols">
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
