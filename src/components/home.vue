<template>
    <div>
        <mt-header fixed title="" class="head">
            <mt-button slot="left">成都市</mt-button>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="topBar"></div>
        <div>
            <!-- 轮播图部分 -->
            <mt-swipe :auto="8000">
                <mt-swipe-item>
                    <div>
                        <img class="img" src="http://www.hangzhouzk.com/admin/image/2014/05/20140508165323421.jpg">
                    </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <img class="img" src="http://n1.itc.cn/img8/wb/recom/2016/06/08/146535464543258587.JPEG">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div>
            <div class="line1"></div>
            <div class="center title1">
                <icon name="leaf" scale="0.8"></icon>
                <span>健康服务</span>
            </div>
            <div class="flex font-green margin10 bottomLine">
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon name="heartbeat" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">健康专区</span>
                    </div>
                </div>
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon name="envelope" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">邮寄报告</span>
                    </div>
                </div>
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon style="color:#FFCC66" name="question-circle" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">在线咨询</span>
                    </div>
                </div>
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon name="id-card" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">就诊卡绑定</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="line1"></div>
            <div class="center title1">
                <icon name="medkit" scale="0.8"></icon>
                <span>医院服务</span>
            </div>
            <div class="flex font-green margin10">
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon name="heartbeat" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">健康专区</span>
                    </div>
                </div>
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon name="envelope" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">邮寄报告</span>
                    </div>
                </div>
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon style="color:#FFCC66" name="question-circle" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">在线咨询</span>
                    </div>
                </div>
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon name="id-card" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">就诊卡绑定</span>
                    </div>
                </div>
            </div>
            <div class="flex font-green margin10 bottomLine">
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon name="heartbeat" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">健康专区</span>
                    </div>
                </div>
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon name="envelope" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">邮寄报告</span>
                    </div>
                </div>
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon style="color:#FFCC66" name="question-circle" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">在线咨询</span>
                    </div>
                </div>
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon name="id-card" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">就诊卡绑定</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="line1"></div>
            <div class="title1 paddingL10">
                <icon name="hospital-o" scale="0.8"></icon>
                <span>推荐医院</span>
                <span class="more">全部医院&nbsp;>></span>
            </div>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
            <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        </div>
        <div class="footBar"></div>
    </div>
</template>
<script type="text/javascript">
export default {

}
</script>
<style scoped>
.more{
    float: right;
    font-size: 12px;
}
.paddingL10{
    padding-left: 5px;
}
.bottomLine{
    border-bottom: 1px solid #CCCCCC;
    height:60px;
}
.iconbox1{
    height:30px;
}
.text1 {
    font-size: 12px;
    color: #7F7F7F;
}

.title1 {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #3dbbaa;
    border-bottom: 1px solid #CCCCCC;
}

.line1 {
    height: 3px;
    background: #CCCCCC;
}

.topBar {
    height: 40px;
}

.footBar {
    height: 50px;
}

.img {
    width: 100%;
}

.head {
    background: #3dbbaa;
}

.mint-swipe {
    width: 100%;
    height: 150px;
}
</style>
