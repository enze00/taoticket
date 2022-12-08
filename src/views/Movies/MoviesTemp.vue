<template>

</template>

<script>
export default {
  name: "MoviesTemp",
  props: {
    film_id: {
      type: String,
      default: 'no data'
    }
  },
  data() {
    return {}
  },
  methods: {

  },
  created() {
    const _this = this
    this.$router.push({
      path:'/movies_detail',
      query: {
        film_id: _this.$route.query.film_id,
      }
    })
  }
}
</script>

<style scoped>

</style>