<template>
  <!-- <div class="main_content"> -->
            <div class="main_content_inner">

                <div data-src="http://192.168.80.129/images/assets/help_background.svg" uk-img
                    class="uk-background-norepeat uk-background-center-center uk-background-image@s p-lg-11 uk-flex uk-flex-middle">
                    <div class="uk-width-1-1 uk-container p-lg-11">
                        <div class="uk-container-xsmall uk-margin-auto uk-text-center">
                            <h3>欢迎来到 Elimini 社区</h3>
                            <div class="uk-margin">

                                <div class="uk-inline uk-width-1-1">
                                    <span class="uk-form-icon"><i class="uil-search"></i></span>
                                    <input class="uk-input  uk-form-large" type="text"
                                        placeholder="搜索">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="uk-container-xsmall uk-margin-auto">
                    <h3> 常见问题 </h3>
                    <article class="uk-card-default p-4 rounded">
                        <ul class="uk-list-divider uk-list-large uk-accordion" uk-accordion>
                            <li>
                                <a class="uk-accordion-title" href="#">Elimini到底是干什么的？</a>
                                <div class="uk-accordion-content">
                                    <p>Elimini 是一个视频分享平台，用户可以通过上传视频分享自己的生活或观点，大家可以进行友好的交流。</p>
                                </div>
                            </li>
                            <li>
                                <a class="uk-accordion-title" href="#">怎么提高影响力？</a>
                                <div class="uk-accordion-content" hidden="" aria-hidden="true">
                                    <p>视频的影响力的提高可以通过点赞、收藏、关注数进行计算，提高内容质量才是第一生产力哦。</p>
                                </div>
                            </li>
                            <li>
                                <a class="uk-accordion-title" href="#">怎么样看到优秀视频？</a>
                                <div class="uk-accordion-content" hidden="" aria-hidden="true">
                                    <p>用户可以通过点击主站，其中有热火视频可供观看</p>
                                </div>
                            </li>
                        </ul>
                    </article>

                </div>

                <!-- footer
               ================================================== -->
                <div class="footer">
                    <div class="uk-grid-collapse" uk-grid>
                        <div class="uk-width-expand@s uk-first-column">
                            <p>© 2020 <strong>Elimini</strong>. All Rights Reserved. </p>
                        </div>
                        <div class="uk-width-auto@s">
                            <nav class="footer-nav-icon">
                                <ul>
                                    <li><a href="#"><i class="icon-brand-qq"></i></a></li>
                                    <li><a href="#"><i class="icon-brand-weibo"></i></a></li>
                                    <li><a href="#"><i class="icon-brand-twitter"></i></a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        <!-- </div> -->
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>

</style>
