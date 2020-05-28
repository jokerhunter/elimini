<template>
    <div>
         <!-- notification contents -->
        <!-- <div class="dropdown-notifications-content uk-flex uk-flex-middle uk-flex-center text-center">
            <div class="uk-flex uk-flex-column choose-upload  text-center">
                <img src="assets/images/upload.png" width="70" class="m-auto" alt="">
                <p class="my-3"> 分享使人快乐 <br> 快来分享你的生活吧 ..
                </p>
                <div uk-form-custom>
                    <input type="file">
                    <a class="button soft-primary small" > 上传</a>
                </div>

                <a class="uk-text-muted mt-3 uk-link"
                    uk-toggle="target: .choose-upload ;  animation: uk-animation-slide-right-small, uk-animation-slide-left-medium; queued: true">
                    => 导入视频url </a>
            </div>

            <div class="uk-flex uk-flex-column choose-upload" hidden>
                <i class="uil-import icon-large text-muted"></i>
                <p class="my-3"> 从网页导入视频 <br> 复制 / 粘贴 你的视频链接 </p>
                <form class="uk-grid-small" uk-grid>
                    <div class="uk-width-expand">
                        <input type="text" class="uk-input uk-form-small" placeholder="Paste link">
                    </div>
                    <div class="uk-width-auto"> <button type="submit" class="button soft-primary">
                            导入 </button> </div>
                </form>
                <a class="uk-text-muted mt-3 uk-link"
                    uk-toggle="target: .choose-upload ; animation: uk-animation-slide-left-small, uk-animation-slide-right-medium; queued: true">
                    => 上传本地视频 </a>
            </div>

        </div> -->
        <!-- notivication header -->
    <el-form
        ref="uploadVideoRef"
        :model="uploadVideoForm"
        :rules="uploadVideoRules">
        <el-form-item>
            <div class="dropdown-notifications-headline">
                <h4>上传本地视频</h4>
            </div>
            <el-upload
                    ref="uploadVideo"
                    action="http://192.168.80.129:8090/upload"
                    name="fileUpload"
                    :limit=limitNum
                    :on-progress="uploadVideoProcess"
                    :on-success="handleVideoSuccess"
                    :on-error="handleError"
                    :before-upload="beforeUploadVideo"
                    :show-file-list="false">
                <video v-if="videoForm.showVideoPath !='' && !videoFlag"
                    v-bind:src="videoForm.showVideoPath"
                    class="avatar video-avatar el-upload"
                    controls="controls">
                    您的浏览器不支持视频播放
                </video>
                <div v-else-if="videoForm.showVideoPath =='' && !videoFlag" class="el-upload" >
                    <i :class="[!uploadicon ? 'el-icon-plus': 'el-icon-circle-check']" class=" avatar-uploader-icon"></i>
                </div>
                <el-progress v-if="videoFlag == true"
                            type="circle"
                            v-bind:percentage="videoUploadPercent"
                            style="margin-top:7px;"></el-progress>
            </el-upload>
            <hr class="m-0">
            <div class="text-center uk-text-small py-2 uk-text-muted"> 视 频 限 制 最 大 50MB</div>
        </el-form-item>

        <div class="dropdown-notifications-headline">
            <h4>上传视频预览图片</h4>
        </div>
        <el-form-item>
            <div v-if="imgForm.showimgPath == ''">
                <input class="file button" type="file" name="fileUpload" ref="inputer">
                <el-button type="primary" @click="uploadImg">上传<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>
            <div v-if="imgForm.showimgPath != ''"  class="img-preview" style=""  >
                <img  :src="imgForm.showimgPath" >
            </div>
            <div>
                <el-button v-if="imgForm.showimgPath != ''" type="primary" @click="uploadImgAgain">重新上传</el-button>
            </div>
        </el-form-item>
        <el-form-item prop="radio">
            <div class="dropdown-notifications-headline">
                <h4>选择视频类型</h4>
            </div>
            <div>
                <el-radio v-model="uploadVideoForm.radio" label="0" border>生活区</el-radio>
                <el-radio v-model="uploadVideoForm.radio" label="1" border>动画区</el-radio>
                <el-radio v-model="uploadVideoForm.radio" label="2" border>音乐区</el-radio>
                <el-radio v-model="uploadVideoForm.radio" label="3" border>舞蹈区</el-radio>
                <el-radio v-model="uploadVideoForm.radio" label="4" border>科技区</el-radio>
                <el-radio v-model="uploadVideoForm.radio" label="5" border>时尚区</el-radio>
                <el-radio v-model="uploadVideoForm.radio" label="6" border>娱乐区</el-radio>
                <el-radio v-model="uploadVideoForm.radio" label="7" border>游戏区</el-radio>
                <el-radio v-model="uploadVideoForm.radio" label="8" border>数码区</el-radio>
            </div>
        </el-form-item>
        <!-- <el-form-item>
            <el-upload
                class="upload-demo"
                drag
                action="http://192.168.80.129:8090/uploadimg"
                multiple
                :auto-upload="false">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item> -->

        <div class="uk-form-group" style="margin-top:20px">
            <label class="uk-form-label"> 视频描述</label>

            <div class="uk-position-relative w-100" >
                <el-form-item prop="description">
                <el-input
                    type="textarea"
                    placeholder="Full name"
                    v-model="uploadVideoForm.description"
                    prefix-icon="icon-feather-user"
                >
                </el-input>
                </el-form-item>
            </div>
        </div>
        <el-button type="primary" @click="releasevideo">发布视频<i class="el-icon-upload el-icon--right"></i></el-button>
    </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      uuid: '',
      limitNum: 1,
      videoFlag: false,
      // 是否显示进度条
      videoUploadPercent: '',
      // 进度条的进度，
      isShowUploadVideo: false,
      videoForm: {
        videoName: '',
        showVideoPath: ''
      },
      imgForm: {
        showimgPath: ''
      },
      uploadicon: false,
      uploadVideoForm: {
        radio: '',
        description: ''
      },
      uploadVideoRules: {
        // uploadVideo: [
        //   { required: true, message: '请上传视频', trigger: 'blur' }
        // ],
        // uploadImg: [
        //   { required: true, message: '上传视频预览图', trigger: 'blur' }
        // ],
        radio: [
          { required: true, message: '请选择视频类型', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入相关视频描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    exceedFile (files, fileList) {
      this.$notify.warning({
        title: '警告',
        message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`
      })
    },
    // 上传前回调
    beforeUploadVideo (file) {
    //   if (this.uploadVideoForm.showVideoPath === '') {
        var fileSize = file.size / 1024 / 1024 < 50
        if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) === -1) {
            this.$message.error('请上传正确的视频格式')
            return false
        }
        if (!fileSize) {
            this.$message.error('视频大小不能超过50MB')
            return false
        }
        this.isShowUploadVideo = false
    //   } else {
    //     this.$message.error('已经上传过了')
    //     return false
    //   }
    },
    // 进度条
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    // 上传成功回调
    handleVideoSuccess (res, file) {
      this.isShowUploadVideo = true
      this.videoFlag = false
      this.videoUploadPercent = 0
      console.log(res)
      // 后台上传地址
      if (res !== '' && res != null) {
        console.log('sdfsdfs')
        this.videoForm.videoName = res.fileName
        this.uuid = res.uuid
        this.videoForm.showVideoPath = 'http://192.168.80.129/video/' + res.uuid + '/origin/' + res.fileName
        this.$message.success('上传成功')
      } else {
        this.$message.error('上传失败')
      }
      this.uploadicon = !this.uploadicon
    },
    handleError (err) {
      console.log(err)
      this.$message.error('上传失败')
      this.isShowUploadImg = !this.isShowUploadImg
    },
    async uploadImg () {
      if (this.uuid !== '' && this.uuid != null) {
        var formData = new window.FormData()
        // console.log(document.querySelector('input[type=file]').files[0]) // undifined
        formData.append('fileUpload', this.$refs.inputer.files[0])
        formData.append('uuid', this.uuid)
        const res = await this.$http.post('http://192.168.80.129:8090/uploadimg',
            formData
        )
        this.imgForm.showimgPath = 'http://192.168.80.129/' + res.data.fileName
        // console.log(res)
      } else {
        this.$message.error('请先上传视频')
      }
    },
    uploadImgAgain () {
      this.imgForm.showimgPath = ''
    },
    releasevideo () {
      // console.log(this.$tokenStorage.getData('userid'))
      // console.log(this.$tokenStorage.getData('email'))
      this.$refs.uploadVideoRef.validate(async valid => {
        if (!valid) return
        if (this.videoForm.showVideoPath !== '' && this.videoForm.showVideoPath) {
          if (this.imgForm.showimgPath !== '' && this.videoForm.showVideoPath) {
            const res = this.$http.post('video/uploadvideo', {
              userid: this.$tokenStorage.getData('userid'),
              uuid: this.uuid,
              videoName: this.videoForm.videoName,
              previewaddr: this.imgForm.showimgPath,
              videoType: this.uploadVideoForm.radio,
              description: this.uploadVideoForm.description
            })
            console.log(res)
            this.$router.push('/uploadvideos')
          } else {
            this.$message.error('请上传图片')
          }
        } else {
          this.$message.error('请上传视频')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-radio {
    margin-top: 10px;
  }

  .img-preview {
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    margin: 0 auto
  }

  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .upload-success {
    background-color: #67C23A;
  }
</style>
