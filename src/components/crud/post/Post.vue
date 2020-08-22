<template>
  <b-card class="text-center mt-3 mb-3 bg-light">

    <h3>{{ post.title }}</h3>

    <small
      v-for="category in categories"
      :key="category.id"
      class="badge text-capitalize"
    >
      {{ category.name }}
    </small>

    <div class="text-left">{{ post.body }}</div>

    <div class="text-right text-muted mt-2 posted">{{ post.published }}</div>

  </b-card>
</template>

<script>
    export default {
      name: "Post",

      props: {
        post: {
          type: Object,
          required: true
        }
      },

      data() {
        return {
          categories: []
        }
      },

      mounted() {
        this.getCategoriesByIds()
      },

      methods: {

        getCategoriesByIds() {

          const type = this.$store.getters.getTypes.category;

          this.categories = this.post.categories.map(categoryId => this.$store.getters.getOne(type, categoryId));
        }
      }
    }
</script>

<style scoped>
  .posted {
    font-size: 13px;
    font-style: italic;
  }
  .badge {
    font-size: 15px;
  }
</style>
