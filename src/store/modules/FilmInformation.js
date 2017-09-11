import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
export const GET_MOVIE_LIST = "GET_MOVIE_LIST"
export const GET_ADDMOVIE = "GET_ADDMOVIE"
export const GET_UPDATAMOVIE = "GET_UPDATAMOVIE"
export const GET_SEARCHMOVIE = "GET_SEARCHMOVIE"
export const ADD_MOVIE = "ADD_MOVIE"
export const ADD_MOVIEPIC = "ADD_MOVIEPIC"
export const UPDATA_MOVIE = "UPDATA_MOVIE"
export const REMOVE_MOVIE = "REMOVE_MOVIE"
export const MU_GET_MOVIE_LIST = "MU_GET_MOVIE_LIST"
export const MU_GET_ADDMOVIE = "MU_GET_ADDMOVIE"
export const MU_GET_UPDATAMOVIE = "MU_GET_UPDATAMOVIE"
export const MU_SEARCHMOVIE = "MU_SEARCHMOVIE"

const FilmInformation = ({
    state: {
        movieList: [],
        movieNum: 100,
        page: 1,
        addMovie: {},
        updataMovie: {}
    },
    mutations: {
		[MU_GET_MOVIE_LIST](state, data) {
            state.movieList = data.rows;
            state.movieNum = data.total;
            return state;
        },
        [MU_GET_ADDMOVIE](state, data) {
            state.addMovie=data[0];
            return state;
        },
        [MU_GET_UPDATAMOVIE](state, data) {
            state.updataMovie = data;
            return state;
        },
        [MU_SEARCHMOVIE](state, data) {
            state.movieList = data;
            return state;
        }
    },
    actions: {
        async [GET_MOVIE_LIST](context, obj) {
            let data = await axios.get("http://127.0.0.1:3000/filmCol/find", {
                params: {
                    page: obj.page || context.state.page,
                    rows: 7
                }
            })
            context.commit(MU_GET_MOVIE_LIST, data.data)
        },
        async [ADD_MOVIE](context, obj) {
            await axios.post("http://127.0.0.1:3000/filmCol/add", obj.movieInfo)
        },
        async [ADD_MOVIEPIC](context, obj) {
            await axios.post("http://127.0.0.1:3000/filmImgCol/add", obj.addMoviePics)
            console.log("1")
        },
        [UPDATA_MOVIE](context, obj) {
            axios.get("http://127.0.0.1:3000/filmCol/update", {
                params: {
                    _id: obj.id,
                    filmName: obj.movieInfo.filmName,
                    englishName: obj.movieInfo.englishName,
                    type: obj.movieInfo.type,
                    country: obj.movieInfo.country,
                    duration: obj.movieInfo.duration,
                    time: obj.movieInfo.time,
                    releaseTime: obj.movieInfo.releaseTime,
                    director: obj.movieInfo.director,
                    score: obj.movieInfo.score,
                    actor: obj.movieInfo.actor,
                    details: obj.movieInfo.details

                }
            })
        },

        async [GET_ADDMOVIE](context, obj) {
            let data = await axios.get("http://127.0.0.1:3000/filmCol/find", {
                params: {
                    filmName: obj.movieInfo.filmName,
                    englishName: obj.movieInfo.englishName,
                    country: obj.movieInfo.country,
                    duration: obj.movieInfo.duration,
                    time: obj.movieInfo.time,
                    director: obj.movieInfo.director,
                    score: obj.movieInfo.score,
                    details: obj.movieInfo.details
                }
            })
            context.commit(MU_GET_ADDMOVIE, data.data)
        },
        async [REMOVE_MOVIE](context, obj) {
            let data = await axios.get("http://127.0.0.1:3000/filmCol/del", {
                params: {
                    type: 'exact',
                    _id: obj.id
                }
            })
        },
        async [GET_UPDATAMOVIE](context, obj) {
            let data = await axios.get("http://127.0.0.1:3000/filmCol/find", {
                params: {
                    _id: obj.id
                }
            })
            context.commit(MU_GET_UPDATAMOVIE, data.data)
        },
        async [GET_SEARCHMOVIE](context, obj) {
            let data = await axios.get("http://127.0.0.1:3000/filmCol/find", {
                params: {
                    filmName: obj.filmName,
                }
            })
            context.commit(MU_SEARCHMOVIE, data.data)
        },


    }

})

export default FilmInformation;
