<template>
    <div>
        <div class="dropdown-notifications-headline">
            <h4>上 传 头 像</h4>
        </div>
        <div v-if="imgPath !== '' && imgPath != null" style="font-size:20px;">点击头像重新上传</div>
        <img v-if="imgPath !== '' && imgPath != null" class="profile-img" :src="imgPath" @click="()=>{this.imgPath=''}">
         <!-- v-if="imgPath !== '' && imgPath != null" -->
        <el-upload v-if="imgPath == '' || imgPath == null"
            class="upload-demo"
            drag
            :limit="1"
            :show-file-list="true"
            :with-credentials="true"
            :action="uploadPath"
            :data="uploadData"
            accept="image/*"
            :before-upload="handleBeforeUpload"
            :on-success="(response, file, fileList)=>handleSuccessImg(response, file, fileList)"
            :on-error="(err, file, fileList)=>handleErrorImg(err, file, fileList)">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button v-if="imgPath == '' || imgPath == null" type="primary" @click="useDefaultProfile">使用系统默认头像</el-button>
    </div>
</template>

<script>
export default {
  inject: ['reload'],
  data () {
    return {
      uploadPath: 'http://192.168.80.129:8090/uploaduserimg',
      imgPath: '',
      uploadData: {
        'fileUpload': '',
        'email': this.$tokenStorage.getData('email')
      }
    }
  },
  created: async function () {
    const { data: res } = await this.$http.get('user/iswholemessage', {
      params: {
        id: this.$tokenStorage.getData('userid')
      }
    })
    this.imgPath = res.profileaddr
    console.log(res)
  },
  methods: {
    uploadProfileImg () {
      this.$http.post('/user/updateUserDetail', {
        userid: this.$tokenStorage.getData('userid'),
        profileaddr: this.imgPath
      }).then(res => {
        this.$message.success('图片上传成功')
        this.reload()
        // this.$emit('changeImg', this.imgPath)
      }).catch(error => {
        console.log('err' + error)
        this.$message.error('图片上传失败')
        this.imgPath = ''
      })
    },
    handleSuccessImg (response, file, fileList) {
      console.log('successimg')
      console.log(response)
      this.uploadProfileImg()
    },
    handleErrorImg (err, file, fileList) {
      console.log('errorimg')
      console.log(err)
      // console.log(file)
      // console.log(fileList)
    },
    handleBeforeUpload (file) {
      const suffix = file.name.split('.')[1]
      this.uploadData.fileUpload = file
      this.imgPath = 'http://192.168.80.129/images/users/' + this.$tokenStorage.getData('email') + '.' + suffix
    },
    useDefaultProfile () {
      this.imgPath = 'http://192.168.80.129/images/users/default-profile.jpg'
      this.handleSuccessImg()
    }
  }
}
</script>

<style lang="less" scoped>
    .profile-img {
        margin-top: 20px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        cursor: pointer;
    }
</style>
