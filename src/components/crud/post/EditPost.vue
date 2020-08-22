<!--
  * We can re-use "NePost" component by modifying a bit
  * but for save some time just duplicating this
-->
<template>
  <div>
    <b-modal
        :id="modalId"
        ref="modal"
        title="Edit Post"
        ok-title="Save Changes"
        header-bg-variant="primary"
        header-text-variant="light"
        @shown="modalShown"
        @hidden="modalHidden"
        @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">

        <b-form-group
            label="Title"
            label-for="title-input"
        >
          <b-form-input
              id="title-input"
              v-model="title"
              required
          />
        </b-form-group>

        <b-form-group
            label="Category"
            label-for="category-input"
        >
          <Multiselect
            v-model="selectedCategories"
            :options="categories"
            label="name"
            track-by="id"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            placeholder="Choose from list"
            :max-height="150"
            :searchable="false"
            selectLabel=""
            deselectLabel=""
          >
            <!--Selection count-->
            <template slot="selection" slot-scope="{ values }">
              <span class="multiselect__single" v-if="values.length">
                {{ values.length }} selected
              </span>
            </template>

            <!--Add new-->
            <template slot="beforeList">
              <button
                type="button"
                class="btn btn-link btn-block text-left"
                v-b-modal.modal-new-category
              >
                Create New Category
              </button>
            </template>
          </Multiselect>
        </b-form-group>

        <b-form-group
            label="Body"
            label-for="body-input"
        >
          <b-form-textarea
              id="body-input"
              v-model="body"
              placeholder="Enter post body..."
              rows="3"
              max-rows="6"
          />
        </b-form-group>

      </form>
    </b-modal>

    <NewCategory />

  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect';
  import NewCategory from "../category/NewCategory";
  import 'vue-multiselect/dist/vue-multiselect.min.css';
  import { capitalizeFirstChar } from "../../../assets/js/helper";

  export default {
    name: 'EditPost',

    props: {
      post: {
          type: Object,
          required: true
      }
    },

    components: {
      Multiselect,
      NewCategory
    },

    data() {
      return {
        modalId: `modal-edit-post-${this.post.id}`,
        title: '',
        postCategories: [],
        selectedCategories: [],
        body: '',
      }
    },

    computed: {
      categories() {
        const categories = this.$store.getters.getAll(this.$store.getters.getTypes.category);

        return categories.map(category => ({...category, name: capitalizeFirstChar(category.name)}));
      }
    },

    watch: {
      categories(newState) {

        const newItem = newState[newState.length -1];

        this.selectedCategories.push(newItem);
      },

      postCategories(newState) {
        this.selectedCategories = this.categories.filter(category => newState.includes(category.id));
      }
    },

    methods: {

      modalShown() {

        const { title, categories, body } = this.post;

        // map prop to data
        this.title = title;
        this.postCategories = categories;
        this.body = body;
      },

      modalHidden() {
        this.resetModal();
      },

      resetModal() {
        this.title = '';
        this.postCategories = [];
        this.selectedCategories = [];
        this.body = '';
      },

      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },

      handleSubmit() {

        const postData = this.prepareUpdatedPost();

        if (!postData.title.trim().length && !postData.body.trim().length) {

          alert('Cannot add empty post!');
          return;
        }

        this.$store.dispatch('updateItem', postData);

        // Hide the modal manually
        this.$nextTick(() => {
            this.$bvModal.hide(this.modalId)
        });
      },

      prepareUpdatedPost() {

        return {
          ...this.post,
          type: this.$store.getters.getTypes.post,
          title: this.title,
          body: this.body,
          categories: this.selectedCategories.map(category => category.id)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  /*@import "~multiple-select-js/src/scss/multiple-select";*/
</style>
