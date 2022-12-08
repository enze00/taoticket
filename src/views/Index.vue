<template>
  <div class="index">
    <el-divider></el-divider>
    <el-row type="flex" justify="center">
      <el-col :span="22">
        <el-carousel :interval="5000" arrow="always" height="500px;">
          <el-carousel-item v-for="item in imgs" :key="item">
            <el-image
                style="width: 1360px; height: 500px"
                :src="item"
                fit="cover">
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-tabs
            v-model="tabName"
            style="margin-top: 2%"
            @tab-click="handleTabClick"
        >
          <el-tab-pane :label="'正在热映('+this.showingMovies.showingMoviesNum+')'" name="now_showing">
            <el-col :span="5" v-for="(item, index) in showingMovies.moviesData" :key="index" :offset="1">
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
            <el-col :span="5" v-for="(item, index) in comingMovies.moviesData" :key="index" :offset="1">
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
      <el-col :span="1">
        <div style="margin-top: 40%">
          <el-button class="text_button" type="text" @click="$router.push('/movies_info')">查看全部<i class="el-icon-arrow-right"></i></el-button>
        </div>
      </el-col>
    </el-row>
    <el-row style="height: 30px">
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-image
          :src="index1"
          fit="fill"
        >
        </el-image>
      </el-col>
    </el-row>
    <el-row style="height: 30px">
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="5" style="min-height: 300px">
        <span style="padding: 0px">上周票房排名</span>
        <el-button style="margin-left: 42%" class="text_button" type="text" @click="$router.push('/movies_info')">全部影片<i class="el-icon-arrow-right"></i></el-button>
        <el-divider></el-divider>
        <el-collapse :accordion="true" v-model="boxOfficeRank.boxOfficeNames" @change="handleBoxOfficeChange" >
          <el-collapse-item v-for="(item,index) in boxOfficeRank.rankData" :key="index" :name="item.name">
            <template slot="title">
              <el-image :src="rankIcons[index]" style="width: 15px; height: 15px"/>{{item.film_name}}
            </template>
            <el-row>
              <el-col :span="15">
                <el-image
                    :src="item.url"
                >
                </el-image>
              </el-col>
              <el-col :span="5">
                <el-row>
                  <span style="color: red;font-weight: bold">{{item.score}}</span>
                </el-row>
                <el-row style="margin-top: 20%">
                  <el-button type="danger" @click="showMoviesDetail(item)">选座购票</el-button>
                </el-row>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="5" :offset="1">
        <span style="padding: 0px">热门影院排行</span>
        <el-button style="margin-left: 42%" class="text_button" type="text" @click="$router.push('/cinema_info')">全部影院<i class="el-icon-arrow-right"></i></el-button>
        <el-divider></el-divider>
        <div v-for="(item,index) in cinemaRank.rankData" :key="index" style="border-bottom:1px solid #E4E7ED;height: 14%;min-height: 60px">
          <div @mouseleave="item.isHover = false" v-show="item.isHover">
            <el-row>
              <el-col :span="19">
                <el-row style="margin-top: 4%">
                  <el-col :span="2">
                    <el-image :src="rankIcons[index]" style="width: 15px; height: 15px"/>
                  </el-col>
                  <el-col :span="20">
                    <div>{{item.cinema_name.substr(0,11)}}{{item.cinema_name.length>11?"...":""}}</div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col style="margin-top: 2%" :span="20" :offset="2">
                    <div style="font-size: 12px;color: #888888">{{item.cinema_address.substr(0,15)}}{{item.cinema_address.length>15?"...":""}}</div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="1" style="margin-top: 5%">
                <el-button type="danger" style="font-size: 12px" size="mini" @click="showCinemaDetail(item)">选座</el-button>
              </el-col>
            </el-row>
          </div>
          <div @mouseover="item.isHover = true" v-show="!item.isHover">
            <el-row>
              <el-col :span="24">
                <el-row style="margin-top: 4%">
                  <el-col :span="2">
                    <el-image :src="rankIcons[index]" style="width: 15px; height: 15px"/>
                  </el-col>
                  <el-col :span="20">
                    <div>{{item.cinema_name.substr(0,14)}}{{item.cinema_name.length>14?"...":""}}</div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col style="margin-top: 2%" :span="20" :offset="2">
                    <div style="font-size: 12px;color: #888888">{{item.cinema_address.substr(0,15)}}{{item.cinema_address.length>15?"...":""}}</div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="5" :offset="1">
        <span style="padding: 0px">热门预告片</span>
        <el-button style="margin-left: 60%;" class="text_button" type="text" @click="$router.push('/cinema_info')"><i style="font-size: 16px" class="el-icon-video-camera-solid"></i></el-button>
        <el-divider></el-divider>
        <el-col v-for="(item,index) in hotPreview.previewData" :key="index" :span="10" style="margin-top: 4%;margin-left: 5%">
          <el-image :src="item.url" fit="fill" style="width: 100%"></el-image>
          <div style="font-size: 12px">{{item.film_name}}</div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MenuBar from "@/components/MenuBar";
import ad1 from "@/assets/ad1.jpg";
import ad2 from "@/assets/ad2.jpg";
import index1 from "@/assets/index1.png"
import rank_icon_1 from "@/assets/rank/rank_icon_1.png"
import rank_icon_2 from "@/assets/rank/rank_icon_2.png"
import rank_icon_3 from "@/assets/rank/rank_icon_3.png"
import rank_icon_4 from "@/assets/rank/rank_icon_4.png"
import rank_icon_5 from "@/assets/rank/rank_icon_5.png"
  export default {
    name: "Index",
    data(){
      return{
        imgs: ['//gw.alicdn.com/tfs/TB1GRxRfZLJ8KJjy0FnXXcFDpXa-1920-360.jpg',
          '//gw.alicdn.com/tfs/TB1GRxRfZLJ8KJjy0FnXXcFDpXa-1920-360.jpg',
          '//gw.alicdn.com/tfs/TB1GRxRfZLJ8KJjy0FnXXcFDpXa-1920-360.jpg',
          ad2],
        rankIcons: [rank_icon_1,rank_icon_2,rank_icon_3,rank_icon_4,rank_icon_5],
        index1,
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
        boxOfficeRank: {
          boxOfficeNames: 0,
          rankData: [
            {
              film_id: 1,
              film_name: '寂静之地2',
              score: 7.7,
              name: 0,
              url: 'https://img.alicdn.com/bao/uploaded/i1/TB1hYOsq7L0gK0jSZFAXXcA9pXa_.jpg_160x160.jpg'
            },
            {
              film_id: 2,
              film_name: '寂静之地2',
              score: 7.7,
              name: 1,
              url: 'https://img.alicdn.com/bao/uploaded/i1/TB1hYOsq7L0gK0jSZFAXXcA9pXa_.jpg_160x160.jpg'
            },
            {
              film_id: 3,
              film_name: '寂静之地2',
              score: 7.7,
              name: 2,
              url: 'https://img.alicdn.com/bao/uploaded/i1/TB1hYOsq7L0gK0jSZFAXXcA9pXa_.jpg_160x160.jpg'
            },
            {
              film_id: 4,
              film_name: '寂静之地2',
              score: 7.7,
              name: 3,
              url: 'https://img.alicdn.com/bao/uploaded/i1/TB1hYOsq7L0gK0jSZFAXXcA9pXa_.jpg_160x160.jpg'
            },
            {
              film_id: 5,
              film_name: '寂静之地2',
              score: 7.7,
              name: 4,
              url: 'https://img.alicdn.com/bao/uploaded/i1/TB1hYOsq7L0gK0jSZFAXXcA9pXa_.jpg_160x160.jpg'
            }
          ]
        },
        cinemaRank: {
          rankData: []
        },
        hotPreview: {
          previewData: [
            {
              url: 'https://img.alicdn.com/bao/uploaded/O1CN01eyA6sH1ag0fk3kObu_!!6000000003358-0-tbvideo.jpg_100x100.jpg',
              film_name: '寂静之地2'
            },
            {
              url: 'https://img.alicdn.com/bao/uploaded/O1CN01gYaNkt1gKNezv7OgT_!!6000000004123-0-tbvideo.jpg_100x100.jpg',
              film_name: '速度与激情9'
            },
            {
              url: 'https://img.alicdn.com/bao/uploaded/O1CN01PpCOU01SzEMf9Jg4F_!!6000000002317-0-tbvideo.jpg_100x100.jpg',
              film_name: '哆啦A梦：伴我同行2'
            },
            {
              url: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Qa8I7d1n0PhmBc1b7_!!6000000005027-0-alipicbeacon.jpg_100x100.jpg',
              film_name: '黑白魔女库伊拉'
            },
          ]
        }
      }
    },
    methods:{
      hoverShowingImg(item,index) {
        this.showingMovies.moviesData[index].isHover = !this.showingMovies.moviesData[index].isHover
      },

      hoverComingImg(item,index) {
        this.comingMovies.moviesData[index].isHover = !this.comingMovies.moviesData[index].isHover
      },

      getSortedMoviesInfo() {
        const _this = this
        this.axios.get('http://127.0.0.1:8000/index/film_info_controller/getSortedMoviesInfo')
            .then(function (res){
              _this.boxOfficeRank.rankData = res.data.filmList
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      getFourShowingMoviesInfo() {
        const _this = this
        this.axios.get('http://127.0.0.1:8000/index/film_info_controller/getFourShowingMoviesInfo')
            .then(function (res){
              _this.showingMovies.showingMoviesNum = res.data.num
              _this.showingMovies.moviesData = res.data.moviesData
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      getFourComingMoviesInfo() {
        const _this = this
        this.axios.get('http://127.0.0.1:8000/index/film_info_controller/getFourComingMoviesInfo')
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
        this.axios.post('http://127.0.0.1:8000/index/cinema_info_controller/getFourHotCinemaInfo')
            .then(function (res){
              _this.cinemaRank.rankData = res.data.cinemaData
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      handleBoxOfficeChange() {

      },

      showMoviesDetail(item) {
        const _this = this
        this.$router.push({
          path:'/movies_detail',
          query: {
            film_id: item.film_id,
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

      // leaveImg(item,index) {
      //   this.showingMovies.moviesData[index].isHover = false
      // }
    },
    components:{
      MenuBar
    },
    created() {
      this.tabName = this.$store.state.tabName
      this.getSortedMoviesInfo()
      this.getFourShowingMoviesInfo()
      this.getFourComingMoviesInfo()
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