<template>
    <div >
        <h3> 已关注 </h3>
        <div>
            <ul class="uk-slider-items uk-child-width-1-5@m uk-child-width-1-3@s uk-grid">

                <li v-for="(subscribe, index) in subscribeList" :key="subscribe.id">
                    <a>
                        <div class="single-channal">
                            <div class="single-channal-creator">
                                <img class="profile-img" :src="subscribe.profileaddr" alt="">
                            </div>
                            <div class="single-channal-body">
                                <h4>{{subscribe.uname}} </h4>
                                <p> {{subscribe.subscribenum}} subscribers </p>
                                <a class="button soft-warning small circle" @click="delsubscribe(subscribe.subscribeid,index,subscribe.subscribenum)"> <i class="uil-bell"></i> 已订阅 </a>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>

        <h3> 所有 </h3>
        <div>
            <ul class="uk-slider-items uk-child-width-1-5@m uk-child-width-1-3@s uk-grid">

                <li v-for="(user, index) in userList" :key="'sub' + index">
                    <a>
                        <div class="single-channal">
                            <div class="single-channal-creator">
                                <img class="profile-img" :src="user.profileaddr" alt="">
                            </div>
                            <div class="single-channal-body">
                                <h4>{{user.uname}} </h4>
                                <p> {{user.subscribenum | kilochange}} subscribers </p>
                                <a v-if="user.subscribeid == null" class="button soft-primary small circle" @click="subscribe(user.id,index,user.subscribenum)"> <i class="uil-bell"></i> 订阅 </a>
                                <a v-else-if="user.subscribeid != null" class="button soft-warning small circle" @click="delsubscribe(user.subscribeid,index,user.subscribenum)"> <i class="uil-bell"></i> 已订阅 </a>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  inject: ['reload'],
  data () {
    return {
      userList: [],
      subscribeList: []
    }
  },
  filters: {
    kilochange (value) {
      return value > 1000 ? (value / 1000).toFixed(1) + 'k' : value
    }
  },
  created: async function () {
    // 列出关注
    const { data: subscribeList } = await this.$http.get('subscribe/listSubcribeUser', {
      params: {
        userid: this.$tokenStorage.getData('userid'),
        currentPage: 0,
        pageSize: 5
      }
    })
    this.subscribeList = subscribeList || []
    console.log(this.subscribeList)

// 列出所有
    const { data: user } = await this.$http.get('subscribe/listUserSubcribe', {
      params: {
        userid: this.$tokenStorage.getData('userid'),
        currentPage: 0,
        pageSize: 5
      }
    })
    // console.log(user)
    this.userList = user || []
    console.log(this.userList)
  },
  methods: {
      async subscribe (val, index, subscribenum) {
          //   console.log(val)
      const { data: res } = await this.$http.post('subscribe/addSubcribeUser', {
          userid: this.$tokenStorage.getData('userid'),
          subscribeid: val,
          subscribenum: subscribenum
      })
    //   this.$set(this.userList[index], 'subscribeid', res.subscribeid)
      this.userList.subscribeid = res.subscribeid
      console.log('添加订阅' + res + 'sub' + subscribenum)
      this.reload()
    },
    async delsubscribe (subscribeid, index, subscribenum) {
      console.log('删除订阅' + '     ' + subscribeid + 'sub' + subscribenum)
      const { data: res } = await this.$http.post('subscribe/deleteSubscribe', {
        userid: this.$tokenStorage.getData('userid'),
        subscribeid: subscribeid,
        subscribenum: subscribenum
      })
      console.log(res)
    //   this.userList[index].subscribeid = null
    // this.reload()
    //   this.$set(this.userList[index], 'subscribeid', null)
      this.reload()
    }
  }
}
</script>

<style lang="less" scoped>
    .uk-slider-items.uk-grid {
        flex-wrap: wrap;
    }

    .profile-img {
        width: 100px;
        height:90px;
    }
</style>
