<template>
  <div>
    <b-modal
      id="modal-new-category"
      title="New Category"
      size="sm"
      ok-only
      ok-variant="info"
      ok-title="Save"
      header-bg-variant="info"
      header-text-variant="light"
      @ok="handleSubmit"
    >
      <b-form-group
        label="Category Name"
        label-for="name-input"
      >
        <b-form-input
          id="name-input"
          v-model="name"
          required
        />
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'NewCategory',

    data() {
      return {
        name: ''
      }
    },

    computed: {
      lastInsertId() {

        const categories = this.$store.getters.getAll(this.$store.getters.getTypes.category);

        return (categories.length) ? categories[categories.length -1].id : 1;
      }
    },

    methods: {

      handleSubmit(bvModal) {

        // prevent modal closing
        bvModal.preventDefault();

        const categoryData = this.prepareNewCategory();

        if (!categoryData.name.trim().length) {

          alert('Category name is required!');
          return false;
        }

        this.$store.dispatch('addItem', categoryData);

        // Hide the modal manually
        this.$nextTick(() => {
            this.$bvModal.hide('modal-new-category')
        });

        // reset modal
        this.resetModal();
      },

      prepareNewCategory() {
        return {
          type: this.$store.getters.getTypes.category,
          id: this.lastInsertId +1,
          name: this.name
        }
      },

      resetModal() {
          this.name = ''
      }
    }
  }
</script>

<style scoped lang="scss">
  /*@import "~multiple-select-js/src/scss/multiple-select";*/
</style>
