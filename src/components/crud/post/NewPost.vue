<template>
  <div>
    <b-modal
        id="modal-new-post"
        ref="modal"
        title="New Post"
        ok-title="Submit"
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
            @select="selectedHandler"
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
                @click="addCategory"
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
  import {capitalizeFirstChar} from "../../../assets/js/helper";

  export default {
    name: 'NewPost',

    props: {
      editing: {
          type: Boolean,
          default: false
      }
    },

    components: {
      Multiselect,
      NewCategory
    },

    data() {
      return {
        insertId: 0,

        title: '',
        selectedCategories: [],
        body: '',
      }
    },

    computed: {
      categories() {
        const categories = this.$store.getters.getAll(this.$store.getters.getTypes.category);

        return categories.map(category => ({...category, name: capitalizeFirstChar(category.name)}));
      },

      lastInsertId() {

        const categories = this.$store.getters.getAll(this.$store.getters.getTypes.post);

        return (categories.length) ? categories[categories.length -1].id : 1;
      }
    },

    watch: {
      categories(newState) {

        const newItem = newState[newState.length -1];

        this.selectedCategories.push(newItem);
      }
    },

    methods: {

      selectedHandler(selectedOption) {
        // const find = this.selectedCategories.find()
          setTimeout(() => {
              this.selectedValue = [selectedOption];
          }, 100);
      },

      addCategory() {

      },

      modalShown() {
        this.resetModal();
      },

      modalHidden() {
        this.resetModal();
      },

      resetModal() {
        this.title = '';
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

        const postData = this.prepareNewPost();

        if (!postData.title.trim().length && !postData.body.trim().length) {

          alert('Cannot add empty post!');
          return;
        }

        this.$store.dispatch('addItem', postData);

        // Hide the modal manually
        this.$nextTick(() => {
            this.$bvModal.hide('modal-new-post')
        });
      },

      prepareNewPost() {

        const insertId = this.insertId +1;

        const time = new Date().toDateString();

        const categories = this.selectedCategories.map(category => category.id);

        this.insertId = insertId;

        return {
          type: this.$store.getters.getTypes.post,
          id: insertId,
          title: this.title,
          body: this.body,
          categories,
          published: time
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  /*@import "~multiple-select-js/src/scss/multiple-select";*/
</style>
