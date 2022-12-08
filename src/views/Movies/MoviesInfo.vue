<template>
  <div class="movies_info">
    <el-divider></el-divider>
    <el-row style="margin-top: 1%">
      <el-col :span="5"  style="margin-left: 13%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>影片</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$store.state.city}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6" style="margin-left: 30%">
        <div style="color: #888888;font-size: 13px">
          3步轻松购票:1.选座购票/买券
          <i class="el-icon-right" style="font-weight: bolder"></i>
          2.收电子码
          <i class="el-icon-right" style="font-weight: bolder"></i>
          3.影院取票
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 1%">
      <el-col :span="12" style="margin-left: 13%">
        <div style="width: 100%; border:1px solid #E4E7ED ">
          <el-row>
            <el-col style="width: 94%;margin-left: 2%">
              <el-tabs
                  v-model="tabName"
                  style="margin-top: 2%"
                  @tab-click="handleTabClick"
              >
                <el-tab-pane :label="'正在热映('+this.showingMovies.showingMoviesNum+')'" name="now_showing">
                  <el-col :span="7" v-for="(item, index) in showingMovies.moviesData" :key="index" :offset="1" :style="index > 2 ? 'margin-top: 3%' : ''">
                    <el-card :body-style="{ position:'relative',padding: '0px'}">
                      <transition name="el-zoom-in-top">
                        <div v-show="item.isHover" class="transition-box" @mouseleave="hoverShowingImg(item,index)">
                          <p style="top: 5%;">导演:{{item.director}}</p>
                          <p style="top: 15%;">主演:{{item.actor.substr(0,10)}}{{item.actor.length>10?"...":""}}</p>
                          <p style="top: 25%;">类型:{{item.film_type}}</p>
                          <p style="top: 35%;">地区:{{item.make_film_area}}</p>
                          <p style="top: 45%;">语言:{{item.language}}</p>
                          <p style="top: 55%;">片长:{{item.film_length}}分钟</p>
                        </div>
                      </transition>
                      <el-image
                          @mouseover="hoverShowingImg(item,index)"
                          style="position:relative; z-index: 1;width: 200px;height: 280px"
                          :src="item.url"
                      >
                      </el-image>
                      <p style="position: absolute;z-index: 2;left: 5%;top: 76%;color: white;font-size: 12px;font-weight: bold">{{item.film_name}}</p>
                      <p style="position: absolute;z-index: 2;left: 84%;top: 76%;color: white;font-size: 12px;font-weight: bold">{{item.score}}</p>
                      <div>
                        <div class="bottom clearfix">
                          <el-button class="button" style="width: 100%;" type="danger" @click="showMoviesDetail(item)">选座购票</el-button>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-tab-pane>
                <el-tab-pane :label="'即将上映('+this.comingMovies.comingMoviesNum+')'" name="coming_soon">
                  <el-col :span="7" v-for="(item, index) in comingMovies.moviesData" :key="index" :offset="1" :style="index > 2 ? 'margin-top: 3%' : ''">
                    <el-card :body-style="{ position:'relative',padding: '0px'}">
                      <transition name="el-zoom-in-top">
                        <div v-show="item.isHover" class="transition-box" @mouseleave="hoverComingImg(item,index)">
                          <p style="top: 5%;">导演:{{item.director}}</p>
                          <p style="top: 15%;">主演:{{item.actor.substr(0,10)}}{{item.actor.length>10?"...":""}}</p>
                          <p style="top: 25%;">类型:{{item.film_type}}</p>
                          <p style="top: 35%;">地区:{{item.make_film_area}}</p>
                          <p style="top: 45%;">语言:{{item.language}}</p>
                          <p style="top: 55%;">片长:{{item.film_length}}分钟</p>
                        </div>
                      </transition>
                      <el-image
                          @mouseover="hoverComingImg(item,index)"
                          style="position:relative; z-index: 1;width: 200px;height: 280px"
                          :src="item.url"
                      >
                      </el-image>
                      <p style="position: absolute;z-index: 2;left: 5%;top: 76%;color: white;font-size: 12px;font-weight: bold">{{item.film_name}}</p>
                      <p style="position: absolute;z-index: 2;left: 84%;top: 76%;color: white;font-size: 12px;font-weight: bold">{{item.score}}</p>
                      <div>
                        <div class="bottom clearfix">
                          <el-button class="button" style="width: 100%;" type="info" plain @click="showMoviesDetail(item)">上映时间{{item.play_time}}</el-button>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="width: 100%; border:1px solid #E4E7ED;height: 320px;margin-left: 2px;background-color: rgba(247,247,247,0.34)">
          <el-col style="width: 90%" :offset="1">
            <el-row style="margin-top: 2%;margin-bottom: 1%">
              <el-col :span="5" style="margin-top: 8px">
                <span>热门影院</span>
              </el-col>
              <el-col :span="5" :offset="14">
                <el-button class="text_button" type="text" @click="$router.push('/cinema_info')">全部影院<i class="el-icon-arrow-right"></i></el-button>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <div v-for="(item,index) in hotCinemaData" :key="index" style="border-bottom:1px solid #E4E7ED;height: 60px">
              <el-row>
                <el-col :span="16">
                  <el-row style="font-size: 14px; margin-top: 4%">
                    {{item.cinema_name.substr(0,9)}}{{item.cinema_name.length>9?"...":""}}
                  </el-row>
                  <el-row style="font-size: 12px; margin-top: 3%">
                    {{item.cinema_address.substr(0,16)}}{{item.cinema_address.length>16?"...":""}}
                  </el-row>
                </el-col>
                <el-col :span="6" :offset="1" style="margin-top: 4%">
                  <el-button type="danger" size="small" @click="showCinemaDetail(item)">选座购票</el-button>
                </el-col>
              </el-row>
            </div>
          </el-col>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MoviesInfo",
  data() {
    return {
      tabName: '',
      showingMovies: {
        showingMoviesNum: 0,
        moviesData: [
          // {
          //   isHover: false,
          //   film_id:'',
          //   film_name: '寂静之地2',
          //   director: '',
          //   actor: '',
          //   film_type: '',
          //   make_film_area: '',
          //   language: '',
          //   film_length: 0,
          //   score: 7.7,
          //   url: 'https://img.alicdn.com/bao/uploaded/i3/O1CN018C4XfR1UlboqFW2Fd_!!6000000002558-0-alipicbeacon.jpg_300x300.jpg',
          // }
        ]
      },
      comingMovies: {
        comingMoviesNum: 0,
        moviesData: []
      },
      hotCinemaData: [
        {
          cinema_id: 1,
          cinema_name: '浙江新远国际影城（西湖文化广场店）',
          cinema_address: '江干区解放东路8号砂之船国际生活广场负一层天鹅街088号（地铁站“市民中心”L出口直行200米）'
        },
        {
          cinema_id: 2,
          cinema_name: '浙江新远国际影城（西湖文化广场店）',
          cinema_address: '江干区解放东路8号砂之船国际生活广场负一层天鹅街088号（地铁站“市民中心”L出口直行200米）'
        },
        {
          cinema_id: 3,
          cinema_name: '浙江新远国际影城（西湖文化广场店）',
          cinema_address: '江干区解放东路8号砂之船国际生活广场负一层天鹅街088号（地铁站“市民中心”L出口直行200米）'
        },
        {
          cinema_id: 3,
          cinema_name: '浙江新远国际影城（西湖文化广场店）',
          cinema_address: '江干区解放东路8号砂之船国际生活广场负一层天鹅街088号（地铁站“市民中心”L出口直行200米）'
        }
      ],
    }
  },
  methods: {
    hoverShowingImg(item,index) {
      this.showingMovies.moviesData[index].isHover = !this.showingMovies.moviesData[index].isHover
    },

    hoverComingImg(item,index) {
      this.comingMovies.moviesData[index].isHover = !this.comingMovies.moviesData[index].isHover
    },

    getAllShowingMoviesInfo() {
      const _this = this
      this.axios.get('http://127.0.0.1:8000/index/film_info_controller/getAllShowingMoviesInfo')
          .then(function (res){
            _this.showingMovies.showingMoviesNum = res.data.num
            _this.showingMovies.moviesData = res.data.moviesData
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    getAllComingMoviesInfo() {
      const _this = this
      this.axios.get('http://127.0.0.1:8000/index/film_info_controller/getAllComingMoviesInfo')
          .then(function (res){
            _this.comingMovies.comingMoviesNum = res.data.num
            _this.comingMovies.moviesData = res.data.moviesData
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    getFourHotCinemaInfo() {
      const _this = this
      this.axios.get('http://127.0.0.1:8000/index/cinema_info_controller/getFourHotCinemaInfo')
          .then(function (res){
            _this.hotCinemaData = res.data.cinemaData
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    showMoviesDetail(item) {
      const _this = this
      this.$router.push({
        path:'/movies_detail',
        query: {
          film_id: item.film_id
        }
      })
    },

    showCinemaDetail(item) {
      this.$router.push({
        path:'/cinema_detail',
        query: {
          cinema_id: item.cinema_id
        }
      })
    },

    handleTabClick(val) {
      this.$store.commit('saveTabName',val.name)
    }
  },
  created() {
    this.tabName = this.$store.state.tabName
    this.getAllShowingMoviesInfo()
    this.getAllComingMoviesInfo()
    this.getFourHotCinemaInfo()
  }
}
</script>

<style scoped>
>>> .el-tabs__item.is-active {
  color:red;
}
>>> .el-tabs__item {
  color:gray;
}
>>> .el-tabs__active-bar {
  background-color:red;
}
>>> .text_button {
  color: red;
}
.transition-box {
  position: absolute;
  z-index: 3;
  background-color:rgba(0, 0, 0, 0.6);
  height: 87%;
  width: 100%;
}
.transition-box p {
  position: absolute;
  z-index: 3;
  left: 15%;
  color: white;
  font-size: 12px;
}
.el-divider--horizontal{          /*修改分割线样式*/
  margin: 0px 0;
}
</style>