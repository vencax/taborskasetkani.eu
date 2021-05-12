export default {
  props: ['data', 'path'],
  template: `
  <section id="hero">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-6">
          <h1>{{ data.title }}</h1>
          <h2>{{ data.subtitle }}</h2>
          <p class="lead">{{ data.content }}</p>
          <router-link :to="data.link">
            <button type="button" class="btn btn-lg btn-light">{{ data.button }}</button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
  `
}