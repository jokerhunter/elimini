<template>
    <div uk-height-viewport class="uk-flex uk-flex-middle">
        <div class="uk-width-2-3@m uk-width-1-2@s m-auto rounded">
            <div class="uk-child-width-1-2@m uk-grid-collapse bg-gradient-primary" uk-grid>
                <!-- column one -->
                <div class="uk-margin-auto-vertical uk-text-center uk-animation-scale-up p-3 uk-light">
                    <img src="assets/images/logo-light-icon.png" width="45" alt="">
                    <h1 class="mb-4 mt-2"> Elimini</h1>
                    <p>向 世 界 分 享 你 的 生 活 </p>
                </div>

                <!-- column two -->
                <div class="uk-card-default p-6">
                    <div class="my-4 uk-text-center">
                        <h2 class="mb-0"> Welcome back</h2>
                        <p class="my-2">登 录 你 的 账 户</p>
                    </div>
                    <el-form
                      ref="loginFormRef"
                      :model="loginForm"
                      :rules="loginFormRules"
                    >

                        <div class="uk-form-group">
                            <label class="uk-form-label"> 邮箱</label>

                            <div class="uk-position-relative w-100">
                                <el-form-item prop="email">
                                    <el-input
                                        v-model="loginForm.email"
                                        prefix-icon="icon-feather-mail"
                                        placeholder="name@example.com">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>

                        <div class="uk-form-group">
                            <label class="uk-form-label"> 密码</label>

                            <div class="uk-position-relative w-100">
                                <el-form-item prop="password">
                                    <el-input
                                        type="password"
                                        v-model="loginForm.password"
                                        prefix-icon="icon-feather-lock"
                                        placeholder="******">
                                    </el-input>
                                </el-form-item>
                            </div>

                        </div>

                        <!-- <div class="uk-form-group">
                            <label class="uk-form-label"> 确认密码</label>

                            <div class="uk-position-relative w-100">
                                <span class="uk-form-icon">
                                    <i class="icon-feather-lock"></i>
                                </span>
                                <input class="uk-input" type="password" placeholder="********">
                            </div>

                        </div> -->

                        <identifyCode @changeCode="getCodeFromChild" />
                        <div class="uk-form-group">
                            <div class="uk-position-relative w-100">
                                <span class="uk-form-icon">
                                    <i class="el-icon-s-check"></i>
                                </span>
                                <input class="uk-input" :class="{vertifyTrue:isVertify}" type="text" placeholder="验证码" @input="vertify($event)">
                                <span class="icon-right">
                                    <i :class="{'el-icon-check':isVertify}"></i>
                                </span>
                            </div>
                        </div>

                        <div class="mt-4 uk-flex-middle uk-grid-small" uk-grid>
                            <div class="uk-width-expand@s">
                                <p> 如果没有账户？请 <a href="javascript:void(0);" @click="redirectReg">注 册</a></p>
                            </div>
                            <div class="uk-width-auto@s">
                                <button type="submit" class="button primary" @click="login">登 录</button>
                            </div>
                        </div>
                    </el-form>
                </div><!--  End column two -->
            </div>
        </div>
    </div>
</template>

<script>
import identifyCode from '../utils/identifyCode'
import { validateEMail } from '../utils/validate'

let vertifyCode = ''

// function validateCode (rules, value, callback) {
//   if (value === '' || value === undefined || value === null) {
//     callback()
//   } else {
//     if (value !== vertifyCode) {
//       callback(new Error('请输入正确的IP地址'))
//     } else {
//       callback()
//     }
//   }
// }

export default {
  data () {
    return {
      isVertify: false,
      loginForm: {
        email: '',
        password: ''
      },
      loginFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          },
          { validator: validateEMail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
        // vertifyCode: [
        //   { validator: validateCode, trigger: 'blur' }
        // ]
      }
    }
  },
  // created () {
  //   const testresume = this.$http.get('http://localhost:8083/user/listUsers')
  //   console.log(testresume)
  // },
  methods: {
    redirectReg () {
      this.$router.push('/register')
    },
    getCodeFromChild (data) {
      vertifyCode = data
    //   console.log(vertifyCode)
    },
    vertify (event) {
      if (event.currentTarget.value === vertifyCode) {
        this.isVertify = true
      } else {
        this.isVertify = false
      }
    },
    //   重置按钮，重置登录表单
    // resetLoginForm () {
    //   this.$refs.loginFormRef.resetFields()
    // },
    login () {
      if (this.isVertify) {
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) return
          const res = await this.$http.post('user/login', this.loginForm)
          // console.log(res.data.id)
          if (res.data != null && res.data !== '') {
            this.$message.success('登录成功')
            this.$tokenStorage.setData('token', res.data.token, 3 * 60)
            this.$tokenStorage.setData('email', res.data.email, 3 * 60)
            this.$tokenStorage.setData('uname', res.data.uname, 3 * 60)
            this.$tokenStorage.setData('userid', res.data.id, 3 * 60)
            // console.log(this.$tokenStorage.getData('token'))
            const { data: vertifyfirst } = await this.$http.get('user/iswholemessage', {
              params: { id: res.data.id }
            })
            console.log(vertifyfirst)
            // this.$tokenStorage.setData('profileaddr', vertifyfirst.profileaddr)
            // console.log(this.$tokenStorage.getData('profileaddr'))
            console.log(vertifyfirst)
            if (vertifyfirst && vertifyfirst !== '') {
              this.$router.push('/home')
              console.log('to router home')
            } else {
              const { data: userDetail } = this.$http.post('user/addUserDetail', {
                userid: res.data.id,
                profileaddr: 'http://192.168.80.129/images/users/default-profile.jpg'
              })
              console.log(userDetail)
              this.$router.push('/settings')
            }
          } else {
            this.$message.error('登录失败')
          }
        })
      } else {
        this.$message.error('验证码错误')
      }
    }
  },
  components: {
    identifyCode
  }
}
</script>

<style lang="less" scoped>
    .vertifyTrue {
        background-color: #67C23A;
    }

    .icon-right {
        position:absolute;
        right:10px;
        top:0;
        bottom: 0;
        display:inline-flex;
        justify-content: center;
        align-items:center;
    }
</style>
