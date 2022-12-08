<template>
  <div class="movies">
    <keep-alive :include="$store.state.keepAlivePage">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "Movies",
  data() {
    return {

    }
  },
  methods: {

  },
  created() {
  }
}
</script>

<style scoped>

</style>