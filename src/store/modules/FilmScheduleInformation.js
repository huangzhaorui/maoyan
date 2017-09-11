import axios from 'axios';

const commonUrl = "http://127.0.0.1:3000";

//mutations
const MU_GETMOVIESDATA = "MU_GETMOVIESDATA";
const MU_GETMOVIESLIST = "MU_GETMOVIESLIST";
const MU_GETCINEMASDATA = "MU_GETCINEMASDATA";
const MU_GETHALLSDATA = "MU_GETHALLSDATA";
const MU_GETCHECKDATA = "MU_GETCHECKDATA";
const MU_GETSEATDATA = "MU_GETSEATDATA";

//actions
export const ACTION_GETMOVIESDATA = "ACTION_GETMOVIESDATA";
export const ACTION_GETMOVIESLIST = "ACTION_GETMOVIESLIST";
export const ACTION_GETCINEMASDATA = "ACTION_GETCINEMASDATA";
export const ACTION_GETHALLSDATA = "ACTION_GETHALLSDATA";
export const ACTION_ADDDATA = "ACTION_ADDDATA";
export const ACTION_GETCHECKDATA = "ACTION_GETCHECKDATA";
export const ACTION_GETSEATDATA = "ACTION_GETSEATDATA";

export const FilmScheduleInformation = {
  state: {
    moviesList: [],
    moviesData: [],
    cinemasData: [],
    HallsData: [],
    moviesTotal: null,
    checkData: [],
    seatData: []
  },
  mutations: {
    [MU_GETMOVIESLIST](state, obj) {
      state.moviesList = obj.params;
    },
    [MU_GETMOVIESDATA](state, obj) {
      state.moviesData = obj.params.data;
      state.moviesTotal = obj.params.total;
    },
    [MU_GETCINEMASDATA](state, obj) {
      state.cinemasData = obj.params;
    },
    [MU_GETHALLSDATA](state, obj) {
      state.HallsData = obj.params;
    },
    [MU_GETCHECKDATA](state, obj) {
      state.checkData = obj.params.data;
    },
    [MU_GETSEATDATA](state, obj) {
      state.seatData = obj.params;
    }
  },
  actions: {
    async [ACTION_GETMOVIESLIST]({ commit }) {
      let val = await axios.get(`${commonUrl}/filmCol/find`);
      val = val.data.map((item) => {
        return {
          value: item._id,
          label: item.filmName
        }
      })
      commit({
        type: MU_GETMOVIESLIST,
        params: val
      })
    },
    async [ACTION_GETMOVIESDATA]({ commit }, obj) {
      let val = await axios.get(`${commonUrl}/filmCol/find`, {
        params: {
          page: obj.curPage,
          rows: obj.pageSize
        }
      });
      let total = val.data.total;
      val = val.data.rows.map((item) => {
        return {
          id: item._id,
          filmName: item.filmName,
          englishName: item.englishName,
          type: item.type,
          releaseTime: item.releaseTime,
          actor: item.actor,
          duration: item.duration
        }
      })
      commit({
        type: MU_GETMOVIESDATA,
        params: {
          data: val,
          total
        }
      })
    },
    async [ACTION_GETCINEMASDATA]({ commit }) {
      let val = await axios.get(`${commonUrl}/cinemaMsg/find`);
      val = val.data.map((item) => {
        return {
          value: item._id,
          label: item.cinema
        }
      })
      commit({
        type: MU_GETCINEMASDATA,
        params: val
      })
    },
    async [ACTION_GETHALLSDATA]({ commit }, obj) {
      let val = await axios.get(`${commonUrl}/roomMsg/find`, {
        params: {
          cinemasId: obj.hallsID
        }
      });
      val = val.data.map((item) => {
        return {
          value: item._id,
          label: item.roomName
        }
      })
      commit({
        type: MU_GETHALLSDATA,
        params: val
      })
    },
    async [ACTION_ADDDATA]({ commit }, obj) {
      let info = await axios.get(`${commonUrl}/cinemaMsg/find`, {
        params: {
          _id: obj.cinemasValue
        }
      })
      console.log(info)
      let val = await axios.get(`${commonUrl}/rowPieceCol/add`, {
        params: {
          moviesValue: obj.moviesValue,
          cinemasValue: obj.cinemasValue,
          hallsValue: obj.hallsValue,
          dateValue: obj.dateValue,
          priceValue: obj.priceValue,
          checkMovieName: obj.checkMovieName,
          checkCinemaName: obj.checkCinemaName,
          checkHallName: obj.checkHallName,
          official_website: info.data.internetAddress,
          address: info.data.address,
          phone_num: info.data.phone
        }
      })
      let seatColObj = {};
      let seatCol = [];
      for(let i = 0; i < 10; i ++) {
        let ary = [];
        for(let j = 0; j < 10; j ++) {
          ary.push({
            row: i + 1,
            col: j + 1,
            displayName: `${i + 1}排${j + 1}号`,
            isSale: false
          })
        }
        seatCol.push(ary);
      };
      seatColObj.data = seatCol;
      axios.get(`${commonUrl}/rowPieceSeatCol/add`, {
        params: {
          rowPieceID: val.data.insertedIds[0],
          seatInfo: seatColObj
        }
      })
    },
    async [ACTION_GETCHECKDATA]({ commit }, obj) {
      let val = await axios.get(`${commonUrl}/rowPieceCol/find`, {
        params: {
          moviesValue: obj.movieID
        }
      })
      commit({
        type: MU_GETCHECKDATA,
        params: val
      })
    },
    async [ACTION_GETSEATDATA]({ commit }, obj) {
      let val = await axios.get(`${commonUrl}/rowPieceSeatCol/find`, {
        params: {
          rowPieceID: obj.rowPieceID
        }
      })
      commit({
        type: MU_GETSEATDATA,
        params: val.data[0].seatInfo.data
      })
    }
  }
}
