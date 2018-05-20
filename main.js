const app = new Vue({
  el: '#app',
  data: {
    editFriend: null,
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
    },
    updateFriend(person) {
      fetch('https://jsonplaceholder.typicode.com/users/' + person.id, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      })
        .then(() => {
          this.editFriend = null;
        })
    },
  },
  template: `
    <div>
      <ul>
        <li v-for='person, index in friends'> 
          <div v-if="editFriend === person.id"> <!-- EDITING -->
            (id: {{person.id}}) <input v-on:keyup.13="updateFriend(person)" v-model="person.name" /> <!-- key 13 is 'enter' -->
            <button v-on:click="updateFriend(person)">Save</button>
          </div>
          <div v-else> <!-- DISPLAYING -->
            (id: {{person.id}}) {{person.name}} 
            <button v-on:click='editFriend = person.id'>Edit</button>
            <button v-on:click='deleteFriend(person.id, index)'>X</button>
          </div>
        </li>
      </ul>
    </div>
  `,
});

// GJ: Below is from the first 3-4 videos in this tutorial, where we separated friend into its own component
//
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