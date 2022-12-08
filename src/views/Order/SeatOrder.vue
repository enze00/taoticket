<template>
  <div class="seat_order">
    <!--        <div class="btn-wrapper">-->
    <!--          <div class="btn-buy" @click="buySeat">-->
    <!--            选定座位-->
    <!--          </div>-->
    <!--          <div class="btn-buy" @click="resetSeat">-->
    <!--            重置座位-->
    <!--          </div>-->
    <!--        </div>-->
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <el-row type="flex" justify="center" style="margin-top: 2%">
          <el-col :span="24">
            <el-steps :active="1" finish-status="success" align-center>
              <el-step title="选择影片,场次"></el-step>
              <el-step title="选座,填手机号"></el-step>
              <el-step title="确认订单,支付"></el-step>
              <el-step title="支付成功,影院取票观影"></el-step>
            </el-steps>
          </el-col>
        </el-row>
        <el-row style="margin-top: 2%;border:1px solid #E4E7ED ">
          <el-col :span="17">
            <el-row>
              <el-scrollbar :native="false" style="height: 500px;width: 100%" >
                <div class="seat-wrapper">
                  <div class="screen">
                    {{showInfo.cinema_name}} {{showInfo.hall_name}} 银幕
                  </div>
                  <div class="screen-center">
                    银幕中央
                    <div class="mid-line"></div>
                  </div>
                  <div class="inner-seat-wrapper" ref="innerSeatWrapper" >
                    <div v-for="row in seatRow">
                      <!--这里的v-if很重要，如果没有则会导致报错，因为seatArray初始状态为空-->
                      <div v-for="col in seatCol"
                           v-if="seatArray.length>0"
                           class="seat"
                           :style="{width:seatSize+'px',height:seatSize+'px'}">
                        <div class="inner-seat"
                             @click="handleChooseSeat(row-1,col-1)"
                             v-if="seatArray[row-1][col-1]!==-1"
                             :class="seatArray[row-1][col-1]===2?'bought-seat':(seatArray[row-1][col-1]===1?'selected-seat':'unselected-seat')">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </el-row>
            <el-row type="flex" justify="center" style="margin-top: 3%">
              <el-col :span="6">
                <div class="illustration-img-wrapper unselected-seat"></div>
                <span class="illustration-text">可选座位</span>
              </el-col>
              <el-col :span="6">
                <div class="illustration-img-wrapper selected-seat"></div>
                <span class="illustration-text">已选座位</span>
              </el-col>
              <el-col :span="6">
                <div class="illustration-img-wrapper bought-seat"></div>
                <span class="illustration-text">不可选座位</span>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" style="margin-top: 2%;margin-bottom: 2%">
              <el-col :span="10" :offset="1">
                本影厅共有座位 {{totalSeat}} 个,当前已售 {{saledSeat}} 个
              </el-col>
            </el-row>
          </el-col>
          <el-col style="background-color: rgba(255,221,220,0.6);height: 100%;width: 28%;margin-left: 1%;min-height: 600px">
            <el-row style="margin-top: 6%;">
              <el-col :span="9" offset="1">
                <el-image fit="fill" style="width: 90%;margin-left: 5%" :src="showInfo.url"></el-image>
              </el-col>
              <el-col :span="13" :offset="1" style="font-size: 14px">
                <el-row style="font-weight: bolder">
                  {{showInfo.film_name}}
                </el-row>
                <el-row style="margin-top: 10%">
                  语言: {{showInfo.language}}
                </el-row>
                <el-row style="margin-top: 10%">
                  片长: {{showInfo.film_length}}分钟
                </el-row>
              </el-col>
            </el-row>
            <el-row style="margin-top: 8%">
              <el-col :span="3" :offset="1" style="font-size: 14px;color: #888888;margin-top: 0.5%">
                影院:
              </el-col>
              <el-col :span="19" :offset="1" style="font-size: 16px;font-weight: bolder">
                {{showInfo.cinema_name.substr(0,12)}}{{showInfo.cinema_name.length > 12 ? '...' : ''}}
              </el-col>
            </el-row>
            <el-row style="margin-top: 6%">
              <el-col :span="3" :offset="1" style="font-size: 14px;color: #888888;margin-top: 0.5%">
                影厅:
              </el-col>
              <el-col :span="19" :offset="1" style="font-size: 16px;font-weight: bolder">
                {{showInfo.hall_name}}
              </el-col>
            </el-row>
            <el-row style="margin-top: 6%">
              <el-col :span="3" :offset="1" style="font-size: 14px;color: #888888;margin-top: 0.5%">
                场次:
              </el-col>
              <el-col :span="11" :offset="1" style="font-size: 16px;font-weight: bolder;color: red">
                {{showInfo.film_date.substr(5,2)}}月{{showInfo.film_date.substr(8,2)}}日 {{showInfo.film_time.substr(0,5)}}
              </el-col>
              <el-col :span="6" :offset="2">
                <el-button class="text_button" type="text" @click="handleClickChangeTimes">更换场次</el-button>
              </el-col>
            </el-row>
            <el-row style="margin-top: 6%">
              <el-col :span="3" :offset="1" style="font-size: 14px;color: #888888;margin-top: 0.5%">
                座位:
              </el-col>
              <el-col :span="19" :offset="1" style="font-size: 16px;font-weight: bolder">
                <el-tag
                    style="margin-left: 2%;margin-top: 2%"
                    v-for="(item,index) in orderForm.chooseSeatArray"
                    :key="index"
                    type="danger"
                    effect="plain">
                  {{item.split(',')[0]}}排{{item.split(',')[1]}}座
                </el-tag>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span="3" :offset="1" style="font-size: 14px;color: #888888;margin-top: 0.5%">
                原价:
              </el-col>
              <el-col :span="8" :offset="1" style="font-size: 14px;color: #888888;margin-top: 0.5%">
                ￥{{showInfo.film_price}} x {{orderForm.chooseSeat}}
              </el-col>
              <el-col :span="5" :offset="6" style="font-size: 14px;color: red;margin-top: 0.5%;font-weight: bolder">
                 {{orderForm.totalPrice}}
              </el-col>
            </el-row>
            <el-row style="margin-top: 6%">
              <el-col :span="3" :offset="1" style="font-size: 14px;color: #888888;margin-top: 0.5%">
                总计:
              </el-col>
              <el-col :span="19" :offset="1" style="font-size: 14px;color: red;margin-top: 0.5%;font-weight: bolder">
                ￥{{orderForm.totalPrice}}
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span="23" :offset="1" style="font-size: 14px;margin-top: 0.5%">
                接收电子码的手机号(11位)
              </el-col>
            </el-row>
            <el-row style="margin-top: 6%">
              <el-col :span="18" :offset="1">
                <el-input v-model="orderForm.telephone"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 6%">
              <el-col :span="12" :offset="1">
                <el-button type="danger" style="width: 100%" @click="toPayOrder">确认信息,下单</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogTableVisible">
      <span slot="title" style="color: #ff0000;font-size: 20px;font-weight: bolder;">
        {{showInfo.film_date.substr(5,2)}}月{{showInfo.film_date.substr(8,2)}}日
      </span>
      <el-scrollbar :native="false" style="height: 400px;max-width: 100%">
        <el-table
            :data="filmTimesData"
            style="width: 100%;min-height: 200px"
            stripe
            empty-text>
          <el-table-column
              align="center"
              header-align="center"
              label="放映时间"
              width="130">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="24" style="font-size: 20px;font-weight: bolder">
                  {{scope.row.film_time.substr(0,5)}}
                </el-col>
              </el-row>
              <el-row style="margin-top: 2%">
                <el-col :span="24" style="font-size: 12px;">
                  预计{{scope.row.film_time.substr(6,5)}}散场
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
              align="center"
              header-align="center"
              label="语言版本"
              width="120"
              property="language"
          >
          </el-table-column>
          <el-table-column
              align="center"
              header-align="center"
              label="放映厅"
              width="120"
              property="hall_name"
          >
          </el-table-column>
          <el-table-column
              align="center"
              header-align="center"
              label="现价/影院价(元)"
              width="145">
            <template slot-scope="scope">
              <el-row>
                <el-col style="font-size: 18px;font-weight: bolder;color: red;">
                  {{scope.row.film_price}}
                </el-col>
                <el-col style="font-size: 12px;color: #888888;text-decoration: line-through;">
                  {{scope.row.film_price}}
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
              align="center"
              header-align="center"
              label="选座购票"
              width="140"
          >
            <template slot-scope="scope">
              <el-button
                  fixed="right"
                  size="small"
                  @click="toBuyTicket(scope.row)"
                  icon="el-icon-document"
                  type="danger">
                选座购票
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "SeatOrder",
    data(){
      return{
        //影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
        seatArray:[],
        //影院座位行数
        seatRow: 0,
        //影院座位列数
        seatCol: 0,
        //座位尺寸
        seatSize:'',
        //推荐选座最大数量
        smartChooseMaxNum:5,
        seatInfo: '',
        saledSeat: 0,
        totalSeat: 0,
        orderForm: {
          chooseSeat: 0,
          totalPrice: 0,
          telephone: '',
          chooseSeatArray:[]
        },
        showInfo: {
          // "film_price": 35.5,
          // "film_date": "2021-06-11",
          // "film_time": "12:45-15:07",
          // "cinema_name": "杭州比高电影城（大河店）",
          // "hall_name": "1号厅",
          // "url": "https://img.alicdn.com/bao/uploaded/i3/O1CN017CI2oC1gRhzNpwOY1_!!6000000004139-0-alipicbeacon.jpg_300x300.jpg",
          // "film_name": "速度与激情9",
          // "language": "英语",
          // "film_length": 142,
          // "cinema_id": 2,
          // "film_id": 2
        },
        filmTimesData: [
        ],
        dialogTableVisible: false
      }
    },
    methods:{
      //处理座位选择逻辑
      handleChooseSeat(row,col){
        let seatValue = this.seatArray[row][col];
        let newArray = this.seatArray;
        //如果是已购座位，直接返回
        if(seatValue===2) return
        //如果是已选座位点击后变未选
        if(seatValue === 1){
          newArray[row][col]=0
          let arr = row+","+col
          const index = this.orderForm.chooseSeatArray.indexOf(arr)
          if (index > -1) {
            this.orderForm.chooseSeatArray.splice(index, 1)
            this.orderForm.chooseSeat = this.orderForm.chooseSeatArray.length
            this.orderForm.totalPrice = this.orderForm.chooseSeat * this.showInfo.film_price
          }
        }else if(seatValue === 0){
          if (this.orderForm.chooseSeatArray.length>=5){   //一人不能买超过5张票
            this.$message.error('最多可选择5个座位');
          }else {
            newArray[row][col]=1
            let arr = row+","+col
            this.orderForm.chooseSeatArray.push(arr)
            this.orderForm.chooseSeat = this.orderForm.chooseSeatArray.length
            this.orderForm.totalPrice = this.orderForm.chooseSeat * this.showInfo.film_price
          }
        }
        //必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
        this.seatArray = newArray.slice();
      },
      //初始座位数组
      initSeatArray(){
        let seatArray = Array(this.seatRow).fill(0).map(()=>Array(this.seatCol).fill(0));
        this.seatArray = seatArray;
        this.seatSize = this.$refs.innerSeatWrapper
            ? parseInt(parseInt(window.getComputedStyle(this.$refs.innerSeatWrapper).width,10) / this.seatCol,10)
            :0;
        //初始化不是座位的地方
        this.initNonSeatPlace();
      },
      //初始化不是座位的地方
      initNonSeatPlace(){
        for(let i=0;i<9;i++){
          this.seatArray[i][0]=-1;
        }
        for(let i=0;i<8;i++){
          this.seatArray[i][this.seatArray[0].length-1]=-1;
          this.seatArray[i][this.seatArray[0].length-2]=-1;
        }
        for(let i=0;i<9;i++){
          this.seatArray[i][this.seatArray[0].length-3]=-1;
        }
        for(let i=0;i<this.seatArray[0].length;i++){
          this.seatArray[2][i]=-1;
        }
        console.log(this.seatArray);
      },

      initSeatArrayInfo() {
        const _this = this
        this.axios.get('http://127.0.0.1:8000/index/hall_info_controller/initSeatArrayInfo?film_times_id='+_this.$route.query.film_times_id)
            .then(function (res){
              _this.seatInfo = res.data.seatInfo.split(',')
              for (let i = 0; i < _this.seatInfo.length; i++) {
                var arr=_this.seatInfo[i].split("")
                _this.seatInfo[i] = arr
              }
              for(let i = 0; i < _this.seatInfo.length; i++) {
                for (let j = 0; j < _this.seatInfo[i].length; j++) {
                  if (_this.seatInfo[i][j] == 'x') {
                    _this.seatInfo[i][j] = -1
                  }else if (_this.seatInfo[i][j] == 'b') {
                    _this.seatInfo[i][j] = 2
                    _this.saledSeat += 1
                    _this.totalSeat += 1
                  }else {
                    _this.seatInfo[i][j] = 0
                    _this.totalSeat += 1
                  }
                }
              }
              _this.seatArray = _this.seatInfo
              _this.loadSaledSeatArrayInfo()
              _this.seatRow = _this.seatArray.length
              _this.seatCol = _this.seatArray[0].length
              //console.log(_this.seatArray);
              //_this.seatInfo = res.data.seatInfo
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      loadSaledSeatArrayInfo() {
        const _this = this
        this.axios.get('http://127.0.0.1:8000/index/hall_info_controller/loadSaledSeatArrayInfo?film_times_id='+_this.$route.query.film_times_id)
            .then(function (res){
              //console.log(res.data.saledSeatInfo);
              const saledSeatInfo = res.data.saledSeatInfo
              for (let i = 0; i < saledSeatInfo.length; i++,_this.saledSeat++) {
                _this.seatArray[saledSeatInfo[i].pos_x][saledSeatInfo[i].pos_y] = 2
              }
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
        this.axios.get('http://127.0.0.1:8000/index/hall_info_controller/loadTempSaledSeatArrayInfo?film_times_id='+_this.$route.query.film_times_id)
            .then(function (res){
              //console.log(res.data.saledSeatInfo);
              const saledSeatInfo = res.data.saledSeatInfo
              for (let i = 0; i < saledSeatInfo.length; i++,_this.saledSeat++) {
                _this.seatArray[saledSeatInfo[i].pos_x][saledSeatInfo[i].pos_y] = 2
              }
              _this.seatSize = _this.$refs.innerSeatWrapper
                  ? parseInt(parseInt(window.getComputedStyle(_this.$refs.innerSeatWrapper).width,10) / _this.seatCol,10)
                  :0;
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });

      },

      loadAHallShowInfo() {
        const _this = this
        this.axios.get('http://127.0.0.1:8000/index/hall_info_controller/getAHallShowInfo?film_times_id='+_this.$route.query.film_times_id)
            .then(function (res){
              _this.showInfo = res.data.showInfo
              //console.log(_this.showInfo);
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      handleClickChangeTimes() {
        this.dialogTableVisible = true
        const _this = this
        this.axios.get('http://127.0.0.1:8000/index/hall_info_controller/getADateFilmTimes?cinema_id='+_this.showInfo.cinema_id+'&film_id='+_this.showInfo.film_id + '&film_date=' + _this.showInfo.film_date)
            .then(function (res){
              _this.filmTimesData = res.data.filmTimesData
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      toBuyTicket(row) {
        //console.log(row);
        this.$router.push({
          path:'/seat_order_temp',
          query: {
            film_times_id: row.film_times_id
          }
        })
      },

      toPayOrder() {
        if (this.orderForm.chooseSeatArray.length > 0){
          //console.log(JSON.stringify(this.orderForm.chooseSeatArray));
          this.$store.commit('saveShowInfo',JSON.stringify(this.showInfo))

          const _this = this
          this.axios.post('http://127.0.0.1:8000/index/order_info_controller/addTempOrderInfo?seat_array='+JSON.stringify(_this.orderForm.chooseSeatArray)+"&film_times_id="+_this.$route.query.film_times_id)
              .then(function (res){
                //console.log(res.data)
                if (res.data.order_temp_id.length > 0){
                  window.sessionStorage.setItem('order_temp_id',JSON.stringify(res.data.order_temp_id))
                  _this.$router.push({
                    path:'/pay_order',
                    query: {
                      telephone: _this.orderForm.telephone,
                      film_times_id: _this.$route.query.film_times_id,
                      actual_money: _this.orderForm.totalPrice,
                      order_temp_id: JSON.stringify(res.data.order_temp_id),
                      seat_array:JSON.stringify(_this.orderForm.chooseSeatArray)
                    }
                  })
                }
              })
              .catch(function (err) {  //当请求出现错误时的回调函数
                console.log(err);
              });
          //console.log(_this.orderForm.chooseSeatArray)

        }else {
          this.$message.error('您未选择座位');
        }
      }
    },
    mounted:function(){
      //this.initSeatArray(10,20)
      this.initSeatArrayInfo()
      //console.log(this.orderForm.telephone);
    },
    created() {
      this.loadAHallShowInfo()
      this.orderForm = {
        chooseSeat: 0,
        totalPrice: 0,
        telephone: window.localStorage.getItem('telephone'),
        chooseSeatArray:[]
      }
      //console.log(this.$route.query.film_times_id);
    }
  }
</script>

<style scoped>
.seat-wrapper{
  height:700px;
  width:1000px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}
.screen{
  margin: 0 auto;
  height:30px;
  width:500px;
  background-color: #e3e3e3;
  border-radius: 0 0 30px 30px;
  color: #585858;
  line-height: 30px;
  text-align: center;
}
.inner-seat-wrapper{
  position: absolute;
  top:120px;
  bottom:0;
  width:100%;
  box-sizing: border-box;
}
.seat{
  float:left;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner-seat{
  width:80%;
  height:80%;
  cursor: pointer;
}
.selected-seat{
  background: url('../../assets/seat_green.png') center center no-repeat;
  background-size: 100% 100%;
}
.unselected-seat{
  background: url('../../assets/seat_gray.png') center center no-repeat;
  background-size: 100% 100%;
}
.bought-seat{
  background: url('../../assets/seat_red.png') center center no-repeat;
  background-size: 100% 100%;
}
.screen-center{
  position: absolute;
  left:50%;
  transform: translateX(-50%);
  padding:5px;
  font-size: 13px;
  border-radius: 5px;
  top:50px;
  background-color: #f6f6f6;
  color: #636363;
  border:1px solid #b1b1b1;
}
.mid-line{
  position: absolute;
  left:50%;
  transform: translateX(-50%);
  top:100%;
  width:1px;
  height:800px;
  border-left:1px dashed #919191;
}
.btn-wrapper{
  margin: 20px auto;
  width:1000px;
  height:30px;
  text-align: center;
}
.btn-buy{
  height:100%;
  line-height: 30px;
  font-size: 14px;
  border-radius: 5px;
  padding:0 5px;
  background-color: #ffa349;
  color: #ffffff;
  display: inline-block;
  cursor: pointer;
  margin-right: 10px;
}
.smart{
  background-color: #39ac6a;
}
.illustration{
  position: absolute;
  left:0;
  top:0;
  height:35px;
  width:300px;
}
.illustration-img-wrapper{
  width:25px;
  height:25px;
  position: relative;
  top:50%;
  display: inline-block;
  transform: translateY(-50%);
  margin-left: 10px;
}
.illustration-text{
  display: inline-block;
  height:100%;
  line-height: 35px;
  font-size: 14px;
  position: relative;
  top:-2px;
}
>>> .text_button {
  color: red;
  padding: 0px;
}
.el-divider--horizontal{          /*修改分割线样式*/
  margin: 14px 0;
}
>>>.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>