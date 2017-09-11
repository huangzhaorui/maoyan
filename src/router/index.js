import Vue from 'vue'
import Router from 'vue-router'


//一级路由

//首页
import Index from '@/components/index'
//登录
import SignIn from '@/components/signIn'
//注册
import SignUp from '@/components/signUp'



//二级路由

//影院信息
import CinemaInformation from "@/components/cinemaInformation"
//增加电影
import addFilmInformation from "@/components/addFilmInformation"
//电影信息
import FilmInformation from "@/components/filmInformation"
//影厅信息
import ScreeningRoomInformation from "@/components/screeningRoomInformation"
//排片信息
import FilmScheduleInformation from "@/components/filmScheduleInformation"


Vue.use(Router)


export default new Router({
    routes: [
        {
            path: '/index',
            name: '首页',
            component: Index,
            children: [{
                path: '/cinemaInformation',
                name: '影院信息',
                component: CinemaInformation,
            }, {
                path: '/filmInformation',
                name: '电影信息',
                component: FilmInformation,
            }, {
                path: '/screeningRoomInformation',
                name: '影厅信息',
                component: ScreeningRoomInformation,
            }, {
                path: '/filmScheduleInformation',
                name: '排片信息',
                component: FilmScheduleInformation,
            }, {
                path: '/addFilmInformation',
                name: '增加电影',
                component: addFilmInformation,
            }]
    }, {
            path: '/signin',
            name: '登录',
            component: SignIn,
    }, {
            path: '/signUp',
            name: '注册',
            component: SignUp,
        }
  ]
})
