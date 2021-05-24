export default {
  props: ['data'],
  template: `
  <div :class="data.class" class="columns is-flex-wrap-wrap">
    <div v-for="i, idx in data.cards" :key="idx" class="column is-one-third">
      <div class="card">
        <img v-if="i.obrazek" :src="i.obrazek" class="card-img-top" :alt="i.title">

        <div class="card-content">
          <p class="funkce text-uppercase subtitle">{{ i.funkce }}</p>
          <h3 class="title">{{ i.title }}</h3>

          <div class="content">
            <markdown :text="i.content" />
          </div>
        </div>

      </div>
    </div>
  </div>
  `
}

