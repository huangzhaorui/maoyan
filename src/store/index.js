import Vue from 'vue';
import Vuex from 'vuex';

//引入子模块

//登录
import SignIn from './modules/SignIn';
//注册
import SignUp from './modules/SignUp';
//影院信息
import CinemaInformation from './modules/CinemaInformation';
//电影信息
import FilmInformation from './modules/FilmInformation';
//影厅信息
import ScreeningRoomInformation from './modules/ScreeningRoomInformation';
//排片信息
import { FilmScheduleInformation } from './modules/FilmScheduleInformation';


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        CI: CinemaInformation,
        FI: FilmInformation,
        SRI: ScreeningRoomInformation,
        FSI: FilmScheduleInformation,
        SignIn: SignIn,
        SignUp: SignUp
    }
})

export default store;
