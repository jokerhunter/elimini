<template>
    <div class="main_content_inner">
        <div uk-grid>
            <div class="uk-width-1-4@m uk-flex-last@m">
                <div class="uk-card-default rounded" uk-sticky="top:10; offset: 90; bottom: true; media: @m;">

                    <div class="text-center p-3">
                        <img :src="profileImg"
                            class="avatar-large circle m-auto my-3" alt="">
                        <h4 class="mb-1"> {{this.$tokenStorage.getData('uname')}} </h4>
                        <p class="uk-text-small text-muted"> Since 2020</p>
                    </div>

                    <hr class="my-0">
                    <ul class="uk-list uk-list-divider uk-margin-small-top pt-1 pb-2">
                        <li>
                            <a class="ml-4">
                                <router-link to="/channals">
                                    <i class="uil-user mr-1"></i>
                                    订阅
                                </router-link>
                                <!-- <span class="pr-4 uk-float-right"> 122</span> -->
                            </a>
                        </li>
                        <!-- <li>
                            <a class="ml-4">
                                <router-link to="/uploadvideos">
                                    <i class="uil-cloud-upload mr-1"></i>
                                    已上传
                                </router-link>
                                <span class="pr-4 uk-float-right"> 12</span>
                            </a>
                        </li> -->
                        <li>
                            <a class="ml-4">
                                <router-link to="/history">
                                    <i class="uil-layers mr-1"></i>
                                    播放历史
                                </router-link>
                                <!-- <span class="pr-4 uk-float-right"> 2</span> -->
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="uk-width-3-4@m">
                <div class="section-header mb-5 border-bottom uk-flex-middle">
                    <div class="section-header-left">
                        <h3> 已 上 传 videos </h3>
                    </div>
                </div>

                <a v-for="video in videoList" :key="video.uuid">
                    <div @click="clickVideo(video.uuid)" class="video-post video-post-list">
                    <!-- Blog Post Thumbnail -->
                    <div class="video-post-thumbnail">
                        <span class="play-btn-trigger"></span>
                        <span class="video-post-time">{{video.publishTime | exchangeTime}}</span>
                        <img :src="video.previewaddr" alt="">
                    </div>
                    <!-- Blog Post Content -->
                    <div class="video-post-content">
                        <h3>{{video.videoName}}
                        </h3>
                        <span class="video-post-user">{{video.uname}}</span>
                        <span class="video-post-views">{{video.watchesnum | kilochange}} views</span>
                        <span class="video-post-date"> {{video.publishTime | exchangeTime}} </span>
                        <p> {{video.description}} </p>
                        <!-- option menu -->
                        <span class="btn-option">
                            <i class="icon-feather-more-vertical"></i>
                        </span>
                        <div class="dropdown-option-nav" uk-dropdown="pos: bottom-right ;mode : hover" >
                            <ul>
                                <li>
                                    <span @click.stop="deletevideo(video.uuid)"> <i class="uil-history"></i> delete video</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </div>
                </a>
                <div v-if="this.videoList.length == 0">没有视频哦！！</div>
            </div>
        </div>
        <div class="block">
            <span class="demonstration"></span>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <!-- footer
        ================================================== -->
        <div class="footer">
            <div class="uk-grid-collapse" uk-grid>
                <div class="uk-width-expand@s uk-first-column">
                    <p>© 2020 <strong>Elimini</strong>. All Rights Reserved. </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  inject: ['reload'],
  data () {
    return {
      videoList: [],
      currentPage: 1,
      profileImg: this.$tokenStorage.getData('profileaddr'),
      total: 1
    }
  },
  filters: {
    kilochange (value) {
      return value > 1000 ? (value / 1000).toFixed(1) + 'k' : value
    },
    exchangeTime (val) {
      if (val == null || val === '') {
        return null
      } else {
        const d = new Date(val)// val 为表格内取到的后台时间
        const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
        const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
        const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
        const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
        const sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
        const times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec
        // const times = month + '-' + day + ' ' + hours + ':' + min + ':' + sec
        return times
      }
    }
  },
  methods: {
    clickVideo (uuid) {
      console.log('click')
      this.$router.push({ path: '/videos', query: { uuid: uuid } })
    },
    async deletevideo (uuid) {
      console.log(uuid)
      const { data: deletePath } = await this.$http.delete('http://192.168.80.129:8090/deleteVideo', {
        params: { uuid: uuid }
      })
      const { data: deleteVideo } = await this.$http.delete('video/deletevideo', {
        params: { uuid: uuid }
      })
      console.log('deletePath:' + deletePath + 'deleteVideo' + deleteVideo)
      if (deletePath && deleteVideo) {
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
      this.reload()
    },
    async handleCurrentChange (val) {
      const { data: res } = await this.$http.get('video/listvideobyuserid', {
      params: {
        userid: this.$tokenStorage.getData('userid'),
        currentPage: 5 * (val - 1),
        pageSize: 5
      }
    })
    this.videoList = res
    }
  },
  created: async function () {
    const { data: res } = await this.$http.get('video/listvideobyuserid', {
      params: {
        userid: this.$tokenStorage.getData('userid'),
        currentPage: 0,
        pageSize: 5
      }
    })
    this.videoList = res
    this.total = ((this.videoList.length / 6).toFixed(0) + 1) * 10
    console.log(res)
  }
}
</script>
