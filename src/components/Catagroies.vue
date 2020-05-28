<template>
<div>
    <div class="main_content_inner">
        <nav class="responsive-tab">
            <ul>
                <li class="uk-active"><a> <i class="uil-video"></i> 视频 </a></li>
            </ul>
        </nav>
        <div class="section-small">
            <div class="uk-child-width-1-4@m uk-child-width-1-3@s" uk-grid>
                <div v-for="(item, i) in catagroiesList" :key="i" :class="{'uk':(i==0)}" class="uk-grid-margin">
                    <a>
                        <router-link :to="{path:'/videolist',query: {videoType: i, typeName: catagroiesList[i].typeName}}">
                            <div class="catagroy-card animate-this" :style="{backgroundImage:'url('+ imagesrc[i] +')'}" uk-img>
                                <div class="catagroy-card-content">
                                    <h4> {{catagroiesList[i].typeName}} </h4>
                                </div>
                            </div>
                        </router-link>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- footer
    ================================================== -->
    <div class="footer" >
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
      'catagroiesList': [],
      'imagesrc': [
        require('../assets/images/channals/img-life.jpg'),
        require('../assets/images/channals/img-anime.jpg'),
        require('../assets/images/channals/img-music.jpg'),
        require('../assets/images/channals/img-dance.jpg'),
        require('../assets/images/channals/img-technology.jpg'),
        require('../assets/images/channals/img-fashion.jpg'),
        require('../assets/images/channals/img-entertainment.jpg'),
        require('../assets/images/channals/img-game.jpg'),
        require('../assets/images/channals/img-digit.jpg')
      ]
    }
  },
  created: async function () {
    const { data: res } = await this.$http.get('videotype/listvideotype')
    console.log(res)
    this.catagroiesList = res
  }
}
</script>
