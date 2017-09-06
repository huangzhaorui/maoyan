import Vue from 'vue'
import Router from 'vue-router'
//引入首页
import Index from '@/components/index'
//引入列表功能页
import CinemaChainManager from "@/components/modules/CinemaChainManager/CinemaChainManager"
import ComingSoon from "@/components/modules/ComingSoon/ComingSoon"
import FilmManager from "@/components/modules/FilmManager/FilmManager"
import Hit from "@/components/modules/Hit/Hit"
import Information from "@/components/modules/Information/Information"
import MovieCinemaChain from "@/components/modules/MovieCinemaChain/MovieCinemaChain"
import UserManager from "@/components/modules/UserManager/UserManager"
import WellReceived from "@/components/modules/WellReceived/WellReceived"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: '首页',
            component: Index,
            children: [{
                path: '/cinemaChainManager',
                name: '影线管理',
                component: CinemaChainManager,
            }, {
                path: '/comingSoon',
                name: '即将上映',
                component: ComingSoon,
            }, {
                path: '/filmManager',
                name: '电影管理',
                component: FilmManager,
            }, {
                path: '/hit',
                name: '正在热映',
                component: Hit,
            }, {
                path: '/information',
                name: '咨讯管理',
                component: Information,
            }, {
                path: '/movieCinemaChain',
                name: '电影院线匹配',
                component: MovieCinemaChain,
            }, {
                path: '/userManager',
                name: '用户管理',
                component: UserManager,
            },  {
                path: '/wellReceived',
                name: '热播影视',
                component: WellReceived,
            }]
    }
  ]
})
