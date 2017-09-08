<template>
    <div id="box">
        <el-row  class="top">
            <el-col :span="24">
                <h2>猫眼电影后台管理系统</h2>
                <span id="dateStr" class="word_grey"></span>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="bottom">
            <el-col :span="4"  class="left">
                <div class="transition-box">
                <el-row class="tac">
                    <el-col :span="4">
                        <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
                           <el-menu-item-group title="操作菜单">
                            <router-link to="/filmInformation">
                                <el-menu-item index="1"  class="text">
                                    <i class="icon icon1"></i>
                                    电影信息
                                </el-menu-item>
                            </router-link>
                            <router-link to="/cinemaInformation">
                                <el-menu-item index="2"  class="text">
                                    <i class="icon icon2"></i>
                                    影院信息
                                </el-menu-item>
                            </router-link>
                            <router-link to="/screeningRoomInformation">
                                <el-menu-item index="3"  class="text">
                                    <i class="icon icon3"></i>
                                    影厅信息
                                </el-menu-item>
                            </router-link>
                            <router-link to="/filmScheduleInformation">
                                <el-menu-item index="4"  class="text">
                                    <i class="icon icon4"></i>
                                   排片信息
                                </el-menu-item>
                            </router-link>
                            </el-menu-item-group>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            </el-col>
            <el-col :span="20" class="right">
                <div class="grid-content bg-purple">                    
                    <router-view></router-view>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    function getLangDate() {
        var dateObj = new Date(); //表示当前系统时间的Date对象 
        var year = dateObj.getFullYear(); //当前系统时间的完整年份值
        var month = dateObj.getMonth() + 1; //当前系统时间的月份值 
        var date = dateObj.getDate(); //当前系统时间的月份中的日
        var day = dateObj.getDay(); //当前系统时间中的星期值
        var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var week = weeks[day]; //根据星期值，从数组中获取对应的星期字符串 
        var hour = dateObj.getHours(); //当前系统时间的小时值 
        var minute = dateObj.getMinutes(); //当前系统时间的分钟值
        var second = dateObj.getSeconds(); //当前系统时间的秒钟值
        //如果月、日、小时、分、秒的值小于10，在前面补0
        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        var newDate = year + "年" + month + "月" + date + "日 " + week + " " + hour + ":" + minute + ":" + second;
        document.getElementById("dateStr").innerHTML = "当前时间：" + newDate + "";
    }
    export default {
        data() {
            return {};
        },
        mounted() {
            getLangDate();
            setInterval(function() {
                getLangDate()
            }, 1000) //每隔1秒重新调用一次该函数  
        },
        methods: {}
    }

</script>

<style scoped>
    #box {
        width: 100%;
        height: 660px;
        background-color: rgb(230, 232, 234);
    }

    .top {
        padding-bottom: 40px;
        background-color: #dc352d;
    }

    .top h2 {
        padding-left: 40px;
    }

    .top span {
        padding-left: 40px;
    }

    .bottom {
        width: 100%;
    }

    .el-menu-vertical-demo {
        width: 200px;
        height: 529px;
        background-color: #273238;
		
    }

    .text {
        font-size: 14px;
        font-weight: 600;
    }

    a {
        text-decoration: none;
    }

    .icon {
        display: inline-block;
        margin-right: 5px;
        width: 20px;
        height: 20px;
    }

    .icon1 {
        background: url(images/FilmInformation.png);
        background-size: 100%;
    }

    .icon2 {
        background: url(images/CinemaInformation.png);
        background-size: 100%;
    }

    .icon3 {
        background: url(images/ScreeningRoomInformation.png);
        background-size: 100%;
    }

    .icon4 {
        background: url(images/FilmScheduleInformation.png);
        background-size: 100%;
    }

    .el-row {
        min-height: 100px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background-color: white;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        margin-top: 21px;
        border-radius: 5px;
        min-height: 485px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    #dateStr {
        font-size: 14px;
        font-weight: 600;
        color: white;
    }
/*
	.el-menu-item{
		color:#fff;
	}
	a:visited{
		color:red;
	}
*/

</style>
