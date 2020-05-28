<template>
    <div>
        <div class="uk-width-expand">

            <div class="section-header mb-lg-5 border-0 uk-flex-middle">
                <div class="section-header-left">
                    <h3 class="uk-heading-line text-left"><span> {{this.$route.query.typeName}} </span></h3>
                </div>
            </div>

            <div v-if="videoList.length == 0" style="height:200px;">
                <span >没有视频哦！</span>
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
</template>

<script>
export default {
  // props: [''],
  // inject: ['reload'],
  watch: {
    keywords: function (val) {
      this.keywords = val
      console.log(val)
    }
  },
  data () {
    return {
      videoList: [],
      currentPage: 1,
      keywords: '',
      total: 10
    }
  },
  created: async function () {
    this.keywords = this.$route.query.keywords
    // console.log(this.keywords)
    const { data: res } = await this.$http.get('search/searchvideos', {
      params: {
        email: this.$tokenStorage.getData('email'),
        keywords: this.keywords,
        currentPage: 0,
        pageSize: 6
      }
    })
    if (res !== 204) {
      this.videoList = res
      this.total = ((res.length / 6) + 1) * 10
      console.log(res.length + '    ' + this.total)
    }
    // console.log(this.videoList)
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
      const { data: res } = await this.$http.get('search/searchvideos', {
        params: {
          email: this.$tokenStorage.getData('email'),
          keywords: this.keywords,
          currentPage: (val - 1) * 6,
          pageSize: val * 6
        }
      })
      if (res === 204) {
        this.videoList = res
      }
      // console.log(this.videoList)
    }
  }
}
</script>
