<template>
  <div id="app">

    <b-nav tabs align="center" class="navigation">
      <b-nav-item
        :active="$route.name === 'posts'"
        :to="{name: 'posts'}"
      >
        POSTS
      </b-nav-item>
      <b-nav-item
        :active="$route.name === 'categories'"
        :to="{name: 'categories'}"
      >
          CATEGORIES
      </b-nav-item>
    </b-nav>

    <b-container>
      <div class="content">
        <router-view/>
      </div>
    </b-container>
  </div>
</template>

<style lang="scss">
  .navigation {
    background-color: #4950571c;
  }
  .content {
    margin-top: 30px;
  }
</style>
