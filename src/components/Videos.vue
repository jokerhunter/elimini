<template>
    <div class="main_content_inner">
        <div uk-grid>
            <div class="uk-width-3-3@m">
                <div id="video-box" uk-sticky="top: 400 ;media : @s"
                    cls-active="video-resized uk-animation-slide-right;">
                    <span class="icon-feather-x btn-box-close"
                        uk-toggle="target: #video-box ; cls: video-resized-hedden uk-animation-slide-left"></span>

                    <div class="embed-video">
                        <!-- <iframe :src="'http://192.168.80.129/video/' + this.video.uuid + '/origin/' + this.video.videoName" frameborder="0"
                            uk-video="automute: true" allowfullscreen uk-responsive></iframe> -->
                        <video ref="mediavideo" controls allowfullscreen></video>
                    </div>
                </div>
                <!-- <el-button></el-button> -->
                <div class="video-info mt-3">

                    <!-- video title -->
                    <div class="video-info-title">
                        <h1> {{this.video.videoName}} </h1>
                    </div>

                    <div class="uk-flex uk-flex-between">

                        <div class="video-info-details">
                            <span> {{video.watchesnum | kilochange}} views </span>
                        </div>
                        <div class="collection" @click="changeCollection" >
                            <img class="collection-img" :src="require('../assets/icon/' + (iscollected ? 'collection.svg': 'collection-0.svg'))" />
                            <span class="collection-span">{{iscollected? '已收藏' : '收藏'}}</span>
                        </div>
                        <div class="video-likes">
                            <div class="like-btn" uk-tooltip="I like it" @click="changelikednum">
                                <i :class="[ islinked ? 'icon-line-awesome-thumbs-up' : 'uil-thumbs-up' ]"></i>
                                <span class="likes">{{video.linkednum | kilochange}}</span>
                            </div>
                            <div class="video-info-element">
                                <div class="views-bar"></div>
                                <div class="views-bar blue" :style="'width: ' + video.linkednum +'%'"></div>
                            </div>
                            <!-- <div class="like-btn" uk-tooltip="I Hate it">
                                <i class="uil-thumbs-down"></i>
                                <span class="likes">14</span>
                            </div> -->
                        </div>

                    </div>

                    <div class="uk-flex uk-flex-between uk-flex-middle" uk-grid>
                        <div class="user-details-card uk-width-expand">
                            <a class="uk-flex">
                                <div class="user-details-card-avatar">
                                <router-link to="/settings">
                                    <img :src="video.profileaddr" alt="">
                                </router-link>
                                </div>
                                <div class="user-details-card-name">
                                    {{video.uname}} <span> 发布时间 {{video.publishTime | exchangeTime}} </span>
                                </div>
                            </a>
                        </div>
                        <!-- <div class="uk-width-auto uk-flex">
                            <div class="btn-subscribe">
                                <a href="#" class="button primary"> <i class="icon-feather-plus"></i>
                                    subscribe </a>
                                <span class="subs-amount">1200</span>
                            </div>
                        </div> -->
                        <div>
                          <el-button :class="[isdistinct ? 'el-button el-button--info': 'el-button el-button--primary']" @click="changeDistinct(0)" > 720p </el-button>
                          <el-button :class="[ isdistinct ? 'el-button el-button--primary' : 'el-button el-button--info']" @click="changeDistinct(1)" > 1080p </el-button>
                        </div>
                    </div>

                    <hr class="mt-0 mb-2">

                    <h3> 描述</h3>
                    <p>{{video.description}}</p>

                </div>

                <hr>

                <div class="comments mt-4">
                    <h3> 视 频 评 论 <span class="comments-amount">{{commentList.length}}</span> </h3>

                    <ul>
                        <li v-for="(comment) in commentList" :key="comment.id" class="" >
                            <div class="avatar"><img :src="comment.profileaddr" alt="">
                            </div>
                            <div class="comment-content">
                                <div class="comment-by">
                                  <span class="uname">{{comment.uname}}</span>
                                <!-- <a href="#" class="reply"><i class="icon-line-awesome-undo"></i>
                                Reply</a> -->
                                </div>
                                <p> {{comment.content}} </p>
                                <span style="text-align:right;">发布于 {{comment.commentTime | exchangeTime}}</span>
                                <hr>
                            </div>

                        </li>
                    </ul>

                </div>
                <hr>
                <div class="comments">
                    <h4>您 的 评 论 </h4>
                    <ul>
                        <li>
                          <el-form class="uk-grid-small" uk-grid
                            ref="commentFormRef"
                            :model="commentForm"
                            :rules="commentFormRules">
                              <!-- <div class="uk-width-1-2@s">
                                  <label class="uk-form-label">Name</label>
                                  <input class="uk-input" type="text" placeholder="Name">
                              </div>
                              <div class="uk-width-1-2@s">
                                  <label class="uk-form-label">Email</label>
                                  <input class="uk-input" type="text" placeholder="Email">
                              </div> -->
                              <div class="uk-width-1-1@s">
                                  <label class="uk-form-label">Comment</label>
                                  <el-form-item prop="content">
                                    <el-input type="textarea" v-model="commentForm.content" :rows="6" placeholder="请 输 入 你 的 评 论"
                                      ></el-input>
                                  </el-form-item>
                              </div>
                              <div class="submit-button">
                                  <el-button type="primary" @click="submitComment">提 交</el-button>
                              </div>
                          </el-form>
                        </li>
                    </ul>
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
  inject: ['reload'],
  data () {
    return {
      isdistinct: true,
      video: '',
      islinked: false,
      iscollected: false,
      collectionImg: '',
      commentList: [],
      commentForm: {
        content: ''
      },
      commentFormRules: {
        content: [
          { required: true, message: '请输入评论', trigger: 'blur' }
        ]
      }
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
    const { data: addhistroy } = await this.$http.post('history/addhistory', {
      userid: this.$tokenStorage.getData('userid'),
      videouuid: this.$route.query.uuid
    })
    console.log('addhistory : ' + addhistroy)
    const { data: res } = await this.$http.get('video/getvideoviewbyuuid', {
      params: {
        uuid: this.$route.query.uuid
      }
    })

    // console.log(res)
    this.video = res
    this.video.watchesnum++
    this.$refs.mediavideo.src = 'http://192.168.80.129/video/' + this.video.uuid + '/origin/' + this.video.videoName

    const watch = await this.$http.post('video/addvideowatches', {
      uuid: this.$route.query.uuid,
      watchesnum: res.watchesnum
    }).catch(err => {
      this.$message.error(err)
    })

    const { data: collection } = await this.$http.get('collection/findcollection', {
      params: {
        userid: this.$tokenStorage.getData('userid'),
        uuid: this.$route.query.uuid
      }
    })
    this.iscollected = collection !== ''
    if (collection !== '' && collection !== {}) {
      this.iscollected = true
      console.log(this.iscollected)
    } else {
        this.iscollected = false
    }

    const { data: comment } = await this.$http.get('comment/listcomments', {
      params: {
        videouuid: this.$route.query.uuid,
        currentPage: 0,
        pageSize: 6
      }
    })
    this.commentList = comment
    console.log(comment)
  },
  methods: {
    changeDistinct (val) {
      if (val !== 0) {
        this.isdistinct = true
        this.$refs.mediavideo.src = 'http://192.168.80.129/video/' + this.video.uuid + '/origin/' + this.video.videoName
      } else {
        this.isdistinct = false
        this.$refs.mediavideo.src = 'http://192.168.80.129/video/' + this.video.uuid + '/720p/' + this.video.videoName
      }
    },
    async changelikednum () {
      this.islinked = !this.islinked
    //   console.log(this.video.linkednum)
      this.$http.post('video/likedvideo', {
        uuid: this.video.uuid,
        linkednum: this.video.linkednum + (this.islinked ? 1 : -1)
      })
      this.islinked ? this.video.linkednum++ : this.video.linkednum--
    },
    changeCollection () {
      this.iscollected = !this.iscollected
      const collecturl = this.iscollected ? 'collection/addcollection' : 'collection/delcollection'
      this.$http.post(collecturl, {
        userid: this.$tokenStorage.getData('userid'),
        videouuid: this.video.uuid
      }).then(res => {
        console.log(res)
      })
    },
    submitComment () {
      this.$refs.commentFormRef.validate(async valid => {
        if (!valid) return
        // console.log('submit validate')
        const { data: res } = await this.$http.post('comment/addcomment', {
          userid: this.$tokenStorage.getData('userid'),
          videouuid: this.$route.query.uuid,
          content: this.commentForm.content
        })
        console.log(res)
        this.reload()
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .primary {
      color: #FFF;
      background-color: #409EFF;
      border-color: #409EFF;
    }
    p {
      text-align: left;
    }
    // .comment-content {
    //     padding: 0;
    // }
    .comment-content hr {
        margin-top: 0;
    }
    .uname {
        width: 100%;
        padding-bottom: 8px;
        font-weight: 600;
        color: #333;
        font-size: 16px;
    }

    .video-likes .video-info-element .views-bar {
        width: 100%;
    }

    .collection {
        cursor: pointer;
    }

    .collection-img {
        width: 30px;
        height: 30px;
    }

    .collection-span {
        padding-left: 5px;
        font-size: 17px;
    }
</style>
