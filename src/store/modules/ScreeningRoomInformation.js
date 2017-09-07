import axios from 'axios';

//同步
const M_GETCINEMA = "M_GETCINEMA"
const M_GETDATA = "M_GETDATA"
const M_PAGING = "M_PAGING"
const M_ADDROOM = "M_ADDROOM"
const M_SEARCH = "M_SEARCH"
//异步
const A_GETCINEMA = "A_GETCINEMA"
const A_ADDROOM = "A_ADDROOM"
const A_GETDATA = "A_GETDATA"
const A_PAGING = "A_PAGING"
const A_SEARCH = "A_SEARCH"
const A_DELETE = "A_DELETE"

const ScreeningRoomInformation = ({
    state: {
        cinemaData: [],
        roomData: [{
            value: '一号厅',
            label: '一号厅'
                }, {
            value: '二号厅',
            label: '二号厅'
                }],
        maxPage: 10,
        page: 1,
        tableData: []
    },
    mutations: {
        [M_GETCINEMA](state, obj) {
            obj.data.map((item) => {
                let data = {
                    value: item.cinema,
                    label: item.cinema,
                    id: item._id
                }
                state.cinemaData.push(data);
                return;
            });
        },
        [M_GETDATA](state, obj) {
            state.maxPage = obj.data.maxpage * 10;
            state.tableData = obj.data.rows.map((item) => {
                return {
                    cinemasName: item.cinemasName,
                    roomName: item.roomName,
                    sites: item.sites.length,
                    id: item._id
                }
            })
        },
        [M_PAGING](state, obj) {
            state.page = obj.page;
        },
        [M_ADDROOM](state, obj) {
            state.roomData.push({
                value: obj.data,
                label: obj.data
            });
        }
    },
    actions: {
        async [A_GETCINEMA](context, obj) {
            let pass = await axios.get('http://127.0.0.1:3000/cinemaMsg/find');
            context.commit({
                type: 'M_GETCINEMA',
                data: pass.data
            })
        },
        async [A_ADDROOM](context, obj) {
            let cinemasName = '';
            for (let newObj of context.state.cinemaData) {
                if (obj.data.id == newObj.id) {
                    cinemasName = newObj.value;
                }
            }
            let sites = [];
            for (let i = 1; i <= 10; i++) {
                for (let j = 1; j <= 10; j++) {
                    sites.push({
                        row: i,
                        col: j,
                        isSale: false
                    })
                }
            }
            let data = await axios.get('http://127.0.0.1:3000/roomMsg/add', {
                params: {
                    cinemasId: obj.data.id,
                    roomName: obj.data.name,
                    cinemasName,
                    sites: JSON.stringify(sites)
                }
            })
        },
        async [A_GETDATA](context, obj) {
            let data = await axios.get('http://127.0.0.1:3000/roomMsg/find', {
                params: {
                    page: context.state.page,
                    rows: 3
                }
            });
            context.commit({
                type: 'M_GETDATA',
                data: data.data
            })
        },
        async [A_PAGING](context, obj) {
            context.commit({
                type: 'M_PAGING',
                page: obj.page
            })
        },
        async [A_SEARCH](context, obj) {
            console.log(obj);
            let data = {};
            if (obj.data.type == 'roomName') {
                data = await axios.get('http://127.0.0.1:3000/roomMsg/find', {
                    params: {
                        roomName: obj.data.value,
                        page: context.state.page,
                        rows: 3
                    }
                })
            } else {
                data = await axios.get('http://127.0.0.1:3000/roomMsg/find', {
                    params: {
                        cinemasName: obj.data.value,
                        page: context.state.page,
                        rows: 3
                    }
                })
            }
            context.commit({
                type: 'M_GETDATA',
                data: data.data
            })
        },
        async [A_DELETE](context, obj) {
            await axios.get('http://127.0.0.1:3000/roomMsg/del', {
                params: {
                    _id: obj.id
                }
            })
        }
    }
})

export default ScreeningRoomInformation;
