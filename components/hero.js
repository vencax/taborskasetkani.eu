export default {
  props: ['data', 'path'],
  template: `
  <div id="hero">
   
    <div id="herotext"></div>
    
  </div>
  `
}

// <div class="container">
// <div class="columns is-desktop">
// <div class="column is-6 is-offset-6 p-4">
//   <h1>{{ data.title }}</h1>
//   <h2>{{ data.subtitle }}</h2>
//   <p class="lead">{{ data.content }}</p>
//   <router-link :to="data.link">
//     <button class="button is-link is-large my-4">{{ data.button }}</button>
//   </router-link>
// </div>
// </div>
// </div>
