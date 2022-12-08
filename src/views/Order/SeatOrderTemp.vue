<template>

</template>

<script>
  export default {
    name: "SeatOrderTemp",
    data(){
      return{
      
      }
    },
    methods:{
    
    },
    created() {
      const _this = this
      this.$router.push({
        path:'/seat_order',
        query: {
          film_times_id: _this.$route.query.film_times_id
        }
      })
    }
  }
</script>

<style scoped>
  
</style>