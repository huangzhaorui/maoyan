import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
const ACTION_GET_MSG="ACTION_GET_MSG"
const ACTION_ADD_MSG="ACTION_ADD_MSG"
const ACTION_SEARCH_MSG="ACTION_SEARCH_MSG"
const ACTION_DEL_MSG="ACTION_DEL_MSG"
const ACTION_ELT_MSG="ACTION_ELT_MSG"
const MU_GET_MSG="MU_GET_MSG"
const MU_SEARCH_MSG="MU_SEARCH_MSG"
const CinemaInformation = ({
   state: {
        cinemaMsgList:[],
//	    page:1,
	    maxPage:5,
	   searchName:""
    },
    mutations: {
		[MU_GET_MSG](state, obj) {
			state.cinemaMsgList =obj.obj.rows
			state.maxPage = obj.obj.maxpage * 10;
			state.page = obj.obj.page;
			console.log(state.cinemaMsgList)
		},
		[MU_SEARCH_MSG](state, obj) {
			state.cinemaMsgList =obj.obj.rows
			state.maxPage = obj.obj.maxpage * 10;
			state.page = obj.obj.page;
			console.log(state.cinemaMsgList)
		},
    },
	actions: {
//		添加
		async[ACTION_ADD_MSG]({dispatch}, obj) {
			console.log(obj)
			await axios.get("http://127.0.0.1:3000/cinemaMsg/add",{
				params:{
					cinema:obj.message.cinema,
					phone:obj.message.phone,
					address:obj.message.address,
					internetAddress:obj.message.internetAdress,
				}
			})
			dispatch(ACTION_GET_MSG)
		},
//      获取数据
		async[ACTION_GET_MSG](context,obj) {
			const {
				data
			} = await axios.get("http://127.0.0.1:3000/cinemaMsg/find",{
				params:{
					page:obj.page,
					rows:5
				}
			})
			console.log(data)
			context.commit({
				type:MU_GET_MSG,
				obj:data
			})
		},
//		查询
		async [ACTION_SEARCH_MSG](context,obj){
			var Name=obj.obj.searchAcc
			console.log(obj.obj.searchAcc)
			if(obj.obj.searchAcc=="cinema"){
				var {data}=await axios.get("http://127.0.0.1:3000/cinemaMsg/find",{
				params:{
					page:context.state.page,
					rows:5,
					cinema:obj.obj.searchVal
				}
			})
			}else if(obj.obj.searchAcc=="address"){
				var {data}=await axios.get("http://127.0.0.1:3000/cinemaMsg/find",{
				params:{
					page:context.state.page,
					rows:5,
					address:obj.obj.searchVal
				}
			})
			}else if(obj.obj.searchAcc=="phone"){
				var {data}=await axios.get("http://127.0.0.1:3000/cinemaMsg/find",{
				params:{
					page:context.state.page,
					rows:5,
					phone:obj.obj.searchVal
				}
			})
			}else{
				var {data}=await axios.get("http://127.0.0.1:3000/cinemaMsg/find",{
				params:{
					page:context.state.page,
					rows:5,
					internetAddress:obj.obj.searchVal
				}
			})
			}
			
			context.commit({
				type:MU_SEARCH_MSG,
				obj:data
			})
		},
//		删除
		async [ACTION_DEL_MSG]({dispatch},obj){
			await axios.get("http://127.0.0.1:3000/cinemaMsg/del",{
				params:{
					_id:obj._id
				}
			})
//			dispatch(ACTION_GET_MSG)
		},
//		编辑update
		async [ACTION_ELT_MSG](context,obj){
			await axios.get("http://127.0.0.1:3000/cinemaMsg/update",{
				params:{
					_id:obj.obj.id,
					cinema:obj.obj.cinema,
					phone:obj.obj.eltPhone,
					address:obj.obj.adress,
					internetAddress:obj.obj.eltinterAddress
				}
			})
	}
		
	}
})

export default CinemaInformation;