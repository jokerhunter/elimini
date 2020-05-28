<template>
    <div class="main_content_inner">
        <h2 class="mt-lg-2 mb-sm-0"> Watched history </h2>

        <div class="section-small">
            <div uk-grid>
                <div class="uk-width-3-4@m">
                    <div v-for="(history,index) in historyList" :key="index" class="video-post video-post-list" >
                        <router-link :to="{path:'/videos',query: {uuid:history.uuid}}" class="video-post video-post-list" >
                            <!-- Blog Post Thumbnail -->
                            <div class="video-post-thumbnail">
                                <span class="play-btn-trigger"></span>
                                <span class="video-post-time">{{history.publishTime | exchangeTime}}</span>
                                <img :src="history.previewaddr" alt="">
                            </div>
                            <!-- Blog Post Content -->
                            <div class="video-post-content">
                                <h3>{{history.videoName}}
                                </h3>
                                <span class="video-post-user">{{history.uname}}</span>
                                <span class="video-post-date"> {{history.publishTime | exchangeTime}} </span>
                                <p> {{history.description}} </p>
                            </div>
                        </router-link>
                        <div class="video-post-content">
                            <button class="p-3 circle bg-secondary uk-align-right ml-2" @click="delhistory(history.uuid)"
                                uk-tooltip="title: Clear Video ; pos: left" type="button" uk-close></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="block">
            <span class="demonstration"></span>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="100">
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
      historyList: [],
      currentPage: 1
    }
  },
  created: async function () {
    const { data: res } = await this.$http.get('history/listhistory', {
      params: {
        userid: this.$tokenStorage.getData('userid'),
        currentPage: 0,
        pageSize: 4
      }
    })
    this.historyList = res
    console.log(res)
  },
  methods: {
    async delhistory (uuid) {
      this.$http.post('history/deletehistory', {
        userid: this.$tokenStorage.getData('userid'),
        videouuid: uuid
      })
      this.reload()
    },
    async handleCurrentChange (val) {
      const { data: res } = await this.$http.get('history/listhistory', {
      params: {
        userid: this.$tokenStorage.getData('userid'),
        currentPage: (val - 1) * 4,
        pageSize: 4
      }
    })
    this.historyList = res
    this.currentPage = val
    console.log(val + '  ' + res)
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
  }
}
</script>

<style lang="less" scoped>
    // .video-post {
    //     display: flex;
    //     margin-bottom: 30px;
    //     transition: 0.3s;
    //     position: relative;
    // }
</style>
