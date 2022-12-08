<template>
  <div class="login">
    <div class="frame">
      <el-row type="flex" justify="center">
        <el-col class="login_frame" :span="11">
          <el-row type="flex" justify="center">
            <el-col :span="20">
              <el-tabs
                  v-model="tabName"
                  :stretch="true"
                  style="margin-top: 2%"
              >
                <el-tab-pane label="账号密码登录" name="login_pwd">
                  <el-form :model="pwdForm" status-icon :rules="rules" ref="pwdForm" label-width="100px">
                    <el-row>
                      <el-col :span="16" style="margin-top: 8%; margin-left: 7%">
                        <el-form-item label="账号" prop="telephone">
                          <el-input v-model="pwdForm.telephone" maxlength="11" show-word-limit></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="16" style="margin-top: 5%; margin-left: 7%">
                        <el-form-item label="密码" prop="password">
                          <el-input v-model="pwdForm.password" show-password></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                      <el-col :span="16" style="margin-top: 7%; margin-left: 4%">
                        <el-form-item>
                          <el-button type="primary" @click="login()">登录</el-button>
                          <el-button @click="resetForm('pwdForm')">重置</el-button>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="手机验证码登录" name="login_note">

                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return{
        tabName: 'login_pwd',
        pwdForm: {
          telephone: '',
          password: ''
        },
        rules: {
          telephone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, message: '请正确输入手机号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
      }
    },
    methods:{
      login(){
        if (this.tabName ==='login_pwd'){
          this.$refs['pwdForm'].validate(valid => {
            if(valid){
              //console.log("pwd login successful")
              this.login_pwd();
            }
          });
        }
        else if(this.tabName ==='login_note'){
          this.$refs.note_loginForm.validate(valid => {
            if(valid){
              // console.log("note login successful")
              this.login_note();
            }
          });
        }
      },
      login_pwd() {
        const _this = this;
        this.axios.post('http://127.0.0.1:8000/index/user_info_controller/checkLogin_pwd',this.$qs.stringify({telephone:this.pwdForm.telephone,password:this.pwdForm.password}))
            .then(function (res){
              //console.log(res.data.data[0]);
              if(res.data.code == 0){
                _this.$store.commit("saveTelephone",res.data.data[0].telephone)
                _this.$store.commit("saveUserName",res.data.data[0].user_name)
                _this.$store.commit("saveIsLogin",true)
                _this.$store.commit('saveMoviesRoute','/movies_info')
                _this.$store.commit('saveCinemaRoute','/cinema_info')
                _this.$notify({
                  type: "success",
                  message: "欢迎你," + _this.$store.state.user_name + "!",
                  duration: 3000
                });
                _this.$router.push('/index')
              }else if(res.data.code == 502){
                _this.$message({
                  type: "error",
                  message: "账号密码不匹配!",
                  showClose: true
                });
              }else if(res.data.code == -1){
                _this.$message({
                  type: "error",
                  message: "账户不存在!",
                  showClose: true
                });
              }
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      login_note() {

      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.login{
  background-color: rgba(245,248,254,0.84);
  height: 800px;
  width: 100%;
}

.login_frame{
  box-shadow: 5px 5px 10px #888888;
  background-color: white;
  border-radius: 10px;
  height: 500px;
  margin-top: 8%;
  font-weight: bolder;
  font-size: 18px
}
</style>