<template>
  <div class="home">
    <b-row>
      <b-col class="mb-3">
        <b-button
            variant="info"
            v-b-modal.modal-new-category
        >
          Add new category
        </b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col>

        <b-card
          class="text-center mt-3 mb-3 bg-light"
          v-for="category in categories"
          :key="category.id"
        >
          <h3>{{ capitalize(category.name) }}</h3>
        </b-card>

      </b-col>
    </b-row>

    <NewCategory />

  </div>
</template>

<script>
  import NewCategory from "../components/crud/category/NewCategory";
  import { capitalizeFirstChar } from "../assets/js/helper";

  export default {
    name: 'PostsPage',

    components: {
      NewCategory
    },

    computed: {
      categories() {
        return this.$store.getters.getAll(this.$store.getters.getTypes.category);
      }
    },

    methods: {
      capitalize(text) {
        return capitalizeFirstChar(text);
      }
    }
  }
</script>
