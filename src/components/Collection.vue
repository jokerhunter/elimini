<template>
    <div class="main_content_inner">
        <div uk-grid>
            <div class="uk-width-1-4@m uk-flex-last@m">
                <div class="uk-card-default rounded" uk-sticky="top:10;offset: 90; bottom: true; media: @m;">

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

            <div class="uk-width-expand">

                <div class="section-header mb-lg-5 border-0 uk-flex-middle">
                    <div class="section-header-left">
                        <h3 class="uk-heading-line text-left"><span> 收 藏 </span></h3>
                    </div>
                    <!-- <div class="section-header-right">
                        <a href="#"
                            uk-tooltip="title: Veiw as list; pos: top-right">
                            <i class="icon-feather-list"></i>
                        </a>
                        <div class="display-as">
                            <a href="your-laked-videos.html" class="active" uk-tooltip="title: Veiw as Grid; pos: top-right">
                                <i class="icon-feather-grid"></i>
                            </a>
                        </div>
                    </div> -->
                </div>

                <div v-if="videoList.length == 0" style="height:200px;">
                    <span >没有收藏了！</span>
                </div>

                <div class="uk-child-width-1-3@m" uk-grid
                    uk-scrollspy="target: > div; cls: uk-animation-slide-bottom-small; delay: 100">

                    <div v-for="video in videoList" :key="video.uuid">
                        <a class="video-post">
                            <router-link :to="{path:'/videos',query: {uuid: video.uuid}}">
                            <!-- Blog Post Thumbnail -->
                            <div class="video-post-thumbnail">
                                <span class="video-post-count">{{video.watchesnum | kilochange}}</span>
                                <span class="play-btn-trigger"></span>
                                <!-- option menu -->
                                <span class="btn-option">
                                    <i class="icon-feather-more-vertical"></i>
                                </span>

                                <img :src="video.previewaddr" alt="">

                            </div>

                            <!-- Blog Post Content -->
                            <div class="video-post-content">
                                <h3> {{video.videoName}} </h3>
                                <img :src="video.profileaddr" alt="">
                                <span class="video-post-user">{{video.uname}}</span>
                                <span class="video-post-views">{{video.watchesnum | kilochange}} views</span>
                                <span class="video-post-date"> {{video.publishTime | exchangeTime}} </span>
                            </div>
                            </router-link>
                        </a>
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
            </div>
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
  data () {
    return {
      videoList: [
      ],
      currentPage: 1,
      profileImg: this.$tokenStorage.getData('profileaddr'),
      total: 1
    }
  },
  created: async function () {
    const { data: res } = await this.$http.get('collection/listcollections', {
      params: {
        'userid': this.$tokenStorage.getData('userid'),
        'currentPage': 0,
        'pageSize': 6
      }
    })
    this.videoList = res
    this.total = ((this.videoList.length / 6).toFixed(0) + 1) * 10
    console.log(this.$tokenStorage.getData('userid'))
    console.log(this.total)
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
    async handleCurrentChange (val) {
    //   this.currentPage = val
      const { data: res } = await this.$http.get('collection/listcollections', {
        params: {
          userid: this.$tokenStorage.getData('userid'),
          currentPage: (val - 1) * 6,
          pageSize: 6
        }
      })
      this.videoList = res
      console.log(res)
    }
  }
}
</script>
