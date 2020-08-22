import Vue from 'vue'
import Vuex from 'vuex'
import { splitPayload } from '../assets/js/helper';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [
      {
        id: 1,
        categories: [2, 3],
        title: 'A bit closer to green',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus ducimus enim eum molestias necessitatibus possimus reprehenderit, repudiandae totam? A blanditiis distinctio earum facere fugiat minus modi odit possimus recusandae, vero.',
        published: '2020-08-20 12:07:55'
      },
      {
        id: 2,
        categories: [1],
        title: 'Trump on bunker',
        body: 'Ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam atque delectus dolorum, enim, error et ex fuga harum in labore magnam modi quasi qui quibusdam quos similique. Accusamus amet cupiditate dolore, eos et eum explicabo facilis hic inventore ipsa iste maiores maxime molestias quaerat.',
        published: '2020-08-20 12:07:55'
      },
      {
        id: 3,
        categories: [2, 3],
        title: 'Bangladesh is awesome',
        body: 'Dolor sit amet, consectetur adipisicing elit. Autem dicta minus necessitatibus non. Autem culpa ea numquam! Earum expedita illo inventore laborum quaerat reiciendis repellat?',
        published: '2020-08-20 12:07:55'
      },
      {
        id: 4,
        categories: [1],
        title: 'Assasination of Major Md. Sinha',
        body: 'Consectetur adipisicing elit. Ab aliquam architecto asperiores, aspernatur assumenda atque blanditiis consequatur cupiditate deserunt doloribus ducimus est et fugiat ipsam nam nostrum odit possimus quibusdam quis quod, quos rem reprehenderit sint soluta tempora temporibus tenetur ullam unde voluptas voluptatibus? Consequatur dicta dolor dolorem doloribus facere nostrum placeat porro quaerat reprehenderit rerum! Aliquid animi blanditiis commodi cupiditate in laborum officia porro sint.',
        published: '2020-08-20 12:07:55'
      }
    ],
    
    categories: [
      {id: 1, name: 'news'},
      {id: 2, name: 'travel'},
      {id: 3, name: 'nature'}
    ],
    
    types: {
      post: 'posts',
      category: 'categories'
    }
  },
  
  mutations: {
  
    /**
     * Add
     * @param state
     * @param payload Object
     */
    add(state, payload) {
      
      const {type, data} = splitPayload(payload);
      
      state[type].push(data);
    },
    
  
    /**
     * Update
     * @param state
     * @param payload Object
     */
    update(state, payload) {
  
      const {type, data} = splitPayload(payload);
  
      const index = state[type].findIndex(item => item.id === data.id);
      state[type].splice(index, 1, data);
    }
  },
  
  getters: {
  
    /**
     * Get all
     * @param state
     * @return Function (type String)
     */
    getAll: state => type => state[type],
  
    /**
     * Get one
     * @param state
     * @return Function (type String, Int itemId)
     */
    getOne: state => (type, itemId) => state[type].find(item => item.id === itemId),
  
    /**
     * Returns available types (Does not updates automatically)
     * @param state
     * @return Object
     */
    getTypes: state => state.types
    
  },
  
  actions: {
    addItem({commit}, item) {
      commit('add', item);
    },
    
    updateItem({commit}, item) {
      commit('update', item);
    }
  }
})
