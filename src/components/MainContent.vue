<template>
    <div>
        <!-- Slideshow -->
        <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1"
            uk-slideshow="animation: push ;min-height: 200; max-height: 350 ;autoplay: t rue">

            <ul class="uk-slideshow-items rounded">
                <li>
                    <div class="uk-position-cover" uk-slideshow-parallax="scale: 1.2,1.2,1">
                        <img src="@/assets/images/banner/img3.jpg" alt="" uk-cover>
                    </div>
                    <div class="uk-position-cover"
                        uk-slideshow-parallax="opacity: 0,0,0.2; backgroundColor: #000,#000"></div>
                    <div class="uk-position-bottom-left bg-gradient-4 uk-width-1-1 p-4">
                        <div uk-slideshow-parallax="scale: 1,1,0.8">
                            <h1 uk-slideshow-parallax="x: 200,0,0" class="uk-heading-small"> 体 验 至 上 观 感
                            </h1>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="uk-position-cover" uk-slideshow-parallax="scale: 1.2,1.2,1">
                        <img src="@/assets/images/banner/img2.jpg" alt="" uk-cover>
                    </div>
                    <div class="uk-position-cover"
                        uk-slideshow-parallax="opacity: 0,0,0.2; backgroundColor: #000,#000"></div>
                    <div class="uk-position-bottom uk-position-medium uk-transition-scale-down">
                        <h1 uk-slideshow-parallax="x: 200,0,0" class="uk-heading-small">发 掘 品 质 生 活</h1>
                    </div>
                </li>
            </ul>

            <a class="uk-position-center-left-out uk-position-small uk-hidden-hover slidenav-prev" href="#"
                uk-slideshow-item="previous"></a>
            <a class="uk-position-center-right-out uk-position-small uk-hidden-hover slidenav-next" href="#"
                uk-slideshow-item="next"></a>
        </div>

        <!-- Videos sliders 1 -->

        <div class="video-grid-slider mt-4" uk-slider="finite: true">

            <div class="grid-slider-header">
                <div>
                    <h3> 热 点 视 频 </h3>
                    <img style="width:40px;height:40px;display:inline-block;" src="../assets/icon/hot.svg">
                    <!-- <p style="display:inline-block; margin-left:5px;"> H O T </p> -->
                </div>
                <div class="grid-slider-header-link">

                    <div class="btn-arrow-slider">
                        <a href="#" class="btn-arrow-slides" uk-slider-item="previous">
                            <span class="arrow-left"></span>
                        </a>
                        <a href="#" class="btn-arrow-slides" uk-slider-item="next">
                            <span class="arrow-right"></span>
                        </a>
                    </div>

                </div>
            </div>

            <ul class="uk-slider-items uk-child-width-1-4@m uk-child-width-1-3@s uk-grid">

                <li v-for="(video) in hotVideoList" :key="video.uuid">
                    <a class="video-post">
                        <router-link :to="{path:'/videos',query: {uuid: video.uuid}}">
                        <!-- Blog Post Thumbnail -->
                        <div class="video-post-thumbnail">
                            <span class="video-post-count">{{video.watchesnum | kilochange}}</span>
                            <!-- <span class="video-post-time">23:00</span> -->
                            <span class="play-btn-trigger"></span>
                            <!-- option menu -->
                            <span class="btn-option">
                                <i class="icon-feather-more-vertical"></i>
                            </span>
                            <!-- <div class="dropdown-option-nav"
                                uk-dropdown="pos: bottom-right ;mode : hover ;animation: uk-animation-slide-bottom-small">
                                <ul>
                                    <li>
                                        <span> <i class="uil-history"></i> 收 藏 视 频</span>
                                    </li>
                                </ul>
                            </div> -->

                            <img :src="video.previewaddr" alt="">

                        </div>

                        <!-- Blog Post Content -->
                        <div class="video-post-content">
                            <h3> {{video.description}} </h3>
                            <img :src="video.profileaddr" alt="">
                            <span class="video-post-user">{{video.uname}}</span>
                            <span class="video-post-views">{{video.watchesnum | kilochange}} views</span>
                            <span class="video-post-date"> {{video.publishTime | exchangeTime}} </span>
                        </div>
                        </router-link>
                    </a>
                </li>
            </ul>
        </div>

        <!-- section header for slider 1 -->

        <div class="section-header mt-5">
            <div class="section-header-left">
                <h3> 订 阅 </h3>
                <p> 查 看 你 的 订 阅 频 道 </p>
            </div>
            <div class="section-header-right">
                <a class="see-all"> See all</a>
            </div>
        </div>

        <!-- Videos sliders 1 -->

        <div class="section-small pt-0">
            <div uk-slider="finite: true">

                <ul class="uk-slider-items uk-child-width-1-4@m uk-child-width-1-3@s uk-grid mb-3">

                    <li v-for="(subscribe, index) in subscirbevideo" :key="index" >
                        <a class="video-post">
                            <router-link :to="{path:'/videos', query: {uuid: subscribe.uuid}}">
                                <!-- Blog Post Thumbnail -->
                                <div class="video-post-thumbnail">
                                    <span class="video-post-count">{{subscribe.watchesnum | kilochange}}</span>
                                    <span class="video-post-time">{{subscribe.publishTime | exchangeTime}}</span>
                                    <span class="play-btn-trigger"></span>
                                    <!-- option menu -->
                                    <span class="btn-option">
                                        <i class="icon-feather-more-vertical"></i>
                                    </span>

                                    <img :src="subscribe.previewaddr" alt="">

                                </div>

                                <!-- Blog Post Content -->
                                <div class="video-post-content">
                                    <h3> {{subscribe.cideoName}} </h3>
                                    <img :src="subscribe.profileaddr" alt="">
                                    <span class="video-post-user">{{subscribe.uname}}</span>
                                    <span class="video-post-views">{{subscribe.watchesnum | kilochange}} views</span>
                                    <span class="video-post-date"> {{subscribe.publishTime | exchangeTime}} </span>
                                </div>
                            </router-link>
                        </a>
                    </li>
                </ul>
                <a class="uk-position-center-left-out uk-position-small slidenav-prev" href="#"
                    uk-slider-item="previous"></a>
                <a class="uk-position-center-right-out uk-position-small slidenav-next" href="#"
                    uk-slider-item="next"></a>
            </div>
        </div>
        <hr class="m-0">
    </div>
</template>

<script>
export default {
  data () {
    return {
      hotVideoList: [],
      subscirbevideo: []
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
  created: async function () {
    const res = await this.$http.get('video/listvideosbyrange', {
      params: {
        'currentIndex': 0,
        'pageSize': 5
      }
    })
    console.log(res.data)
    this.hotVideoList = res.data

    const { data: subscirbevideo } = await this.$http.get('subscribe/listSubscribeVideo', {
      params: {
        subscribeid: this.$tokenStorage.getData('userid'),
        currentPage: 0,
        pageSize: 4
      }
    })
    console.log(subscirbevideo)
    this.subscirbevideo = subscirbevideo
  }
}
</script>

<style lang="less" scoped>

</style>
