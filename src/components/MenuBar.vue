<template>
  <div class="menubar">
    <el-row  style="margin-top: 10px">
      <el-col :span="2" :offset="3">
        <el-image
            style="width: 130px"
            fit="fill"
            :src="src">
        </el-image>
      </el-col>
      <el-col :span="2" :offset="1" style="margin-top: 5px">
        <el-select v-model="choose_city" @change="handleCityChange">
          <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :offset="1" span="6">
        <el-menu
            @select="handleMenuSelect"
            :default-active="$route.path"
            active-text-color="red"
            mode="horizontal"
            class="el-menu-vertical"
            ref="menu"
            :unique-opened="true"
            router
        >
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item :index="$store.state.movies">影片</el-menu-item>
          <el-menu-item :index="$store.state.cinema">影院</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import img from "../assets/logo_taoticket.png"
  export default {
    name: "MenuBar",
    data(){
      return{
        src : img,
        choose_city: '杭州',
        cities: [],
      }
    },
    methods:{
      handleCityChange() {
        this.$store.commit('saveCity',this.choose_city)
      },

      handleMenuSelect(item) {

      },

      getAllCityName() {
        const _this = this
        this.axios.get('http://127.0.0.1:8000/index/city_info_controller/getAllCityName')
            .then(function (res){
              _this.cities = res.data.cities
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      }
    },
    created() {
      this.$store.commit('saveCity',this.choose_city)
      this.getAllCityName()
    }
  }
</script>

<style scoped>
  
</style>