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
                        <h3 class="mb-0">创建账户</h3>
                        <p class="my-2">填 写 信 息 创 建 账 户</p>
                    </div>
                    <el-form class="uk-child-width-1-1 uk-grid-small" uk-grid
                        ref="registerFormRef"
                        :model="registerForm"
                        :rules="registerFormRules"
                        >

                        <div>
                            <div class="uk-form-group">
                                <label class="uk-form-label"> 用户名</label>

                                <div class="uk-position-relative w-100" >
                                    <el-form-item prop="username">
                                    <el-input
                                        placeholder="Full name"
                                        v-model="registerForm.username"
                                        prefix-icon="icon-feather-user"
                                    >
                                    </el-input>
                                    </el-form-item>
                                </div>

                            </div>
                        </div>
                        <div>
                            <div class="uk-form-group">
                                <label class="uk-form-label"> 手机号</label>

                                <div class="uk-position-relative w-100" >
                                    <el-form-item prop="phone">
                                    <el-input
                                        placeholder="Full name"
                                        v-model="registerForm.phone"
                                        prefix-icon="icon-feather-phone"
                                    >
                                    </el-input>
                                    </el-form-item>
                                </div>

                            </div>
                        </div>
                        <div>
                            <div class="uk-form-group">
                                <label class="uk-form-label"> 邮箱</label>

                                <div class="uk-position-relative w-100">
                                    <el-form-item prop="email">
                                        <el-input
                                            placeholder="name@example.com"
                                            v-model="registerForm.email"
                                            prefix-icon="icon-feather-mail"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </div>

                            </div>
                        </div>

                        <div class="uk-width-group">
                            <div class="uk-form-group">
                                <label class="uk-form-label"> 密码</label>

                                <el-form-item prop="password">
                                    <el-input
                                        type="password"
                                        placeholder="********"
                                        v-model="registerForm.password"
                                        prefix-icon="icon-feather-lock"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>

                        <div class="uk-form-group">
                            <div class="uk-form-group">
                                <label class="uk-form-label"> 邮箱验证码 </label>

                                <el-form-item prop="vertifyCode">
                                    <el-input
                                        placeholder="********"
                                        v-model="registerForm.vertifyCode"
                                        prefix-icon="icon-feather-lock"
                                    >
                                    </el-input>
                                </el-form-item>
                                <el-button type="primary" @click="sendCode">发送验证码到邮箱</el-button>

                            </div>
                        </div>

                        <div>
                            <div class="mt-4 uk-flex-middle uk-grid-small" uk-grid>
                                <div class="uk-width-expand@s">
                                    <p> 如果有账户 <a href="javascript:void(0);" @click="redirectLog">登录</a></p>
                                </div>
                                <div class="uk-width-auto@s">
                                    <input type="submit" class="button primary" @click="register" value="注册" />
                                </div>
                            </div>
                        </div>

                    </el-form>
                </div><!--  End column two -->
            </div>
        </div>
    </div>
</template>

<script>
import { validateEMail, validatePhoneTwo } from '../utils/validate'

export default {
  data () {
    return {
      isVertify: false,
      registerForm: {
        username: '',
        phone: '',
        email: '',
        password: '',
        vertifyCode: ''
      },
      registerFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        phone: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: validatePhoneTwo, trigger: 'blur' }
        ],
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
        ],
        vertifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    redirectLog () {
      this.$router.push('/login')
    },
    async sendCode () {
      const email = this.registerForm.email
      // eslint-disable-next-line no-useless-escape
      const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
      if (email != null && email !== '' && email !== undefined && reg.test(email)) {
        const { data: res } = await this.$http.get('user/sendEmail', {
          params: {
            'email': email
          }
        })
        console.log(res)
        if (res === '' || res == null || !res) {
          this.$message.error('验证码发送失败')
        } else {
          this.isVertify = true
          this.$message.success('验证码发送成功，请在邮箱查看')
        }
      } else {
        this.$message.error('邮箱格式错误')
      }
    },
    register () {
      console.log(1)
      if (this.isVertify) {
        this.$refs.registerFormRef.validate(async valid => {
          if (!valid) return
          const { data: res } = await this.$http.post('user/register/', this.registerForm)
          console.log(res)
          if (res == null && res === '') {
            this.$message.error('注册失败')
          } else if (res === 204) {
              this.$message.error('验证码错误')
          } else if (res === 222) {
              this.$message.error('该邮箱已经注册，请登录')
              // this.$router.push('/login')
          } else {
            this.$message.success('注册成功')
            this.$router.push('/login')
          }
        })
      } else {
        this.$message.error('重新发送验证码')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
