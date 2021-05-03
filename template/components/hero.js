export default {
  props: ['data', 'path'],
  template: `
  <section id="hero">
    <div class="container" data-aos="fade-up">
      <div class="row">
        <div class="col-md-6 offset-md-6 py-7">
          <h1>{{ data.title }}</h1>
          <h2>{{ data.subtitle }}</h2>
          <p class="lead">{{ data.content }}</p>
          <router-link to="/vstupne">
            <button type="button" class="btn btn-lg btn-light">VSTUPNÉ</button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
  `
}