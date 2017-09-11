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
const A_SAVESITE = "A_SAVESITE"

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
        tableData: [],
        siteMsg: []
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
                    sites: item.sites,
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
            let siteNum = 0;
            for (let i = 1; i <= 10; i++) {
                let line = [];
                for (let j = 1; j <= 10; j++) {
                    line.push({
                        row: i,
                        col: j,
                        displayName: `${i}排${j}号`,
                        isSale: false
                    })
                }
                siteNum += line.length;
                sites.push(line);
            }
            let list = await axios.get('http://127.0.0.1:3000/sites/add', {
                params: {
                    data: JSON.stringify(sites)
                }
            })
            let room = await axios.get('http://127.0.0.1:3000/roomMsg/add', {
                params: {
                    cinemasId: obj.data.id,
                    roomName: obj.data.name,
                    cinemasName,
                    sitesId: list.data.insertedIds[0],
                    sites: siteNum
                }
            })
            await axios.get('http://127.0.0.1:3000/sites/update', {
                params: {
                    _id: list.data.insertedIds[0],
                    roomId: room.data.insertedIds[0]
                }
            })
            await axios.get('http://127.0.0.1:3000/sites/update', {
                params: {
                    _id: list.data.insertedIds[0],
                    roomId: room.data.insertedIds[0]
                }
            })
            let cinema = await axios.get('http://127.0.0.1:3000/cinemaMsg/find', {
                params: {
                    _id: obj.data.id,
                }
            });
            if (cinema.data.roomId) {
                await axios.get('http://127.0.0.1:3000/cinemaMsg/update', {
                    params: {
                        _id: obj.data.id,
                        roomId: [...cinema.data.roomId, room.data.insertedIds[0]]
                    }
                })
            } else {
                await axios.get('http://127.0.0.1:3000/cinemaMsg/update', {
                    params: {
                        _id: obj.data.id,
                        roomId: [room.data.insertedIds[0]]
                    }
                })
            }
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
            let list = await axios.get('http://127.0.0.1:3000/roomMsg/find', {
                params: {
                    _id: obj.id
                }
            })
            await axios.get('http://127.0.0.1:3000/sites/del', {
                params: {
                    _id: list.data.sitesId
                }
            })
            let cinema = await axios.get('http://127.0.0.1:3000/cinemaMsg/find', {
                params: {
                    _id: list.data.cinemasId
                }
            })
            cinema.data.roomId.map((item, index) => {
                if (item == list.data._id) {
                    cinema.data.roomId.splice(index, 1);
                    return
                }
            })
            if (cinema.data.roomId.length > 0) {
                await axios.get('http://127.0.0.1:3000/cinemaMsg/update', {
                    params: {
                        _id: list.data.cinemasId,
                        roomId: cinema.data.roomId
                    }
                })
            } else {
                await axios.get('http://127.0.0.1:3000/cinemaMsg/update', {
                    params: {
                        _id: list.data.cinemasId,
                        roomId: ''
                    }
                })
            }
            await axios.get('http://127.0.0.1:3000/roomMsg/del', {
                params: {
                    _id: obj.id
                }
            })
        },
        async [A_SAVESITE](comtext, obj) {
            let searchSite = await axios.get('http://127.0.0.1:3000/sites/find', {
                params: {
                    roomId: obj.id
                }
            })
            let sitesId = searchSite.data[0]._id;
            let sites = searchSite.data[0].data;
            if (obj.data.siteState == '是') {
                sites[obj.data.row - 1][obj.data.num - 1].isSale = true;
            } else {
                sites[obj.data.row - 1][obj.data.num - 1].isSale = false;
            };
            let blockSite = 0;
            sites.map((item) => {
                item.map((site) => {
                    if (site.isSale == false) {
                        blockSite += 1;
                    }
                    return site;
                })
                return item;
            })
            await axios.get('http://127.0.0.1:3000/roomMsg/update', {
                params: {
                    _id: obj.data.id,
                    sites: blockSite
                }
            })
            await axios.get('http://127.0.0.1:3000/sites/update', {
                params: {
                    _id: sitesId,
                    data: JSON.stringify(sites)
                }
            })
        }
    }
})

export default ScreeningRoomInformation;
