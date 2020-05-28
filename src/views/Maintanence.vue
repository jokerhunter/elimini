<template>
    <div id="wrapper">
        <!-- Header Container
        ================================================== -->

        <div class="uk-card-default bg-gradient-primary py-4 uk-light">
            <div class="uk-flex uk-flex-center uk-flex-middle">
                <img src="assets/images/logo-light-icon.png" width="30" alt="">
                <h2 class="mb-0 ml-3" style="font-weight: 400;"> Elimini </h2>
            </div>
        </div>

        <!-- Content
        ================================================== -->
        <!-- Content / End -->

        <div uk-height-viewport="expand: true" class="uk-flex uk-flex-middle">
            <div class="uk-width-1-2@m uk-width-1-2@s m-auto text-center">

                <img src="assets/images/maintenance.svg" alt="" class="my-3">

                <h3>持 续 开 发 中...</h3>
                <p class="mb-0"> 十分抱歉，我们正在努力证明自己，请持续关注</p>
                <a href="#modal-close-default" class="button primary transition-3d-hover my-4 small" uk-toggle>
                    <i class="icon-feather-clock mr-2"></i> 提交</a>
            </div>
        </div>

        <!-- This is the modal with the default close button -->
        <div id="modal-close-default" uk-modal>
            <div class="uk-modal-dialog uk-modal-body uk-width-1-3@m uk-text-center bg-gradient-primary uk-light rounded">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="my-3">
                    <i class="icon-feather-mail icon-large"></i>
                </div>
                <h4> 开启通知</h4>
                <p class="mb-4"> 当我们完善网站时，我会及时通知你 </p>

                <form action="">
                    <input type="text" class="uk-input mb-4" placeholder="名 字">
                    <input type="email" class="uk-input mb-4" placeholder="邮 件">
                    <input type="submit" class="button white block large mb-0" value="提 交">
                    <p class="uk-text-small mt-2">No Spam, we promise .绝不会有垃圾邮件</p>
                </form>
            </div>
        </div>
    </div>

</template>
