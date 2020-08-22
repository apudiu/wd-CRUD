<template>
  <div class="home">
    <b-row>
      <b-col class="mb-3">
        <b-button
          variant="primary"
          v-b-modal="`modal-new-post`"
        >
          Add new post
        </b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col>

        <Post
          v-for="post in posts"
          :post="post"
          :key="post.id"
        />

      </b-col>
    </b-row>

    <NewPost />

  </div>
</template>

<script>
import Post from '../components/crud/post/Post';
import NewPost from "../components/crud/post/NewPost";

export default {
  name: 'PostsPage',

  components: {
    Post,
    NewPost
  },

  computed: {
    posts() {
      return this.$store.getters.getAll(this.$store.getters.getTypes.post);
    }
  }
}
</script>
