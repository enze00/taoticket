<template>
  <div class="pay_order">
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <el-row type="flex" justify="center" style="margin-top: 2%">
          <el-col :span="24">
            <el-steps :active="acticeNum" finish-status="success" align-center>
              <el-step title="选择影片,场次"></el-step>
              <el-step title="选座,填手机号"></el-step>
              <el-step title="确认订单,支付"></el-step>
              <el-step title="支付成功,影院取票观影"></el-step>
            </el-steps>
          </el-col>
        </el-row>
        <el-row style="background-color: rgba(255,221,220,0.6);height: 120px;width: 100%;margin-top: 2%">
          <el-col :span="16" style="color: red;font-size: 18px;font-weight: bolder;margin-left: 2%;margin-top: 4%">
            请您确认您的订单信息，并请在15分钟内完成付款，如超时系统将自动释放已选座位。
          </el-col>
          <el-col :span="2" :offset="2" style="font-size: 20px;font-weight: bolder">
            <el-image :src="hourglass" style="width: 70%;margin-top: 30%"></el-image>
          </el-col>
          <el-col :span="3">
            <el-row style="font-size: 14px;margin-top: 23%">
              剩余支付时间
            </el-row>
            <el-row style="font-size: 30px;font-weight: bolder;color: red;margin-top: 4%">
              {{min}}:{{sec}}
            </el-row>
          </el-col>
        </el-row>
        <el-row style="border:2px solid #E4E7ED">
          <el-col :span="6" style="height: 270px;border-right:2px solid #E4E7ED">
            <el-row style="background-color: rgba(247,247,247,1);border-bottom:2px solid #E4E7ED;height: 20%;">
              <div style="margin-left: 45%;margin-top: 5%">电影</div>
            </el-row>
            <el-row>
              <el-col :span="9":offset="2" style="margin-top: 12%">
                <el-image :src="showInfo.url"></el-image>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-row style="font-size: 14px;font-weight: bolder;margin-top: 26%">
                  {{showInfo.film_name.substr(0,7)}}{{showInfo.film_name.length > 7 ? '...' : ''}}
                </el-row>
                <el-row style="font-size: 12px;color: #888888;margin-top: 12%">
                  语言: {{showInfo.language}}
                </el-row>
                <el-row style="font-size: 12px;color: #888888;margin-top: 12%">
                  片长: {{showInfo.film_length}}分钟
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5" style="height: 270px;border-right:2px solid #E4E7ED">
            <el-row style="background-color: rgba(247,247,247,1);border-bottom:2px solid #E4E7ED;height: 20%">
              <div style="margin-left: 43%;margin-top: 6%">场次</div>
            </el-row>
            <el-row type="flex" justify="center" style="font-size: 14px;margin-top: 22%">
              <el-col :span="19">
                {{showInfo.cinema_name.substr(0,11)}}{{showInfo.cinema_name.length > 11 ? '...' : ''}}
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" style="font-size: 14px;margin-top: 12%">
              <el-col :span="5">
                {{showInfo.hall_name}}
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" style="font-size: 14px;margin-top: 12%;color: red">
              <el-col :span="11">
                {{showInfo.film_date.substr(5,2)}}月{{showInfo.film_date.substr(8,2)}}日{{showInfo.film_time.substr(6,5)}}
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4" style="height: 270px;border-right:2px solid #E4E7ED">
            <el-row style="background-color: rgba(247,247,247,1);border-bottom:2px solid #E4E7ED;height: 20%">
              <div style="margin-left: 30%;margin-top: 8%">票数/座位</div>
            </el-row>
            <el-row type="flex" justify="center" style="font-size: 16px;margin-top: 10%">
              <el-col :span="4">
                {{JSON.parse($route.query.order_temp_id).length}}张
              </el-col>
            </el-row>
            <el-row  type="flex" justify="center" style="font-size: 16px;margin-top: 7%">
              <el-col :span="8">
                <el-tag
                    v-for="(item,index) in JSON.parse($route.query.seat_array)"
                    style="margin-top: 2%"
                    :key="index"
                    type="danger"
                    effect="plain">
                  {{item.split(',')[0]}}排{{item.split(',')[1]}}座
                </el-tag>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4" style="height: 270px;border-right:2px solid #E4E7ED">
            <el-row style="background-color: rgba(247,247,247,1);border-bottom:2px solid #E4E7ED;height: 20%">
              <div style="margin-left: 30%;margin-top: 8%">金额小计</div>
            </el-row>
            <el-row type="flex" justify="center" style="font-size: 26px;margin-top: 45%;font-weight: bolder;color: red">
              <el-col :span="12">
                ￥{{$route.query.actual_money}}
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5" style="height: 270px;">
            <el-row style="background-color: rgba(247,247,247,1);border-bottom:2px solid #E4E7ED;height: 20%">
              <div style="margin-left: 15%;margin-top: 7%">接收电子码的电话号码</div>
            </el-row>
            <el-row type="flex" justify="center" style="font-size: 20px;margin-top: 20%;font-weight: bolder;">
              <el-col :span="15">
                {{telephone}}
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" style="font-size: 13px;margin-top: 7%;color: #888888">
              <el-col :span="22">
                1.短信可能会被手机软件拦截，请到软件中查找短信
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" style="font-size: 13px;margin-top: 7%;color: #888888">
              <el-col :span="22">
                2.若要修改手机号，需要您重新下单
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-col :span="2"  style="margin-top: 3%;font-size: 14px;color: #888888">
            实付款:
          </el-col>
          <el-col :span="2" style="margin-top: 2%;font-size: 26px;font-weight: bolder;color: red">
            ￥{{$route.query.actual_money}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5" :offset="19" style="margin-top: 2%">
            <el-button type="danger" style="width: 100%" @click="handleConfirmClick">确认订单，立即支付</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog
        title="淘票票"
        :visible.sync="dialogVisible"
        width="30%"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        top="25vh"
        >
      <span>由于您未及时付款，您之前选择的座位已失效。</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="danger" @click="handleClickReselect">重新选择座位</el-button>
    <el-button @click="handleClickBackIndex">回淘票票首页</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import hourglass from "@/assets/hourglass.png"
export default {
  name: "PayOrder",
  data() {
    return {
      acticeNum:2,
      showInfo: {},
      hourglass,
      min:0,
      sec:0,
      now:0,
      end:0,
      dialogVisible:false,
      telephone: '',
      countFlag: false
    }
  },
  methods: {
    getEndTime() {
      const local_end = window.localStorage.getItem('local_end')
      if (local_end - Date.parse(new Date()) > 0){
        this.end =  window.localStorage.getItem('local_end')
      }else {
        this.end = Date.parse(new Date())+10000
        window.localStorage.setItem('local_end',this.end)
      }
      this.countdown()
    },

    countdown() {
      const end = this.end
      const now = Date.parse(new Date())
      const msec = end - now

      //console.log(msec)
      if(msec<0) return;

      let day = parseInt(msec / 1000 / 60 / 60 / 24)
      let hr = parseInt(msec / 1000 / 60 / 60 % 24)
      let min = parseInt(msec / 1000 / 60 % 60)
      let sec = parseInt(msec / 1000 % 60)
      this.day = day
      this.hr = hr > 9 ? hr : '0' + hr
      this.min = min > 9 ? min : '0' + min
      this.sec = sec > 9 ? sec : '0' + sec
      const that = this

      if(that.countFlag) return;

      if(min>=0 && sec>=0){
        //倒计时结束关闭订单
        if(min==0 && sec==0){
          that.removeTempOrderSeat()
          that.$message({
            showClose: true,
            message: '已释放选座位',
            type: 'warning'
          });
          return
        }
        setTimeout(function () {
          that.countdown()
        }, 1000)
      }
    },

    handleClickReselect() {
      this.dialogVisible = false
      const _this = this
      this.$router.push({
        path:'/seat_order',
        query: {
          film_times_id: _this.$route.query.film_times_id
        }
      })
    },

    handleClickBackIndex() {
      this.dialogVisible = false
      this.$router.push({
        path:'/index'
      })
    },

    removeTempOrderSeat() {
      const _this = this
      this.axios.get('http://127.0.0.1:8000/index/order_info_controller/removeTempOrderInfo?order_temp_id_array='+window.sessionStorage.getItem('order_temp_id'))
          .then(function (res){
            //console.log(res);
            _this.dialogVisible = true

          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    handleConfirmClick() {
      const _this = this
      this.axios.get('http://127.0.0.1:8000/index/order_info_controller/addOrderInfo?telephone='+_this.telephone+"&actual_money="+_this.showInfo.film_price+
      "&film_times_id="+_this.$route.query.film_times_id+"&seat_array="+_this.$route.query.seat_array)
          .then(function (res){
            //console.log(res);
            _this.countFlag = true
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
      this.axios.get('http://127.0.0.1:8000/index/order_info_controller/removeTempOrderInfo?order_temp_id_array='+_this.$route.query.order_temp_id)
          .then(function (res){
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
      _this.acticeNum = 3
      _this.$notify({
        title: '成功',
        message: '购票成功！',
        type: 'success'
      });
      window.sessionStorage.removeItem('order_temp_id')
      window.localStorage.removeItem('local_end')
      setTimeout(function () {
        _this.$router.push('/index')
      },1000)
    }
  },
  mounted() {

  },
  created() {
    this.acticeNum = 2
    this.showInfo = JSON.parse(window.localStorage.getItem('showInfo'))
    this.getEndTime()
    this.telephone = window.localStorage.getItem('telephone')
    //console.log(JSON.parse(window.localStorage.getItem('showInfo')))
    //console.log(JSON.parse(_this.$route.query.order_temp_id))
  }
}
</script>

<style scoped>

</style>