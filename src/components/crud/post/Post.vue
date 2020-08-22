<template>
  <b-card class="text-center mt-3 mb-3 bg-light">

    <div>
      <h3>{{ post.title }}</h3>
      <b-button
        size="sm"
        variant="outline-primary"
        class="post-edit-btn"
        v-b-modal="`modal-edit-post-${post.id}`"
      >
        Edit
      </b-button>
    </div>

    <small
      v-for="category in categories"
      :key="category.id"
      class="badge text-capitalize border border-secondary ml-1 mr-1"
    >
      {{ category.name }}
    </small>

    <div class="text-left">{{ post.body }}</div>

    <div class="text-right text-muted mt-2 posted">{{ post.published }}</div>

    <EditPost :post="post" />

  </b-card>

</template>

<script>
  import EditPost from "./EditPost";

  export default {
    name: "Post",

    props: {
      post: {
        type: Object,
        required: true
      }
    },

    components: {
        EditPost
    },

    computed: {

      categories() {
        return this.getCategoriesByIds()
      }
    },

    methods: {

      getCategoriesByIds() {

        const type = this.$store.getters.getTypes.category;

        return this.post.categories.map(categoryId => this.$store.getters.getOne(type, categoryId));
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
  .post-edit-btn {
    position: absolute;
    top: 15px;
    right: 15px;
  }
</style>
