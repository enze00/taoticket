<template>
  <div class="cinema">
    <keep-alive :include="$store.state.keepAlivePage">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: "Cinema",
    data(){
      return{

      }
    },
    methods:{
    
    }
  }
</script>

<style scoped>
</style>