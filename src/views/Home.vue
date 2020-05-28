<template>
  <div id="wrapper">
        <!-- sidebar -->
        <div class="main_sidebar">
            <div class="side-overlay" uk-toggle="target: #wrapper ; cls: collapse-sidebar mobile-visible"></div>

            <!-- sidebar header -->
            <div class="sidebar-header">
                <h4> Navigation</h4>
                <span class="btn-close" uk-toggle="target: #wrapper ; cls: collapse-sidebar mobile-visible"></span>
            </div>

            <!-- sidebar Menu -->
            <div class="sidebar">
                <div class="sidebar_innr" data-simplebar>

                    <div class="sections">
                        <h3> 浏览 </h3>
                        <ul>
                            <li :class="{ 'active': leftList[0] }" @click="leftListChange(0)"> <router-link to="/maincontent"> <i class="uil-home-alt"></i> <span> 主 站 </span> </router-link></li>
                            <li :class="{ 'active': leftList[1] }" @click="leftListChange(1)"> <router-link to="/channals">
                                <i class="uil-users-alt"></i> <span> 订 阅 </span> </router-link></li>
                            <li :class="{ 'active': leftList[2] }" @click="leftListChange(2)"> <router-link to="/collection"> <i class="uil-clock"></i> <span> 收 藏 </span> </router-link></li>
                            <li :class="{ 'active': leftList[3] }" @click="leftListChange(3)"> <router-link to="/catagroies"> <i class="uil-layers"></i> <span> 分 类</span> </router-link></li>
                            <li :class="{ 'active': leftList[4] }" @click="leftListChange(4)"> <router-link to="/uploadvideos"> <i class="uil-thumbs-up"></i> <span>  上 传 </span> </router-link></li>
                            <li :class="{ 'active': leftList[5] }" @click="leftListChange(5)"> <router-link to="/history"> <i class="uil-history"></i> <span> 历 史 </span> </router-link></li>
                        </ul>
                    </div>

                    <div class="sections">
                        <h3> 页面 </h3>
                        <ul>
                            <li :class="{ 'active': leftList[6] } " @click="leftListChange(6)"> <router-link to="/settings"><i class="uil-cog"></i> <span> 设 定 </span></router-link> </li>
                            <li :class="{ 'active': leftList[7] }" @click="leftListChange(7)"> <router-link to="/help"> <i class="uil-info-circle"></i> <span> 帮 助  </span> </router-link> </li>
                            <li :class="{ 'active-submenu':leftList[8] }" @click="leftListChange(8, true)" > <a><i class="uil-layers"></i> <span> 其 他 </span> </a>
                                <ul>
                                    <li>
                                        <router-link to="/maintanence"> <span> 长 期 维 护 </span> </router-link>
                                        <router-link to="/comingsoon"> <span> 即 将 到 来...</span> </router-link>
                                    </li>
                                </ul>

                            </li>

                            <!-- <li :class="{ 'active-submenu':leftList[9] }" @click="leftListChange(9,true)"> <a><i class="uil-user-circle"></i> <span> 账 户 </span> </a>
                                <ul>
                                    <li>
                                        <a> <router-link :to="{path:'/login'}"> 登 录 </router-link></a>
                                        <a> <router-link :to="{path:'/login'}"> 注 册</router-link> </a>
                                    </li>
                                </ul>

                            </li> -->
                        </ul>
                    </div>

                    <div id="foot">
                        <div class="foot-content">
                            <p>© 2020 <strong>Elimini</strong>. All Rights Reserved. </p>
                        </div>

                    </div>

                </div>
            </div>

        </div>

        <!-- header -->
        <div id="main_header">
            <header>
                <!-- Logo-->
                <i class="header-traiger uil-bars"
                    uk-toggle="target: #wrapper ; cls: collapse-sidebar mobile-visible"></i>

                <!-- Logo-->
                <div id="logo">
                    <a> <router-link to="/home"> <img src="../assets/images/logo.png" alt=""> </router-link> </a>
                    <a> <router-link to="/home"> <img src="../assets/images/logo-light.png" class="logo-inverse" alt=""> </router-link> </a>
                </div>

                <!-- form search-->
                <div class="head_search">
                    <form>
                        <div class="head_search_cont">
                            <input ref="searchInput" :value="keywords" type="text" class="form-control"
                                placeholder="搜索" autocomplete="off" @click="showHistory" @keyup:enter="searchVideos" >
                            <i class="s_icon uil-search-alt"></i>
                        </div>
                        <!-- <button type="primary">搜索</button> -->

                        <!-- Search box dropdown -->
                        <div uk-dropdown="pos: top;mode:click;animation: uk-animation-slide-bottom-small"
                            class="dropdown-search">
                            <!-- User menu -->

                            <ul class="dropdown-search-list">
                                <li class="list-title"> 最近搜索 </li>
                                <li v-for="history in historyList" :key="history">
                                    <a @click="historySearch(history)"> {{history}} </a>
                                    <!-- <router-link :key="history" :to="{ path:'/historyvideos', query: {'keywords': history}}">{{history}}</router-link> -->
                                </li>
                                <li class="menu-divider">
                                <li class="list-footer"> <a @click="clearHistory()" > 清空历史 </a></li>
                            </ul>

                        </div>
                    </form>
                </div>

                <div class="head_search">
                    <el-button type="primary" @click="searchVideos">搜索</el-button>
                </div>

                <!-- user icons -->
                <div class="head_user">
                    <router-link to="/uploadfile"><a href="#" class="btn-upload uk-visible@s">  <i class="uil-cloud-upload"></i> 上传 </a></router-link>

                    <!-- upload dropdown box -->
                    <!-- <div uk-dropdown="pos: top-right;mode:click ; animation: uk-animation-slide-bottom-small"
                        class="dropdown-notifications">
                    </div> -->

                    <!-- videos feed  -->
                    <a href="#video" class="opts_icon" uk-toggle> <i class="uil-youtube-alt"></i> <span>9+</span> </a>

                    <!-- videos feed  offcanvas-->
                    <div id="video" uk-offcanvas="overlay: true ;flip: true">
                        <div class="uk-offcanvas-bar uk-width-large">

                            <h3> Your Subscription </h3>
                            <hr class="mb-3" style="margin:0 -20px">
                            <button class="uk-offcanvas-close" type="button" uk-close></button>

                            <div class="video-list-small uk-child-width-1-1" uk-grid>

                                <div v-for="(subscribe,index) in subscirbevideo" :key="index">
                                    <a class="video-post video-post-list">
                                        <router-link :to="{path: '/videos', query: {uuid: subscribe.uuid}}">
                                            <!-- Blog Post Thumbnail -->
                                            <div class="video-post-thumbnail">
                                                <span class="video-post-count">{{subscribe.watchesnum | kilochange}} views</span>
                                                <span class="video-post-time">{{subscribe.publishTime | exchangeTime}}</span>
                                                <span class="play-btn-trigger"></span>

                                                <img :src="subscribe.previewaddr" alt="">

                                            </div>

                                            <!-- Blog Post Content -->
                                            <div class="video-post-content">
                                                <h3> {{subscribe.description}}</h3>
                                                <img :src="subscribe.profileaddr" alt="">
                                                <span class="video-post-user">{{subscribe.uname}}</span>
                                                <span class="video-post-views">{{subscribe.watchesnum | kilochange}} views</span>
                                                <span class="video-post-date"> {{subscribe.publishTime | exchangeTime}} </span>
                                            </div>
                                        </router-link>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- Message  notificiation dropdown -->
                    <!-- <a href="#" class="opts_icon"> <i class="uil-envelope-alt"></i> <span>4</span> </a> -->

                    <!-- Message  notificiation dropdown -->
                    <div uk-dropdown="pos: top-right;mode:click ; animation: uk-animation-slide-bottom-small"
                        class="dropdown-notifications">

                        <!-- notivication header -->
                        <div class="dropdown-notifications-headline">
                            <h4>Messages</h4>
                            <a href="#">
                                <i class="icon-feather-settings" uk-tooltip="title: Message settings ; pos: left"></i>
                            </a>
                        </div>

                        <!-- notification contents -->
                        <div class="dropdown-notifications-content" data-simplebar>

                            <!-- notiviation list -->
                            <ul>
                                <li class="notifications-not-read">
                                    <a href="#">
                                        <span class="notification-avatar">
                                            <img src="assets/images/avatars/avatar-2.jpg" alt="">
                                        </span>
                                        <div class="notification-text notification-msg-text">
                                            <strong>Jonathan Madano</strong>
                                            <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
                                            <span class="time-ago"> 2 hours ago </span>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span class="notification-avatar">
                                            <img src="assets/images/avatars/avatar-3.jpg" alt="">
                                        </span>
                                        <div class="notification-text notification-msg-text">
                                            <strong>Stella Johnson</strong>
                                            <p> Alex will explain you how to keep your videos privatly and all that...
                                            </p>
                                            <span class="time-ago"> 7 hours ago </span>
                                        </div>
                                    </a>
                                </li>
                            </ul>

                        </div>
                        <!-- <div class="dropdown-notifications-footer">
                            <a href="#"> sell all <i class="icon-line-awesome-long-arrow-right"></i> </a>
                        </div> -->

                    </div>

                    <!-- notificiation icon  -->
                    <!-- <a href="#" class="opts_icon"> <i class="uil-bell"></i> <span>3</span> </a> -->

                    <!-- notificiation dropdown -->
                    <div uk-dropdown="pos: top-right;mode:click ; animation: uk-animation-slide-bottom-small"
                        class="dropdown-notifications">

                        <!-- notivication header -->
                        <div class="dropdown-notifications-headline">
                            <h4>Notifications </h4>
                            <a href="#">
                                <i class="icon-feather-settings"
                                    uk-tooltip="title: Notifications settings ; pos: left"></i>
                            </a>
                        </div>

                        <!-- notification contents -->
                        <div class="dropdown-notifications-content" data-simplebar>

                            <!-- notiviation list -->
                            <ul>
                                <li class="notifications-not-read">
                                    <a href="#">
                                        <span class="notification-icon">
                                            <i class="icon-feather-thumbs-up"></i></span>
                                        <span class="notification-text">
                                            <strong>Adrian Mohani</strong> Like Your Comment On Video
                                            <span class="text-primary">Learn Prototype Faster</span>
                                            <br> <span class="time-ago"> 9 hours ago </span>
                                        </span>
                                    </a>
                                </li>
                                <!-- <li>
                                    <a href="#">
                                        <span class="notification-icon">
                                            <i class="icon-feather-star"></i></span>
                                        <span class="notification-text">
                                            <strong>Alex Dolgove</strong> Added New Review In Video
                                            <span class="text-primary">Full Stack PHP Developer</span>
                                            <br> <span class="time-ago"> 19 hours ago </span>
                                        </span>
                                    </a>
                                </li> -->
                            </ul>

                        </div>

                    </div>

                    <!-- profile -image -->
                    <a class="opts_account"> <img :src="profileImg" alt=""></a>

                    <!-- profile dropdown-->
                    <div uk-dropdown="pos: top-right;mode:click ; animation: uk-animation-slide-bottom-small"
                        class="dropdown-notifications small">

                        <!-- User Name / Avatar -->
                        <a>
                            <div class="dropdown-user-details">
                                <div class="dropdown-user-avatar">
                                    <img :src="profileImg" alt="">
                                </div>
                                <div class="dropdown-user-name">
                                    {{this.$tokenStorage.getData('uname')}} <span> verified <i class="uil-check"></i> </span>
                                </div>
                            </div>
                        </a>

                        <!-- User menu -->

                        <ul class="dropdown-user-menu">
                            <li><a> <router-link to="/channals"> <i class="uil-user"></i> 订 阅 </router-link> </a> </li>
                            <li><a > <router-link to="/collection"> <i class="uil-history"></i> 收 藏 </router-link> </a></li>
                            <li><a > <router-link to="/settings"> <i class="uil-cog"></i> 用户设定 </router-link></a> </li>
                            <li>
                                <a id="night-mode" class="btn-night-mode">
                                    <i class="icon-feather-moon"></i> Night mode
                                    <span class="btn-night-mode-switch">
                                        <span class="uk-switch-button" @click="nightmode($event)"></span>
                                    </span>
                                </a>
                            </li>
                            <div class="menu-divider">
                                <li><a href="#"> <router-link to="/help"> <i class="icon-feather-help-circle"></i> 帮 助 </router-link> </a>
                                </li>
                                <li><a @click="signout"> <i class="icon-feather-log-out"></i> 离 开</a>
                                </li>
                            </div>
                        </ul>
                    </div>

                </div>

            </header>

        </div>

        <!-- contents -->
        <div class="main_content">
            <div class="main_content_inner">
                <router-view :keywords="keywords"></router-view>
            </div>
        </div>

    </div>
</template>

<script>

function onetfchange (globalThis, list, index, twoclickchange) {
  if (list[index]) {
    // list[index] = !list[index]
    if (twoclickchange) {
        globalThis.$set(list, index, !list[index])
    }
    return list
  }
  for (let i = 0; i < list.length; i++) {
    if (i !== index && list[i]) {
    //   list[i] = !list[i]
      globalThis.$set(list, i, !list[i])
      break
    }
  }
//   list[index] = !list[index]
  globalThis.$set(list, index, !list[index])
  return list
}

export default {
  inject: ['reload'],
  data () {
    return {
      leftList: [
        true, false, false, false, false, false, false, false, false
      ],
      profileImg: this.$tokenStorage.getData('profileaddr'),
      historyList: [],
      keywords: '',
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
    if (localStorage.getItem('gmtNightMode')) {
      document.documentElement.classList.toggle('night-mode')
    }
    const { data: vertifyfirst } = await this.$http.get('user/iswholemessage', {
      params: { id: this.$tokenStorage.getData('userid') }
    })
    // console.log(vertifyfirst)
    this.profileImg = vertifyfirst.profileaddr
    this.$tokenStorage.setData('profileaddr', vertifyfirst.profileaddr, 3 * 60)

    const { data: subscirbevideo } = await this.$http.get('subscribe/listSubscribeVideo', {
      params: {
        subscribeid: this.$tokenStorage.getData('userid'),
        currentPage: 0,
        pageSize: 4
      }
    })
    console.log(subscirbevideo)
    this.subscirbevideo = subscirbevideo
  },
  methods: {
    async clearHistory () {
      console.log('clearHistory')
      const { data: res } = await this.$http.delete('search/clearSearch', {
        params: {
          email: this.$tokenStorage.getData('email')
        }
      })
      if (res) {
        this.historyList = []
      }
      console.log(res)
    },
    searchVideos () {
      const val = this.$refs.searchInput.value
      if (val != null && val !== '') {
          console.log(21312)
          this.$router.push({ path: '/historyvideos', query: { keywords: val } })
          this.reload()
      }
    },
    historySearch (val) {
      this.keywords = val
      this.searchVideos()
    },
    async showHistory () {
      console.log(this.$tokenStorage.getData('email'))
      const { data: historyList } = await this.$http.get('search/listhistory', {
        params: { email: this.$tokenStorage.getData('email') }
      })
      console.log(historyList)
      this.historyList = historyList
    //   this.$message.info('按enter键搜索')
    },
    leftListChange (flag, twoclickchange) {
      onetfchange(this, this.leftList, flag, twoclickchange)
    },
    uploadLocal () {
      const email = this.$tokenStorage.getdata('email')
      this.$http.get('http://192.168.80.129:8090/upload')
    },
    nightmode (event) {
      event.preventDefault()
      document.documentElement.classList.toggle('night-mode')
      if (document.documentElement.classList.contains('night-mode')) {
        localStorage.setItem('gmtNightMode', true)
        return
      }
      localStorage.removeItem('gmtNightMode')
    },
    signout () {
      this.$tokenStorage.clearData()
      this.$router.push('/login')
    }
  }
}
</script>
