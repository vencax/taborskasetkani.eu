const formComponents = {
  input: {
    props: [ 'value', 'cfg' ],
    template: `
    <input class="input" :type="cfg.type" :value="value"
      @input="$emit('input', cfg.name, $event.target.value)"
      :placeholder="cfg.placeholder" />
    `
  },
  textarea: {
    props: [ 'value', 'cfg' ],
    template: `
    <textarea class="textarea" :rows="cfg.rows" :value="value"
      @input="$emit('input', cfg.name, $event.target.value)" 
      :placeholder="cfg.placeholder"/>
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
      const fc = _.union(this.$props.data.controls, [{
        name: 'a',
        label: 'kontrolní otázka: ' + this.$data.question,
        component: 'input',
        placeholder: 'správnou odpovědí ověříme, že nejste robot :)'
      }])
      return fc
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
    },
    getComponent: function (name) {
      if (name in formComponents) {
        return formComponents[name]
      }
      return name
    },
    setValue: function (name, value) {
      this.$data.formdata[name] = value
    }
  },
  props: ['data'],
  template: `
<form @submit.prevent="handleSubmit" v-if="question !== null">

  <div  class="field" v-for="i in formcontrols" :key="i.name">
    <label class="label">{{ i.label }}</label>
    <div class="control">
      <component :is="getComponent(i.component)"
        :value="$data.formdata[i.name]"
        :cfg="i"
        @input="setValue" />
    </div>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button type="submit" class="button is-link" 
        :disabled="submitting"
      >Odeslat</button>
    </div>
  </div>

</form>
  `
}
