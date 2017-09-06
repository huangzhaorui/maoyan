<template>
    <div id="box">
       <div class="top">
           <h2>猫眼电影后台管理系统</h2>
           <div id="dateStr" class="word_grey"></div>
       </div>
       <div class="left">
    <el-button @click="show = !show" class="btn">菜单列表</el-button>
      <transition name="el-zoom-in-top">
        <div v-show="show" class="transition-box">
            <el-row class="tac">
                <el-col :span="8">
                    <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
                        <el-menu-item-group title="操作">
                            <router-link to="/userManager" class="text">
                            <el-menu-item index="1">
                                <i class="el-icon-message"></i>
                                用户管理
                            </el-menu-item>
                            </router-link>
                            <router-link to="/filmManager" class="text">
                            <el-menu-item index="2">
                                <i class="el-icon-message"></i>
                                电影管理
                            </el-menu-item>
                            </router-link>
                            <router-link to="/information" class="text">
                            <el-menu-item index="3">
                                <i class="el-icon-message"></i>
                                咨讯管理
                            </el-menu-item>
                            </router-link>
                            <router-link to="/cinemaChainManager" class="text">
                            <el-menu-item index="4">
                                <i class="el-icon-message"></i>
                                影线管理
                            </el-menu-item>
                            </router-link>
                            <router-link to="/movieCinemaChain" class="text">
                            <el-menu-item index="5">
                                <i class="el-icon-message"></i>
                                电影院线匹配
                            </el-menu-item>
                            </router-link>
                            <router-link to="/comingSoon" class="text">
                            <el-menu-item index="6">
                                <i class="el-icon-message"></i>
                                即将上映
                            </el-menu-item>
                            </router-link>
                            <router-link to="/hit" class="text">
                            <el-menu-item index="7">
                                <i class="el-icon-message"></i>
                                正在热映
                            </el-menu-item>
                            </router-link>
                            <router-link to="/wellReceived" class="text">
                            <el-menu-item index="8">
                                <i class="el-icon-message"></i>
                                热播影视
                            </el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
       </transition>
       </div>
        <div class="right">
            <router-view></router-view>
        </div>
        
        
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
        document.getElementById("dateStr").innerHTML = "系统公告：[ " + newDate + " ]";
    }
    export default {
        data() {
            return {
                isCollapse: true,
                show: true
            };
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
        background: url(2ecf57b2f1df79961b5af152f5df5176.jpg);
        background-size: 100%;
    }

    .top {
        width: 100%;
        height: 120px;
        float: left;
        background-color: #E5E9F2;
        opacity: 0.6;
    }

    .top>h2 {
        padding-left: 35px;
    }

    .left {
        margin-left: 2px;
        float: left;
    }

    .right {
        float: left;
    }

    .el-menu-vertical-demo {
        width: 160px;
        background-color: #8492A6;
        opacity: 0.8;
    }

    .text {
        font-size: 15px;
        font-weight: 600;
        color: dimgray;
        text-decoration: none;
    }

    .btn {
        width: 160px;
        color: gray;
        font-size: 16px;
        font-weight: 600;
        background-color: #C0CCDA;
        border-color: #C0CCDA;
        opacity: 0.8;
    }

</style>
