export default {
  props: ['data'],
  template: `
  <div class="row" :class="data.class">
    <div v-for="i in data.children" class="col-4">
      <div class="card">
        <img v-if="i.obrazek" :src="i.obrazek" class="card-img-top" :alt="i.title">
        <div class="card-body text-center">
          <p class="funkce text-uppercase">{{ i.funkce }}</p>
          <h3 class="card-title">{{ i.title }}</h3>
          <p class="card-text"><markdown :text="i.content" /></p>
        </div>
      </div>
    </div>
  </div>
  `
}

