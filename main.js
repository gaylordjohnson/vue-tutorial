const app = new Vue({
  el: '#app',
  data: {
    friends: [],
  },
  mounted() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        this.friends = json;
      })
  },
  methods: {
    deleteFriend(id, index) {
      fetch('https://jsonplaceholder.typicode.com/users/' + id, {
        method: 'DELETE'
      })
        .then(() => {
          this.friends.splice(index, 1);
        })
    }
  },
  template: `
    <div>
      <p v-for='person, index in friends'>{{person.name}} 
      <button v-on:click='deleteFriend(person.id, index)'>X</button>
      </p>
    </div>
  `,
});

// Vue.component('friend-component', {
//   props: ['friend'],
//   filters: {
//     full(person) {
//       return `${person.first} ${person.last} ${person.age}`;
//     },
//   },
//   methods: {
//     increment(person) {
//       person.age += 1;
//     },
//     decrement(person) {
//       person.age -= 1;
//     },
//   },
//   template: `
//     <div>
//       <h2>{{friend | full}}</h2>
//       <input v-model='friend.first'>
//       <input v-model='friend.last'>
//       <button v-on:click='increment(friend)'>+</button>
//       <button v-on:click='decrement(friend)'>-</button>
//     </div>
//   `
// });

// const app = new Vue({
//   el: "#app",
//   data: {
//     friends: [
//       {
//         first: 'John',
//         last: 'Brickminster',
//         age: 33,
//       },
//       {
//         first: 'Spencer',
//         last: 'Black the Third',
//         age: 100,
//       },
//     ],
//   },
//   template: `
//     <div>
//       <friend-component style='border:1px solid yellowgreen; margin-bottom:10px; padding:15px;' v-for='person in friends' v-bind:friend='person' />
//     </div>
//   `
// })