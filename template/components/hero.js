export default {
  props: ['data', 'path'],
  template: `
  <section id="hero">
    <div @click="$store.dispatch('edit', {data, path})" class="container" data-aos="fade-up">
      <div class="row">
        <div class="col-md-6 offset-md-6 p-5">
          <h1>{{ data.title }}</h1>
          <h2>{{ data.subtitle }}</h2>
          <p>{{ data.content }}</p>
        </div>
      </div>
    </div>
  </section>
  `
}